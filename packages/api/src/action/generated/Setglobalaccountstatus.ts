/**
 * Generated from `action=paraminfo&modules=setglobalaccountstatus`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `setglobalaccountstatus` module (group: action). */
export interface SetglobalaccountstatusParams {
  user: string;
  locked?: "" | "lock" | "unlock";
  hidden?: "" | "lists" | "suppressed";
  reason?: string;
  statecheck?: string;
  token: string;
}
