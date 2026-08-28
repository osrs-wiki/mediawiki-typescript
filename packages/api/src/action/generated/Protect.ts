/**
 * Generated from `action=paraminfo&modules=protect`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `protect` module (group: action). */
export interface ProtectParams {
  title?: string;
  pageid?: number;
  protections: string[] | string;
  expiry?: string[] | string; /** Default: `"infinite"`. */
  reason?: string; /** Default: `""`. */
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  cascade?: boolean;
  watch?: boolean;
  watchlist?: "nochange" | "preferences" | "unwatch" | "watch"; /** Default: `"preferences"`. */
  watchlistexpiry?: string;
  token: string;
}
