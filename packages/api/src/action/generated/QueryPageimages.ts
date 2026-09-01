/**
 * Generated from `action=paraminfo&modules=query+pageimages`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+pageimages` module (group: prop). */
export interface QueryPageimagesParams {
  prop?: ("name" | "original" | "thumbnail")[] | ("name" | "original" | "thumbnail"); /** Default: `"thumbnail|name"`. */
  thumbsize?: number; /** Default: `50`. */
  limit?: number; /** Default: `50`. */
  license?: "any" | "free"; /** Default: `"free"`. */
  continue?: number;
  langcode?: string;
}
