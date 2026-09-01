/**
 * Generated from `action=paraminfo&modules=query+redirects`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+redirects` module (group: prop). */
export interface QueryRedirectsParams {
  prop?: ("fragment" | "pageid" | "title")[] | ("fragment" | "pageid" | "title"); /** Default: `"pageid|title"`. */
  namespace?: number[] | number;
  show?: ("!fragment" | "fragment")[] | ("!fragment" | "fragment");
  limit?: number; /** Default: `10`. */
  continue?: string;
}
