/**
 * Generated from `action=paraminfo&modules=query+mystashedfiles`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+mystashedfiles` module (group: list). */
export interface QueryMystashedfilesParams {
  prop?: ("size" | "type")[] | ("size" | "type"); /** Default: `""`. */
  limit?: number; /** Default: `10`. */
  continue?: string;
}
