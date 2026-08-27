/**
 * Generated from `action=paraminfo&modules=query+authmanagerinfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+authmanagerinfo` module (group: meta). */
export interface QueryAuthmanagerinfoParams {
  securitysensitiveoperation?: string;
  requestsfor?: "change" | "create" | "create-continue" | "link" | "link-continue" | "login" | "login-continue" | "remove" | "unlink";
  reauthenticate?: string;
  mergerequestfields?: boolean;
  messageformat?: "html" | "none" | "raw" | "wikitext"; /** Default: `"wikitext"`. */
}
