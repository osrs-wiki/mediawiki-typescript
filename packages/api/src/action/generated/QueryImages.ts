/**
 * Generated from `action=paraminfo&modules=query+images`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+images` module (group: prop). */
export interface QueryImagesParams {
  limit?: number; /** Default: `10`. */
  continue?: string;
  images?: string[] | string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
