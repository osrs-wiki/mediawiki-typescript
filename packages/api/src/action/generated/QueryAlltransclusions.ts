/**
 * Generated from `action=paraminfo&modules=query+alltransclusions`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+alltransclusions` module (group: list). */
export interface QueryAlltransclusionsParams {
  continue?: string;
  from?: string;
  to?: string;
  prefix?: string;
  unique?: boolean;
  prop?: ("ids" | "title")[] | ("ids" | "title"); /** Default: `"title"`. */
  namespace?: number; /** Default: `10`. */
  limit?: number; /** Default: `10`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
