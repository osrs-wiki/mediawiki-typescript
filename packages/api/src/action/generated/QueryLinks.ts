/**
 * Generated from `action=paraminfo&modules=query+links`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+links` module (group: prop). */
export interface QueryLinksParams {
  namespace?: number[] | number;
  limit?: number; /** Default: `10`. */
  continue?: string;
  titles?: string[] | string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
