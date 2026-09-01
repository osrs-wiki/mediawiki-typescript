/**
 * Generated from `action=paraminfo&modules=query+tokens`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+tokens` module (group: meta). */
export interface QueryTokensParams {
  type?: ("createaccount" | "csrf" | "deleteglobalaccount" | "login" | "patrol" | "rollback" | "setglobalaccountstatus" | "userrights" | "watch")[] | ("createaccount" | "csrf" | "deleteglobalaccount" | "login" | "patrol" | "rollback" | "setglobalaccountstatus" | "userrights" | "watch"); /** Default: `"csrf"`. */
}
