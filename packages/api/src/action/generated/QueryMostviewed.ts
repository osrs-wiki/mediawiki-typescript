/**
 * Generated from `action=paraminfo&modules=query+mostviewed`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+mostviewed` module (group: list). */
export interface QueryMostviewedParams {
  metric?: "pageviews"; /** Default: `"pageviews"`. */
  limit?: number; /** Default: `10`. */
  offset?: number; /** Default: `0`. */
}
