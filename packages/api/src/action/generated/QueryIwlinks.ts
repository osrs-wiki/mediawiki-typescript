/**
 * Generated from `action=paraminfo&modules=query+iwlinks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+iwlinks` module (group: prop). */
export interface QueryIwlinksParams {
  prop?: "url"[] | "url";
  prefix?: string;
  title?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  limit?: number; /** Default: `10`. */
  continue?: string;
  url?: boolean;
}
