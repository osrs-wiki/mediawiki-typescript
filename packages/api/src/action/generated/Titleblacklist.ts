/**
 * Generated from `action=paraminfo&modules=titleblacklist`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `titleblacklist` module (group: action). */
export interface TitleblacklistParams {
  title: string;
  action?: "create" | "createpage" | "createtalk" | "edit" | "move" | "new-account" | "upload"; /** Default: `"edit"`. */
  nooverride?: boolean;
}
