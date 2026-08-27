import crypto from "crypto";
import type { AxiosInstance } from "axios";
import OAuth from "oauth-1.0a";
import type { AuthStrategy } from "./AuthStrategy";

/** Credential set for a Wikimedia Extension:OAuth owner-only consumer. */
export type OAuth1Credentials = {
  /** Consumer key, as issued when registering the OAuth consumer. */
  consumerKey: string;
  /** Consumer secret, as issued when registering the OAuth consumer. */
  consumerSecret: string;
  /** Access token, as issued once the consumer is approved. */
  accessToken: string;
  /** Access token secret, as issued once the consumer is approved. */
  accessSecret: string;
};

/** OAuth 1.0a owner-only consumer auth, as issued by Wikimedia's Extension:OAuth. */
export class OAuthAuth implements AuthStrategy {
  /** Configured OAuth 1.0a signer (HMAC-SHA1). */
  private readonly oauth: OAuth;
  /** The access token/secret pair used to sign every request. */
  private readonly token: OAuth.Token;

  /** @param credentials See {@link OAuth1Credentials}. */
  constructor(private readonly credentials: OAuth1Credentials) {
    this.oauth = new OAuth({
      consumer: { key: credentials.consumerKey, secret: credentials.consumerSecret },
      signature_method: "HMAC-SHA1",
      hash_function: (baseString, key) => crypto.createHmac("sha1", key).update(baseString).digest("base64"),
    });
    this.token = { key: credentials.accessToken, secret: credentials.accessSecret };
  }

  /** @inheritdoc Signs every outgoing request with an `Authorization: OAuth ...` header. */
  attach(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.request.use((config) => {
      const url = `${config.baseURL ?? ""}${config.url ?? ""}`;
      const method = (config.method ?? "get").toUpperCase();
      const data = (method === "GET" ? config.params : config.data) as Record<string, unknown> | undefined;
      const authHeader = this.oauth.toHeader(this.oauth.authorize({ url, method, data }, this.token));
      config.headers.set(Object.keys(authHeader)[0], Object.values(authHeader)[0]);
      return config;
    });
  }

  requiresCsrfToken(): boolean {
    // OAuth-authenticated requests are not subject to CSRF — origin isn't cookie-derived.
    return false;
  }
}
