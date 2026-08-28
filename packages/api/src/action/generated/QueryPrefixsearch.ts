/**
 * Generated from `action=paraminfo&modules=query+prefixsearch`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+prefixsearch` module (group: list). */
export interface QueryPrefixsearchParams {
  search: string;
  namespace?: number[] | number; /** Default: `0`. */
  limit?: number; /** Default: `10`. */
  offset?: number; /** Default: `0`. */
  profile?: "classic" | "engine_autoselect" | "fast-fuzzy" | "fuzzy" | "fuzzy-subphrases" | "normal" | "normal-subphrases" | "strict"; /** Default: `"engine_autoselect"`. */
}
