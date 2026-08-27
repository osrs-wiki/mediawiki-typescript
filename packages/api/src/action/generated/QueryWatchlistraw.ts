/**
 * Generated from `action=paraminfo&modules=query+watchlistraw`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+watchlistraw` module (group: list). */
export interface QueryWatchlistrawParams {
  continue?: string;
  namespace?: number[] | number;
  limit?: number; /** Default: `10`. */
  prop?: "changed"[] | "changed";
  show?: ("!changed" | "changed")[] | ("!changed" | "changed");
  owner?: string;
  token?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  fromtitle?: string;
  totitle?: string;
}
