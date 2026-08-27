/**
 * Generated from `action=paraminfo&modules=sitematrix`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `sitematrix` module (group: action). */
export interface SitematrixParams {
  type?: ("language" | "special")[] | ("language" | "special"); /** Default: `"special|language"`. */
  state?: ("all" | "closed" | "fishbowl" | "nonglobal" | "private")[] | ("all" | "closed" | "fishbowl" | "nonglobal" | "private"); /** Default: `"all"`. */
  langprop?: ("code" | "dir" | "localname" | "name" | "site")[] | ("code" | "dir" | "localname" | "name" | "site"); /** Default: `"code|name|site|dir|localname"`. */
  siteprop?: ("code" | "dbname" | "lang" | "sitename" | "url")[] | ("code" | "dbname" | "lang" | "sitename" | "url"); /** Default: `"url|dbname|code|sitename"`. */
  limit?: number; /** Default: `5000`. */
  continue?: string;
}
