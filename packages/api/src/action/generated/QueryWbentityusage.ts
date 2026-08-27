/**
 * Generated from `action=paraminfo&modules=query+wbentityusage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+wbentityusage` module (group: prop). */
export interface QueryWbentityusageParams {
  prop?: "url"[] | "url";
  aspect?: ("C" | "D" | "L" | "O" | "S" | "T" | "X")[] | ("C" | "D" | "L" | "O" | "S" | "T" | "X");
  entities?: string[] | string;
  limit?: number; /** Default: `10`. */
  continue?: string;
}
