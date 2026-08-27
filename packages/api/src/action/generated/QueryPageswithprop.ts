/**
 * Generated from `action=paraminfo&modules=query+pageswithprop`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+pageswithprop` module (group: list). */
export interface QueryPageswithpropParams {
  propname: string;
  prop?: ("ids" | "title" | "value")[] | ("ids" | "title" | "value"); /** Default: `"ids|title"`. */
  continue?: string;
  limit?: number; /** Default: `10`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
