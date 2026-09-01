import MediaWikiContent from "../MediaWikiContent";
import { MediaWikiHeader } from "../contents";

/** A located section: its heading plus the index range (in the flattened top-level array) it spans. */
export type SectionRange = {
  /** The section's heading node. */
  heading: MediaWikiHeader;
  /** Index of the heading itself. */
  startIndex: number;
  /** Exclusive end index — the next same-or-shallower heading, or the array's length. */
  endIndex: number;
};

/**
 * What to match against when locating an existing content item for `insertAfter`/`insertBefore`/
 * `replaceContent`/`removeContent`: either the exact instance (matched by reference) or a
 * predicate function (matched via `findIndex`).
 */
export type ContentTarget = MediaWikiContent | ((content: MediaWikiContent, index: number) => boolean);

/** Where `insertInSection` places new content within a located section. */
export type InsertPosition = "start" | "end";
