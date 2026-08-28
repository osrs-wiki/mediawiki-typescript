/**
 * Generated from `action=paraminfo&modules=query+allfileusages`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+allfileusages` module (group: list). */
export interface QueryAllfileusagesParams {
  continue?: string;
  from?: string;
  to?: string;
  prefix?: string;
  unique?: boolean;
  prop?: ("ids" | "title")[] | ("ids" | "title"); /** Default: `"title"`. */
  limit?: number; /** Default: `10`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
