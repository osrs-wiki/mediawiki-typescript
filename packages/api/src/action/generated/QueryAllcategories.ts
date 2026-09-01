/**
 * Generated from `action=paraminfo&modules=query+allcategories`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+allcategories` module (group: list). */
export interface QueryAllcategoriesParams {
  from?: string;
  continue?: string;
  to?: string;
  prefix?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  min?: number;
  max?: number;
  limit?: number; /** Default: `10`. */
  prop?: ("hidden" | "size")[] | ("hidden" | "size"); /** Default: `""`. */
}
