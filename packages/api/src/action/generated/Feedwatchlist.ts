/**
 * Generated from `action=paraminfo&modules=feedwatchlist`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `feedwatchlist` module (group: action). */
export interface FeedwatchlistParams {
  feedformat?: "atom" | "rss"; /** Default: `"rss"`. */
  hours?: number; /** Default: `24`. */
  linktosections?: boolean;
  allrev?: boolean;
  wlowner?: string;
  wltoken?: string;
  wlshow?: ("!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!unread" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "unread")[] | ("!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!unread" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "unread");
  wltype?: ("categorize" | "edit" | "external" | "log" | "new")[] | ("categorize" | "edit" | "external" | "log" | "new"); /** Default: `"edit|new|log|categorize"`. */
  wlexcludeuser?: string;
}
