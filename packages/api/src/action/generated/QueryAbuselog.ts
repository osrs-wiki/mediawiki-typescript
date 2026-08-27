/**
 * Generated from `action=paraminfo&modules=query+abuselog`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+abuselog` module (group: list). */
export interface QueryAbuselogParams {
  logid?: number;
  start?: string;
  end?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  user?: string;
  title?: string;
  filter?: string[] | string;
  limit?: number; /** Default: `10`. */
  prop?: ("action" | "details" | "filter" | "hidden" | "ids" | "result" | "revid" | "timestamp" | "title" | "user")[] | ("action" | "details" | "filter" | "hidden" | "ids" | "result" | "revid" | "timestamp" | "title" | "user"); /** Default: `"ids|user|title|action|result|timestamp|hidden|revid"`. */
}
