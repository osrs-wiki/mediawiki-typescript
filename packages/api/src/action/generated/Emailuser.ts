/**
 * Generated from `action=paraminfo&modules=emailuser`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `emailuser` module (group: action). */
export interface EmailuserParams {
  target: string;
  subject: string;
  text: string;
  ccme?: boolean;
  token: string;
}
