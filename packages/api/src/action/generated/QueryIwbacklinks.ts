/**
 * Generated from `action=paraminfo&modules=query+iwbacklinks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+iwbacklinks` module (group: list). */
export interface QueryIwbacklinksParams {
  prefix?: string;
  title?: string;
  continue?: string;
  limit?: number; /** Default: `10`. */
  prop?: ("iwprefix" | "iwtitle")[] | ("iwprefix" | "iwtitle"); /** Default: `""`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
