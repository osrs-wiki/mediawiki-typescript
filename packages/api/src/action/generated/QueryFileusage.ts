/**
 * Generated from `action=paraminfo&modules=query+fileusage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+fileusage` module (group: prop). */
export interface QueryFileusageParams {
  prop?: ("pageid" | "redirect" | "title")[] | ("pageid" | "redirect" | "title"); /** Default: `"pageid|title|redirect"`. */
  namespace?: number[] | number;
  show?: ("!redirect" | "redirect")[] | ("!redirect" | "redirect");
  limit?: number; /** Default: `10`. */
  continue?: string;
}
