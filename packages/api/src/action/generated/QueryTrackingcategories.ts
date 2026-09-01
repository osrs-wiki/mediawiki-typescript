/**
 * Generated from `action=paraminfo&modules=query+trackingcategories`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+trackingcategories` module (group: list). */
export interface QueryTrackingcategoriesParams {
  continue?: string;
  trackingcatname?: string[] | string;
  min?: number;
  max?: number;
  limit?: number; /** Default: `10`. */
  prop?: ("hidden" | "size")[] | ("hidden" | "size"); /** Default: `""`. */
}
