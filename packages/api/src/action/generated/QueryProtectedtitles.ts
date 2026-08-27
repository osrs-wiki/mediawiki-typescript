/**
 * Generated from `action=paraminfo&modules=query+protectedtitles`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+protectedtitles` module (group: list). */
export interface QueryProtectedtitlesParams {
  namespace?: number[] | number;
  level?: ("autoconfirmed" | "sysop")[] | ("autoconfirmed" | "sysop");
  limit?: number; /** Default: `10`. */
  dir?: "newer" | "older"; /** Default: `"older"`. */
  start?: string;
  end?: string;
  prop?: ("comment" | "expiry" | "level" | "parsedcomment" | "timestamp" | "user" | "userid")[] | ("comment" | "expiry" | "level" | "parsedcomment" | "timestamp" | "user" | "userid"); /** Default: `"timestamp|level"`. */
  continue?: string;
}
