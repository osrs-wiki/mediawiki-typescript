/**
 * Generated from `action=paraminfo&modules=query+gadgetcategories`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+gadgetcategories` module (group: list). */
export interface QueryGadgetcategoriesParams {
  prop?: ("members" | "name" | "title")[] | ("members" | "name" | "title"); /** Default: `"name"`. */
  names?: string[] | string;
}
