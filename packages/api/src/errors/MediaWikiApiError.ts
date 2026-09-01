/** A single error/warning entry as MediaWiki attaches to `errors[]`/`warnings` in its response. */
export type MediaWikiApiErrorInfo = {
  /** MediaWiki's machine-readable error code, e.g. `"badtoken"`, `"maxlag"`. */
  code: string;
  /** Human-readable error message, if provided. */
  info?: string;
  /** Raw `*` / extra fields MediaWiki attaches to individual error/warning objects. */
  data?: unknown;
};

/**
 * Normalizes both Action API (`error`/`errors[]`) and REST API (HTTP problem json) failures into
 * one shape so callers don't need to branch on which API produced the failure.
 */
export class MediaWikiApiError extends Error {
  /** MediaWiki's (or a synthesized) machine-readable error code for this failure. */
  readonly code: string;
  /** The HTTP status code of the failing response, if known. */
  readonly httpStatus?: number;
  /** All individual error entries associated with this failure. */
  readonly errors: MediaWikiApiErrorInfo[];

  /**
   * @param message Human-readable error message.
   * @param options.code Machine-readable error code.
   * @param options.httpStatus HTTP status code of the failing response, if known.
   * @param options.errors Individual error entries; defaults to a single entry built from `code`/`message`.
   */
  constructor(message: string, options: { code: string; httpStatus?: number; errors?: MediaWikiApiErrorInfo[] }) {
    super(message);
    this.name = "MediaWikiApiError";
    this.code = options.code;
    this.httpStatus = options.httpStatus;
    this.errors = options.errors ?? [{ code: options.code, info: message }];
  }
}
