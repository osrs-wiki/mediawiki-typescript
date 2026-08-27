import type { AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { MediaWikiAuthError } from "../errors/MediaWikiAuthError";
import type { MediaWikiClient } from "../client/MediaWikiClient";
import type { AuthStrategy } from "./AuthStrategy";

export type BotPasswordCredentials = {
  /** Bot username, in `User@BotName` form as issued by Special:BotPasswords. */
  username: string;
  /** Bot password, as issued by Special:BotPasswords. */
  password: string;
};

/** Response envelope for `action=clientlogin`. */
type ClientLoginResponse = {
  clientlogin?: { status?: string; message?: string };
};

/**
 * Cookie-session auth via `action=clientlogin` using a Special:BotPasswords credential pair.
 * Requires a CSRF token on subsequent privileged calls (see `requiresCsrfToken`).
 */
export class BotPasswordAuth implements AuthStrategy {
  /** Per-instance cookie jar holding the session established by {@link login}. */
  private readonly jar = new CookieJar();

  /** @param credentials Bot username/password pair issued by Special:BotPasswords. */
  constructor(private readonly credentials: BotPasswordCredentials) {}

  /** @inheritdoc */
  attach(axiosInstance: AxiosInstance): void {
    wrapper(axiosInstance);
    axiosInstance.defaults.jar = this.jar;
    axiosInstance.defaults.withCredentials = true;
  }

  /** @inheritdoc */
  requiresCsrfToken(): boolean {
    return true;
  }

  /**
   * Fetches a login token and exchanges it (plus the configured credentials) for a session
   * cookie via `action=clientlogin`.
   * @param client The owning client, used to fetch the login token and issue the clientlogin call.
   * @throws {MediaWikiAuthError} If MediaWiki reports anything other than `status: "PASS"`.
   */
  async login(client: MediaWikiClient): Promise<void> {
    const logintoken = await client.getToken("login");
    const response = (await client.call(
      "clientlogin",
      {
        username: this.credentials.username,
        password: this.credentials.password,
        logintoken,
        loginreturnurl: client.baseUrl,
      },
      { method: "POST", skipAuth: true }
    )) as ClientLoginResponse;

    if (response.clientlogin?.status !== "PASS") {
      throw new MediaWikiAuthError(response.clientlogin?.message ?? "Bot password login failed", "login-failed");
    }
  }
}
