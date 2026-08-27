/**
 * Generated from `action=paraminfo&modules=query+extracts`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+extracts` module (group: prop). */
export interface QueryExtractsParams {
  chars?: number;
  sentences?: number;
  limit?: number; /** Default: `20`. */
  intro?: boolean;
  plaintext?: boolean;
  sectionformat?: "plain" | "raw" | "wiki"; /** Default: `"wiki"`. */
  continue?: number;
}
