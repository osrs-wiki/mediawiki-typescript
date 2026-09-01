/**
 * Generated from `action=paraminfo&modules=messagegroupsubscription`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `messagegroupsubscription` module (group: action). */
export interface MessagegroupsubscriptionParams {
  groupId: string;
  operation: "subscribe" | "unsubscribe";
  token: string;
}
