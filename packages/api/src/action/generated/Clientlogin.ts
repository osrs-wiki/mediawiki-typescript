/**
 * Generated from `action=paraminfo&modules=clientlogin`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `clientlogin` module (group: action). */
export interface ClientloginParams {
  requests?: string[] | string;
  messageformat?: "html" | "none" | "raw" | "wikitext"; /** Default: `"wikitext"`. */
  mergerequestfields?: boolean;
  preservestate?: boolean;
  returnurl?: string;
  continue?: boolean;
  reauthenticate?: string;
  token: string;
}
