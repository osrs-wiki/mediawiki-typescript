/**
 * Generated from `action=paraminfo&modules=query+mapdata`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+mapdata` module (group: prop). */
export interface QueryMapdataParams {
  groups?: string; /** Default: `""`. */
  limit?: number; /** Default: `10`. */
  continue?: number;
  parser?: "legacy" | "parsoid";
}
