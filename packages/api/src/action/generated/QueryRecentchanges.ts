/**
 * Generated from `action=paraminfo&modules=query+recentchanges`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+recentchanges` module (group: list). */
export interface QueryRecentchangesParams {
  start?: string;
  end?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  namespace?: number[] | number;
  user?: string;
  excludeuser?: string;
  tag?: string;
  prop?: ("comment" | "flags" | "ids" | "loginfo" | "parsedcomment" | "patrolled" | "redirect" | "sha1" | "sizes" | "tags" | "timestamp" | "title" | "user" | "userid")[] | ("comment" | "flags" | "ids" | "loginfo" | "parsedcomment" | "patrolled" | "redirect" | "sha1" | "sizes" | "tags" | "timestamp" | "title" | "user" | "userid"); /** Default: `"title|timestamp|ids"`. */
  show?: ("!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!redirect" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "redirect" | "unpatrolled")[] | ("!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!redirect" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "redirect" | "unpatrolled");
  limit?: number; /** Default: `10`. */
  type?: ("categorize" | "edit" | "external" | "log" | "new")[] | ("categorize" | "edit" | "external" | "log" | "new"); /** Default: `"edit|new|log|categorize"`. */
  toponly?: boolean;
  title?: string;
  continue?: string;
  generaterevisions?: boolean;
  slot?: "main";
}
