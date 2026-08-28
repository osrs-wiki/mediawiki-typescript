/**
 * Generated from `action=paraminfo&modules=query+alllinks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+alllinks` module (group: list). */
export interface QueryAlllinksParams {
  continue?: string;
  from?: string;
  to?: string;
  prefix?: string;
  unique?: boolean;
  prop?: ("ids" | "title")[] | ("ids" | "title"); /** Default: `"title"`. */
  namespace?: number; /** Default: `0`. */
  limit?: number; /** Default: `10`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
