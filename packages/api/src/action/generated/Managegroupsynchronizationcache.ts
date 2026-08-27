/**
 * Generated from `action=paraminfo&modules=managegroupsynchronizationcache`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `managegroupsynchronizationcache` module (group: action). */
export interface ManagegroupsynchronizationcacheParams {
  operation: "resolveGroup" | "resolveMessage";
  title?: string;
  group: string;
  token: string;
}
