/**
 * Generated from `action=paraminfo&modules=query+managemessagegroups`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+managemessagegroups` module (group: meta). */
export interface QueryManagemessagegroupsParams {
  groupId: string;
  messageKey: string;
  changesetName?: string; /** Default: `"default"`. */
}
