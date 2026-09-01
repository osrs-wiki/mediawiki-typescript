/**
 * Generated from `action=paraminfo&modules=createaccount`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `createaccount` module (group: action). */
export interface CreateaccountParams {
  requests?: string[] | string;
  messageformat?: "html" | "none" | "raw" | "wikitext"; /** Default: `"wikitext"`. */
  mergerequestfields?: boolean;
  preservestate?: boolean;
  returnurl?: string;
  continue?: boolean;
  token: string;
}
