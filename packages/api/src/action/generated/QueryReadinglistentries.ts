/**
 * Generated from `action=paraminfo&modules=query+readinglistentries`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+readinglistentries` module (group: list). */
export interface QueryReadinglistentriesParams {
  lists?: number[] | number;
  projects?: string[] | string;
  changedsince?: string;
  sort?: "name" | "updated";
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  limit?: number; /** Default: `10`. */
  continue?: string;
}
