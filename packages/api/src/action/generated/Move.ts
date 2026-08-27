/**
 * Generated from `action=paraminfo&modules=move`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `move` module (group: action). */
export interface MoveParams {
  from?: string;
  fromid?: number;
  to: string;
  reason?: string; /** Default: `""`. */
  movetalk?: boolean;
  movesubpages?: boolean;
  noredirect?: boolean;
  watchlist?: "nochange" | "preferences" | "unwatch" | "watch"; /** Default: `"preferences"`. */
  watchlistexpiry?: string;
  ignorewarnings?: boolean;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  token: string;
}
