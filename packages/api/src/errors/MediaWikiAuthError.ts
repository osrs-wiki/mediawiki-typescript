import { MediaWikiApiError } from "./MediaWikiApiError";

/** Raised for login/CSRF/OAuth signing failures, distinct from general API errors. */
export class MediaWikiAuthError extends MediaWikiApiError {
  /**
   * @param message Human-readable error message.
   * @param code Machine-readable error code. Defaults to `"auth-failed"`.
   */
  constructor(message: string, code = "auth-failed") {
    super(message, { code });
    this.name = "MediaWikiAuthError";
  }
}
