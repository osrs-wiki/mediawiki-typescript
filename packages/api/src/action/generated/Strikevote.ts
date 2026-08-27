/**
 * Generated from `action=paraminfo&modules=strikevote`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `strikevote` module (group: action). */
export interface StrikevoteParams {
  option: "strike" | "unstrike";
  reason: string;
  voteid: number;
  token: string;
}
