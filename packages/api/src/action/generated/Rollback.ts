/**
 * Generated from `action=paraminfo&modules=rollback`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `rollback` module (group: action). */
export interface RollbackParams {
  title?: string;
  pageid?: number;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  user: string;
  summary?: string; /** Default: `""`. */
  markbot?: boolean;
  watchlist?: "nochange" | "preferences" | "unwatch" | "watch"; /** Default: `"preferences"`. */
  watchlistexpiry?: string;
  token: string;
}
