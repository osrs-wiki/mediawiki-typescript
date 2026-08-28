/**
 * Generated from `action=paraminfo&modules=wikilove`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `wikilove` module (group: action). */
export interface WikiloveParams {
  title: string;
  text: string;
  message?: string;
  token: string;
  subject: string;
  type?: string;
  email?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
}
