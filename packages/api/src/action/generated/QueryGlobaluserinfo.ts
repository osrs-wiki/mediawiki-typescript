/**
 * Generated from `action=paraminfo&modules=query+globaluserinfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+globaluserinfo` module (group: meta). */
export interface QueryGlobaluserinfoParams {
  user?: string;
  id?: number;
  prop?: ("editcount" | "groups" | "merged" | "rights" | "unattached")[] | ("editcount" | "groups" | "merged" | "rights" | "unattached");
}
