/**
 * Generated from `action=paraminfo&modules=featuredfeed`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `featuredfeed` module (group: action). */
export interface FeaturedfeedParams {
  feedformat?: "atom" | "rss"; /** Default: `"rss"`. */
  feed: string;
  language?: string;
}
