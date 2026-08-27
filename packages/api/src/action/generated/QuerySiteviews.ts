/**
 * Generated from `action=paraminfo&modules=query+siteviews`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+siteviews` module (group: meta). */
export interface QuerySiteviewsParams {
  metric?: "pageviews" | "uniques"; /** Default: `"pageviews"`. */
  days?: number; /** Default: `60`. */
}
