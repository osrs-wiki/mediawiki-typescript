/**
 * Generated from `action=paraminfo&modules=query+abusefilters`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+abusefilters` module (group: list). */
export interface QueryAbusefiltersParams {
  startid?: number;
  endid?: number;
  dir?: "newer" | "older"; /** Default: `"newer"`. */
  show?: ("!deleted" | "!enabled" | "!private" | "!protected" | "deleted" | "enabled" | "private" | "protected")[] | ("!deleted" | "!enabled" | "!private" | "!protected" | "deleted" | "enabled" | "private" | "protected");
  limit?: number; /** Default: `10`. */
  prop?: ("actions" | "comments" | "description" | "hits" | "id" | "lasteditor" | "lastedittime" | "pattern" | "private" | "protected" | "status")[] | ("actions" | "comments" | "description" | "hits" | "id" | "lasteditor" | "lastedittime" | "pattern" | "private" | "protected" | "status"); /** Default: `"id|description|actions|status"`. */
}
