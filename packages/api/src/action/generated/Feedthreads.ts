/**
 * Generated from `action=paraminfo&modules=feedthreads`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `feedthreads` module (group: action). */
export interface FeedthreadsParams {
  feedformat?: "atom" | "rss"; /** Default: `"rss"`. */
  days?: number; /** Default: `7`. */
  type?: ("newthreads" | "replies")[] | ("newthreads" | "replies"); /** Default: `"newthreads"`. */
  talkpage?: string[] | string;
  thread?: string[] | string;
}
