import type MediaWikiContent from "./MediaWikiContent";
import { isContentEmpty } from "./MediaWikiContent.utils";
import { MediaWikiBreak } from "./contents/MediaWikiBreak/MediaWikiBreak";
import { MediaWikiText } from "./contents/MediaWikiText/MediaWikiText";

/**
 * Helpers that need to reference concrete content classes (`MediaWikiBreak`, `MediaWikiText`)
 * rather than the generic `MediaWikiContent` base. Kept out of `MediaWikiContent.utils.ts`,
 * which `MediaWikiContent.ts` itself imports — importing concrete subclasses from there would
 * create a circular import (`MediaWikiBreak`/`MediaWikiText` both import `MediaWikiContent.ts`).
 */

/**
 * Removes leading/trailing `MediaWikiBreak` items from `contents`, without modifying the
 * original array.
 * @param contents The content to trim.
 */
export const trimBreaks = (contents: MediaWikiContent[]): MediaWikiContent[] => {
  let start = 0;
  let end = contents.length;
  while (start < end && contents[start] instanceof MediaWikiBreak) {
    start += 1;
  }
  while (end > start && contents[end - 1] instanceof MediaWikiBreak) {
    end -= 1;
  }
  return contents.slice(start, end);
};

/**
 * Recursively trims leading/trailing whitespace-only text at the given edge of a `MediaWikiText`
 * tree, without disturbing interior spacing (e.g. text surrounding an inline link), returning a
 * *new* `MediaWikiText` rather than modifying `content`. Non-`MediaWikiText` content is returned
 * unchanged, since only text content has whitespace to trim.
 * @param content The content to trim.
 * @param edge Which edge to trim.
 */
export const trimContentEdge = (content: MediaWikiContent, edge: "start" | "end"): MediaWikiContent => {
  if (!(content instanceof MediaWikiText)) {
    return content;
  }
  if (typeof content.children === "string") {
    const trimmed = edge === "start" ? content.children.replace(/^\s+/, "") : content.children.replace(/\s+$/, "");
    return new MediaWikiText(trimmed, content.styling);
  }
  if (Array.isArray(content.children) && content.children.length > 0) {
    const index = edge === "start" ? 0 : content.children.length - 1;
    const children = [...content.children];
    children[index] = trimContentEdge(children[index], edge);
    return new MediaWikiText(children, content.styling);
  }
  return content;
};

/**
 * Trims leading whitespace from the first item and trailing whitespace from the last item of
 * `contents` (a single-item array is trimmed on both edges), returning a *new* array — see
 * {@link trimContentEdge} for how each edge is trimmed.
 * @param contents The content array to trim.
 */
export const trimContentEdges = (contents: MediaWikiContent[]): MediaWikiContent[] => {
  if (!contents || contents.length === 0) {
    return contents;
  }
  const result = [...contents];
  result[0] = trimContentEdge(result[0], "start");
  result[result.length - 1] = trimContentEdge(result[result.length - 1], "end");
  return result;
};

/** The result of {@link getNextMeaningfulContent}. */
export type NextMeaningfulContent = { content: MediaWikiContent | undefined; index: number };

/**
 * Finds the next meaningful content at or after `startIndex`, skipping over `MediaWikiBreak`
 * items and empty/whitespace-only `MediaWikiText` items. Other content (e.g. templates, `__TOC__`)
 * is never skipped, even if it has no `children` set, since it's still meaningful.
 * @param contents The content array to search through.
 * @param startIndex The index to start searching from.
 */
export const getNextMeaningfulContent = (contents: MediaWikiContent[], startIndex: number): NextMeaningfulContent => {
  for (let index = startIndex; index < contents.length; index += 1) {
    const item = contents[index];
    if (item instanceof MediaWikiBreak) {
      continue;
    }
    if (item instanceof MediaWikiText && isContentEmpty(item.children)) {
      continue;
    }
    return { content: item, index };
  }
  return { content: undefined, index: -1 };
};
