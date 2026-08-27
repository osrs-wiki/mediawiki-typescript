/**
 * Generated from `action=paraminfo&modules=feedrecentchanges`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `feedrecentchanges` module (group: action). */
export interface FeedrecentchangesParams {
  feedformat?: "atom" | "rss"; /** Default: `"rss"`. */
  namespace?: number;
  invert?: boolean;
  associated?: boolean;
  days?: number; /** Default: `7`. */
  limit?: number; /** Default: `50`. */
  from?: string;
  hideminor?: boolean;
  hidebots?: boolean;
  hideanons?: boolean;
  hideliu?: boolean;
  hidepatrolled?: boolean;
  hidemyself?: boolean;
  hidecategorization?: boolean;
  tagfilter?: string;
  inverttags?: boolean;
  target?: string;
  showlinkedto?: boolean;
}
