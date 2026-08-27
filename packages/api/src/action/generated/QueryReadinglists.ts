/**
 * Generated from `action=paraminfo&modules=query+readinglists`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+readinglists` module (group: meta). */
export interface QueryReadinglistsParams {
  list?: number;
  project?: string;
  title?: string;
  changedsince?: string;
  sort?: "name" | "updated";
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  limit?: number; /** Default: `10`. */
  continue?: string;
}
