/**
 * Generated from `action=paraminfo&modules=undelete`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `undelete` module (group: action). */
export interface UndeleteParams {
  title: string;
  reason?: string; /** Default: `""`. */
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  timestamps?: string[] | string;
  fileids?: number[] | number;
  undeletetalk?: boolean;
  watchlist?: "nochange" | "preferences" | "unwatch" | "watch"; /** Default: `"preferences"`. */
  watchlistexpiry?: string;
  token: string;
}
