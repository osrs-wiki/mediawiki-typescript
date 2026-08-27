/**
 * Generated from `action=paraminfo&modules=linkaccount`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `linkaccount` module (group: action). */
export interface LinkaccountParams {
  requests?: string[] | string;
  messageformat?: "html" | "none" | "raw" | "wikitext"; /** Default: `"wikitext"`. */
  mergerequestfields?: boolean;
  returnurl?: string;
  continue?: boolean;
  token: string;
}
