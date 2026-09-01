/**
 * Generated from `action=paraminfo&modules=opensearch`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `opensearch` module (group: action). */
export interface OpensearchParams {
  search: string;
  namespace?: number[] | number; /** Default: `0`. */
  limit?: number; /** Default: `10`. */
  profile?: "classic" | "engine_autoselect" | "fast-fuzzy" | "fuzzy" | "fuzzy-subphrases" | "normal" | "normal-subphrases" | "strict"; /** Default: `"engine_autoselect"`. */
  suggest?: boolean;
  redirects?: "resolve" | "return";
  format?: "json" | "jsonfm" | "xml" | "xmlfm"; /** Default: `"json"`. */
  warningsaserror?: boolean;
}
