/**
 * Generated from `action=paraminfo&modules=setpagelanguage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `setpagelanguage` module (group: action). */
export interface SetpagelanguageParams {
  title?: string;
  pageid?: number;
  lang: string;
  reason?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  token: string;
}
