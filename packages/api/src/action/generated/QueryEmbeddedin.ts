/**
 * Generated from `action=paraminfo&modules=query+embeddedin`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+embeddedin` module (group: list). */
export interface QueryEmbeddedinParams {
  title?: string;
  pageid?: number;
  continue?: string;
  namespace?: number[] | number;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  filterredir?: "all" | "nonredirects" | "redirects"; /** Default: `"all"`. */
  limit?: number; /** Default: `10`. */
}
