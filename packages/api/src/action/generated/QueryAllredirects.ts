/**
 * Generated from `action=paraminfo&modules=query+allredirects`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+allredirects` module (group: list). */
export interface QueryAllredirectsParams {
  continue?: string;
  from?: string;
  to?: string;
  prefix?: string;
  unique?: boolean;
  prop?: ("fragment" | "ids" | "interwiki" | "title")[] | ("fragment" | "ids" | "interwiki" | "title"); /** Default: `"title"`. */
  namespace?: number; /** Default: `0`. */
  limit?: number; /** Default: `10`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
