/**
 * Generated from `action=paraminfo&modules=feedcontributions`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `feedcontributions` module (group: action). */
export interface FeedcontributionsParams {
  feedformat?: "atom" | "rss"; /** Default: `"rss"`. */
  user: string;
  namespace?: number;
  year?: number;
  month?: number;
  tagfilter?: (string)[] | (string); /** Default: `""`. */
  deletedonly?: boolean;
  toponly?: boolean;
  newonly?: boolean;
  hideminor?: boolean;
  showsizediff?: boolean;
}
