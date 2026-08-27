/**
 * Generated from `action=paraminfo&modules=echomute`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `echomute` module (group: action). */
export interface EchomuteParams {
  type: "page-linked-title" | "user";
  mute?: string[] | string;
  unmute?: string[] | string;
  token: string;
}
