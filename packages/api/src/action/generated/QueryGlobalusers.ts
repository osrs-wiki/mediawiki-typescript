/**
 * Generated from `action=paraminfo&modules=query+globalusers`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+globalusers` module (group: list). */
export interface QueryGlobalusersParams {
  prop?: ("editcount" | "groupmemberships" | "groups" | "localinfo" | "locked" | "registration" | "rights")[] | ("editcount" | "groupmemberships" | "groups" | "localinfo" | "locked" | "registration" | "rights");
  users?: string[] | string;
  centralids?: number[] | number;
  localgroups?: boolean;
}
