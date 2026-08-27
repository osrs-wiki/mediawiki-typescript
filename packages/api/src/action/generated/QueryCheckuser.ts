/**
 * Generated from `action=paraminfo&modules=query+checkuser`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+checkuser` module (group: list). */
export interface QueryCheckuserParams {
  request: "actions" | "ipusers" | "userips" | "edits";
  target: string;
  reason: string; /** Default: `""`. */
  limit?: number; /** Default: `500`. */
  timecond?: string; /** Default: `"-2 weeks"`. */
  xff?: string;
  token: string;
}
