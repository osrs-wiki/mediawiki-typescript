/**
 * Generated from `action=paraminfo&modules=delete`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `delete` module (group: action). */
export interface DeleteParams {
  title?: string;
  pageid?: number;
  reason?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  deletetalk?: boolean;
  watch?: boolean;
  watchlist?: "nochange" | "preferences" | "unwatch" | "watch"; /** Default: `"preferences"`. */
  watchlistexpiry?: string;
  unwatch?: boolean;
  oldimage?: string;
  token: string;
}
