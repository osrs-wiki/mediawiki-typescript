/**
 * Generated from `action=paraminfo&modules=query+wblistentityusage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+wblistentityusage` module (group: list). */
export interface QueryWblistentityusageParams {
  prop?: "url"[] | "url";
  aspect?: ("C" | "D" | "L" | "O" | "S" | "T" | "X")[] | ("C" | "D" | "L" | "O" | "S" | "T" | "X");
  entities: string[] | string;
  limit?: number; /** Default: `10`. */
  continue?: string;
}
