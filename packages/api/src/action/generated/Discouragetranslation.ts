/**
 * Generated from `action=paraminfo&modules=discouragetranslation`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `discouragetranslation` module (group: action). */
export interface DiscouragetranslationParams {
  title?: string;
  pageid?: number;
  do: "discourage" | "encourage";
  reason?: string;
  token: string;
}
