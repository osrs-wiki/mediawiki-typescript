/**
 * Generated from `action=paraminfo&modules=query+deletedrevs`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+deletedrevs` module (group: list). */
export interface QueryDeletedrevsParams {
  start?: string;
  end?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  from?: string;
  to?: string;
  prefix?: string;
  unique?: boolean;
  namespace?: number; /** Default: `0`. */
  tag?: string;
  user?: string;
  excludeuser?: string;
  prop?: ("comment" | "content" | "len" | "minor" | "parentid" | "parsedcomment" | "revid" | "sha1" | "tags" | "user" | "userid" | "token")[] | ("comment" | "content" | "len" | "minor" | "parentid" | "parsedcomment" | "revid" | "sha1" | "tags" | "user" | "userid" | "token"); /** Default: `"user|comment"`. */
  limit?: number; /** Default: `10`. */
  continue?: string;
}
