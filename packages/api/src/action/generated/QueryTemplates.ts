/**
 * Generated from `action=paraminfo&modules=query+templates`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+templates` module (group: prop). */
export interface QueryTemplatesParams {
  namespace?: number[] | number;
  limit?: number; /** Default: `10`. */
  continue?: string;
  templates?: string[] | string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
