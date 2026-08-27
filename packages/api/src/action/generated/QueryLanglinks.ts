/**
 * Generated from `action=paraminfo&modules=query+langlinks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+langlinks` module (group: prop). */
export interface QueryLanglinksParams {
  prop?: ("autonym" | "langname" | "url")[] | ("autonym" | "langname" | "url");
  lang?: string;
  title?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  inlanguagecode?: string; /** Default: `"en"`. */
  limit?: number; /** Default: `10`. */
  continue?: string;
  url?: boolean;
}
