import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import type { AuthStrategy } from "../auth/AuthStrategy";
import { MediaWikiApiError } from "../errors/MediaWikiApiError";
import { detectCapabilities, WikiCapabilities } from "../versioning/detectCapabilities";

/** Constructor options for {@link MediaWikiClient}. */
export type MediaWikiClientOptions = {
  /** Base wiki URL, e.g. "https://oldschool.runescape.wiki" — api.php is resolved from this. */
  baseUrl: string;
  /** Optional {@link AuthStrategy} (e.g. `BotPasswordAuth`, `OAuthAuth`) for privileged calls. */
  auth?: AuthStrategy;
  /** Total seconds to retry a `maxlag`-throttled request before giving up. Default 5. */
  maxlagRetrySeconds?: number;
};

/** Action API token type, as accepted by `meta=tokens&type=`. */
export type TokenType = "csrf" | "login" | "createaccount" | "patrol" | "rollback" | "userrights" | "watch";

/** Per-call options for {@link MediaWikiClient.call}. */
export type ActionCallOptions = {
  /** HTTP method to issue the request with. Defaults to `"GET"`. */
  method?: "GET" | "POST";
  /** Skips `ensureAuthenticated()` — used internally to avoid recursion during login/token fetches. */
  skipAuth?: boolean;
};

/** Shape of an Action API error envelope (`format=json&formatversion=2`). */
type ActionApiErrorBody = { error?: { code: string; info: string }; errors?: Array<{ code: string; text: string }> };

/**
 * A single wiki connection: wraps one axios instance bound to `{baseUrl}/w/api.php`, applying
 * format=json&formatversion=2 defaults, maxlag retry, error normalization, and token caching.
 * Create one instance per wiki; use `MediaWikiClientRegistry` to manage several under names.
 */
export class MediaWikiClient {
  /** Normalized base wiki URL (trailing slashes stripped), e.g. "https://oldschool.runescape.wiki". */
  readonly baseUrl: string;
  /** The underlying axios instance, bound to `{baseUrl}/w/api.php`. Exposed for advanced/escape-hatch use. */
  readonly axios: AxiosInstance;
  /** The auth strategy supplied at construction, if any. */
  private readonly auth?: AuthStrategy;
  /** Total seconds to retry a `maxlag`-throttled request before giving up. */
  private readonly maxlagRetrySeconds: number;
  /** In-memory cache of previously-fetched Action API tokens, keyed by {@link TokenType}. */
  private readonly tokenCache = new Map<TokenType, string>();
  /** Memoized result of {@link getCapabilities}. */
  private capabilities?: WikiCapabilities;
  /** Whether {@link ensureAuthenticated} has already run the auth strategy's handshake. */
  private authenticated = false;

  /** @param options See {@link MediaWikiClientOptions}. */
  constructor(options: MediaWikiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.auth = options.auth;
    this.maxlagRetrySeconds = options.maxlagRetrySeconds ?? 5;
    this.axios = axios.create({ baseURL: `${this.baseUrl}/w/api.php` });
    this.auth?.attach(this.axios);
  }

  /** Runs the configured auth strategy's handshake (e.g. bot-password login) exactly once. */
  async ensureAuthenticated(): Promise<void> {
    if (!this.auth?.login || this.authenticated) {
      return;
    }
    await this.auth.login(this);
    this.authenticated = true;
  }

  /**
   * Whether privileged (write) calls need a CSRF token attached \u2014 true for cookie-based auth
   * (e.g. {@link BotPasswordAuth}), false for OAuth or when no auth strategy is configured.
   * Used by both the Action API `edit`/`delete`/`move` core modules and the REST API's
   * create/update page endpoints, which each attach a token only when this is true.
   */
  needsCsrfToken(): boolean {
    return this.auth?.requiresCsrfToken() ?? false;
  }

  /**
   * Fetches (and caches) an Action API token via `meta=tokens`.
   * @param type The token type to fetch.
   * @param options.skipAuth Bypasses `ensureAuthenticated()` — only needed when fetching the `login`
   * token from inside an in-progress `AuthStrategy.login()`, to avoid re-entering the auth handshake.
   * Any other token type must run through `ensureAuthenticated()` first, or a token fetched before
   * login completes gets cached and reused post-login, causing `badtoken` errors.
   */
  async getToken(type: TokenType, options: { skipAuth?: boolean } = {}): Promise<string> {
    const cached = this.tokenCache.get(type);
    if (cached) {
      return cached;
    }
    const response = (await this.call(
      "query",
      { meta: "tokens", type },
      { method: "GET", skipAuth: options.skipAuth ?? false }
    )) as { query?: { tokens?: Record<string, string> } };
    const token = response.query?.tokens?.[`${type}token`];
    if (!token) {
      throw new MediaWikiApiError(`Failed to fetch "${type}" token`, { code: "token-missing" });
    }
    this.tokenCache.set(type, token);
    return token;
  }

  /** Detects (and caches) the target wiki's MediaWiki version + extensions. */
  async getCapabilities(): Promise<WikiCapabilities> {
    this.capabilities ??= await detectCapabilities(this);
    return this.capabilities;
  }

  /**
   * Low-level Action API call shared by every generated/core module. Callers are responsible
   * for serializing array-valued params to MediaWiki's pipe-separated form before calling this.
   *
   * @param action The Action API `action=` module name, e.g. `"query"`, `"edit"`.
   * @param params Module-specific parameters, merged with the `action`/`format`/`formatversion` defaults.
   * @param options See {@link ActionCallOptions}.
   * @returns The parsed JSON response body.
   * @throws {MediaWikiApiError} If the response contains an `error` envelope (after maxlag retries are exhausted).
   */
  async call(
    action: string,
    params: Record<string, unknown> = {},
    options: ActionCallOptions = {}
  ): Promise<unknown> {
    if (!options.skipAuth) {
      await this.ensureAuthenticated();
    }

    const method = options.method ?? "GET";
    const requestParams: Record<string, string> = { action, format: "json", formatversion: "2" };
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        requestParams[key] = String(value);
      }
    }

    const config: AxiosRequestConfig =
      method === "GET" ? { method, params: requestParams } : { method, data: new URLSearchParams(requestParams) };

    const deadline = Date.now() + this.maxlagRetrySeconds * 1000;
    for (;;) {
      const response = await this.axios.request(config);
      const body = response.data as ActionApiErrorBody;
      // formatversion=2 error responses may use either the singular `error` envelope or an `errors[]` array.
      const error = body?.error ?? body?.errors?.[0];
      if (error) {
        const message = "info" in error ? error.info : error.text;
        if (error.code === "maxlag" && Date.now() < deadline) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }
        throw new MediaWikiApiError(message ?? error.code, { code: error.code, httpStatus: response.status });
      }
      return response.data;
    }
  }
}
