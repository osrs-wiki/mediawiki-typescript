/**
 * Generated from `action=paraminfo&modules=query+users`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+users` module (group: list). */
export interface QueryUsersParams {
  prop?: ("blockinfo" | "cancreate" | "centralids" | "editcount" | "emailable" | "gender" | "groupmemberships" | "groups" | "implicitgroups" | "registration" | "rights" | "tempexpired")[] | ("blockinfo" | "cancreate" | "centralids" | "editcount" | "emailable" | "gender" | "groupmemberships" | "groups" | "implicitgroups" | "registration" | "rights" | "tempexpired");
  attachedwiki?: string;
  users?: string[] | string;
  userids?: number[] | number;
}
