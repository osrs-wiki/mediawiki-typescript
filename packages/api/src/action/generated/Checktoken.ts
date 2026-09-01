/**
 * Generated from `action=paraminfo&modules=checktoken`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `checktoken` module (group: action). */
export interface ChecktokenParams {
  type: "createaccount" | "csrf" | "deleteglobalaccount" | "login" | "patrol" | "rollback" | "setglobalaccountstatus" | "userrights" | "watch";
  token: string;
  maxtokenage?: number;
}
