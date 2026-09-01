/**
 * Generated from `action=paraminfo&modules=query+langbacklinks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+langbacklinks` module (group: list). */
export interface QueryLangbacklinksParams {
  lang?: string;
  title?: string;
  continue?: string;
  limit?: number; /** Default: `10`. */
  prop?: ("lllang" | "lltitle")[] | ("lllang" | "lltitle"); /** Default: `""`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
