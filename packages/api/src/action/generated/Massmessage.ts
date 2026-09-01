/**
 * Generated from `action=paraminfo&modules=massmessage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `massmessage` module (group: action). */
export interface MassmessageParams {
  spamlist: string;
  subject: string;
  message?: string;
  "page-message"?: string;
  token: string;
}
