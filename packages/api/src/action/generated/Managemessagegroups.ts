/**
 * Generated from `action=paraminfo&modules=managemessagegroups`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `managemessagegroups` module (group: action). */
export interface ManagemessagegroupsParams {
  groupId: string;
  renameMessageKey?: string;
  messageKey: string;
  operation: "new" | "rename";
  changesetName?: string; /** Default: `"default"`. */
  changesetModified: number;
  token: string;
}
