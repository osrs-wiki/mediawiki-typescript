/**
 * Generated from `action=paraminfo&modules=query+watchlist`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+watchlist` module (group: list). */
export interface QueryWatchlistParams {
  allrev?: boolean;
  start?: string;
  end?: string;
  namespace?: number[] | number;
  user?: string;
  excludeuser?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  limit?: number; /** Default: `10`. */
  prop?: ("comment" | "expiry" | "flags" | "ids" | "labels" | "loginfo" | "notificationtimestamp" | "parsedcomment" | "patrol" | "sizes" | "tags" | "timestamp" | "title" | "user" | "userid")[] | ("comment" | "expiry" | "flags" | "ids" | "labels" | "loginfo" | "notificationtimestamp" | "parsedcomment" | "patrol" | "sizes" | "tags" | "timestamp" | "title" | "user" | "userid"); /** Default: `"ids|title|flags"`. */
  show?: ("!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!unread" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "unread")[] | ("!anon" | "!autopatrolled" | "!bot" | "!minor" | "!patrolled" | "!unread" | "anon" | "autopatrolled" | "bot" | "minor" | "patrolled" | "unread");
  type?: ("categorize" | "edit" | "external" | "log" | "new")[] | ("categorize" | "edit" | "external" | "log" | "new"); /** Default: `"edit|new|log|categorize"`. */
  labels?: number[] | number;
  owner?: string;
  token?: string;
  continue?: string;
}
