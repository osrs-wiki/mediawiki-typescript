/**
 * Generated from `action=paraminfo&modules=query+categories`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+categories` module (group: prop). */
export interface QueryCategoriesParams {
  prop?: ("hidden" | "sortkey" | "timestamp")[] | ("hidden" | "sortkey" | "timestamp");
  show?: ("!hidden" | "hidden")[] | ("!hidden" | "hidden");
  limit?: number; /** Default: `10`. */
  continue?: string;
  categories?: string[] | string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
