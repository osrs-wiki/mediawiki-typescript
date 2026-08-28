/**
 * Generated from `action=paraminfo&modules=query+usercontribs`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+usercontribs` module (group: list). */
export interface QueryUsercontribsParams {
  limit?: number; /** Default: `10`. */
  start?: string;
  end?: string;
  continue?: string;
  user?: string[] | string;
  userids?: number[] | number;
  userprefix?: string;
  iprange?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  namespace?: number[] | number;
  prop?: ("comment" | "flags" | "ids" | "parsedcomment" | "patrolled" | "size" | "sizediff" | "tags" | "timestamp" | "title")[] | ("comment" | "flags" | "ids" | "parsedcomment" | "patrolled" | "size" | "sizediff" | "tags" | "timestamp" | "title"); /** Default: `"ids|title|timestamp|comment|size|flags"`. */
  show?: ("!autopatrolled" | "!minor" | "!new" | "!patrolled" | "!top" | "autopatrolled" | "minor" | "new" | "patrolled" | "top")[] | ("!autopatrolled" | "!minor" | "!new" | "!patrolled" | "!top" | "autopatrolled" | "minor" | "new" | "patrolled" | "top");
  tag?: string;
  toponly?: boolean;
}
