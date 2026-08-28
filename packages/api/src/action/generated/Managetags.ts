/**
 * Generated from `action=paraminfo&modules=managetags`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `managetags` module (group: action). */
export interface ManagetagsParams {
  operation: "activate" | "create" | "deactivate" | "delete";
  tag: string;
  reason?: string; /** Default: `""`. */
  ignorewarnings?: boolean;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  token: string;
}
