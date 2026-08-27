/**
 * Generated from `action=paraminfo&modules=editmassmessagelist`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `editmassmessagelist` module (group: action). */
export interface EditmassmessagelistParams {
  spamlist: string;
  description?: string;
  add?: string[] | string;
  remove?: string[] | string;
  minor?: boolean;
  watchlist?: "nochange" | "preferences" | "unwatch" | "watch"; /** Default: `"preferences"`. */
  token: string;
}
