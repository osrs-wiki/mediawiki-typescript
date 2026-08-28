/**
 * Generated from `action=paraminfo&modules=patrol`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `patrol` module (group: action). */
export interface PatrolParams {
  rcid?: number;
  revid?: number;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  token: string;
}
