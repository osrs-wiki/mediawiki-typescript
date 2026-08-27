/**
 * Generated from `action=paraminfo&modules=query+pageviews`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+pageviews` module (group: prop). */
export interface QueryPageviewsParams {
  metric?: "pageviews"; /** Default: `"pageviews"`. */
  days?: number; /** Default: `60`. */
  continue?: string;
}
