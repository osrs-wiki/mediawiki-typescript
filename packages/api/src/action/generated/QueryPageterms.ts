/**
 * Generated from `action=paraminfo&modules=query+pageterms`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+pageterms` module (group: prop). */
export interface QueryPagetermsParams {
  continue?: number;
  language?: string; /** Default: `"uselang"`. */
  terms?: ("alias" | "description" | "label")[] | ("alias" | "description" | "label"); /** Default: `"alias|label|description"`. */
}
