/**
 * Generated from `action=paraminfo&modules=paraminfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `paraminfo` module (group: action). */
export interface ParaminfoParams {
  modules?: string[] | string;
  helpformat?: "html" | "none" | "raw" | "wikitext"; /** Default: `"none"`. */
  querymodules?: (string)[] | (string);
  mainmodule?: string;
  pagesetmodule?: string;
  formatmodules?: ("json" | "jsonfm" | "none" | "rawfm" | "xml" | "xmlfm")[] | ("json" | "jsonfm" | "none" | "rawfm" | "xml" | "xmlfm");
}
