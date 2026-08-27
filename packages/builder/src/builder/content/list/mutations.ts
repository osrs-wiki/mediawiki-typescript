import MediaWikiContent from "../MediaWikiContent";
import { flattenContents } from "../MediaWikiContent.utils";
import { MediaWikiContents } from "../MediaWikiContent.types";
import { findSection } from "./queries";
import { ContentTarget, InsertPosition } from "./queries.types";

/**
 * Resolves a {@link ContentTarget} (an exact instance or a predicate) to its index within
 * `items`, throwing a descriptive error if it isn't found — shared by every mutation below that
 * takes a `target`, so "target not found" behaves consistently across all of them.
 * @param items The flattened content array to search.
 * @param target An exact `MediaWikiContent` instance, or a predicate `(content, index) => boolean`.
 * @internal
 */
const resolveTargetIndex = (items: MediaWikiContent[], target: ContentTarget): number => {
  const index = typeof target === "function" ? items.findIndex(target) : items.indexOf(target);
  if (index === -1) {
    throw new Error("Could not find the given target content in the provided contents.");
  }
  return index;
};

/**
 * Splices `newContent` into `contents` at `index`, without modifying the original array.
 * @param contents The content to insert into.
 * @param index Where to insert, per `Array.prototype.splice` semantics (0 = start, `length` = end).
 * @param newContent The content to insert; normalized via `flattenContents`.
 */
export const insertAtIndex = (
  contents: MediaWikiContents,
  index: number,
  newContent: MediaWikiContents
): MediaWikiContent[] => {
  const items = flattenContents(contents);
  return [...items.slice(0, index), ...flattenContents(newContent), ...items.slice(index)];
};

/**
 * Inserts `newContent` immediately after `target` (an exact instance or a predicate).
 * @param contents The content to insert into.
 * @param target The existing content to insert after; see {@link ContentTarget}.
 * @param newContent The content to insert; normalized via `flattenContents`.
 * @throws {Error} If `target` isn't found in `contents`.
 */
export const insertAfter = (
  contents: MediaWikiContents,
  target: ContentTarget,
  newContent: MediaWikiContents
): MediaWikiContent[] => {
  const items = flattenContents(contents);
  return insertAtIndex(items, resolveTargetIndex(items, target) + 1, newContent);
};

/**
 * Inserts `newContent` immediately before `target` (an exact instance or a predicate).
 * @param contents The content to insert into.
 * @param target The existing content to insert before; see {@link ContentTarget}.
 * @param newContent The content to insert; normalized via `flattenContents`.
 * @throws {Error} If `target` isn't found in `contents`.
 */
export const insertBefore = (
  contents: MediaWikiContents,
  target: ContentTarget,
  newContent: MediaWikiContents
): MediaWikiContent[] => {
  const items = flattenContents(contents);
  return insertAtIndex(items, resolveTargetIndex(items, target), newContent);
};

/**
 * Inserts `newContent` into the named section (see `findSection` for how boundaries/duplicate
 * heading text are handled), at either the `"start"` (right after the heading) or `"end"`
 * (right before the next same-or-shallower heading, the default) of the section.
 * @param contents The content to insert into.
 * @param headingText The section's heading text (rendered inner text, not the `==` wrapper).
 * @param newContent The content to insert; normalized via `flattenContents`.
 * @param options.position Where within the section to insert; defaults to `"end"`.
 * @param options.level Only match a heading at this exact level.
 * @throws {Error} If no section is found for `headingText`.
 */
export const insertInSection = (
  contents: MediaWikiContents,
  headingText: string,
  newContent: MediaWikiContents,
  options: { position?: InsertPosition; level?: number } = {}
): MediaWikiContent[] => {
  const section = findSection(contents, headingText, { level: options.level });
  if (!section) {
    throw new Error(`No section found for heading "${headingText}".`);
  }
  const position = options.position ?? "end";
  const index = position === "start" ? section.startIndex + 1 : section.endIndex;
  return insertAtIndex(contents, index, newContent);
};

/**
 * Replaces `target` (an exact instance or a predicate) with `newContent`.
 * @param contents The content to replace within.
 * @param target The existing content to replace; see {@link ContentTarget}.
 * @param newContent The content to replace it with; normalized via `flattenContents`.
 * @throws {Error} If `target` isn't found in `contents`.
 */
export const replaceContent = (
  contents: MediaWikiContents,
  target: ContentTarget,
  newContent: MediaWikiContents
): MediaWikiContent[] => {
  const items = flattenContents(contents);
  const index = resolveTargetIndex(items, target);
  return [...items.slice(0, index), ...flattenContents(newContent), ...items.slice(index + 1)];
};

/**
 * Removes `target` (an exact instance or a predicate) from `contents`.
 * @param contents The content to remove from.
 * @param target The content to remove; see {@link ContentTarget}.
 * @throws {Error} If `target` isn't found in `contents`.
 */
export const removeContent = (contents: MediaWikiContents, target: ContentTarget): MediaWikiContent[] => {
  const items = flattenContents(contents);
  const index = resolveTargetIndex(items, target);
  return [...items.slice(0, index), ...items.slice(index + 1)];
};

/**
 * Removes `count` items (default 1) starting at `index`.
 * @param contents The content to remove from.
 * @param index The index to start removing at.
 * @param count How many items to remove; defaults to 1.
 */
export const removeAtIndex = (contents: MediaWikiContents, index: number, count = 1): MediaWikiContent[] => {
  const items = flattenContents(contents);
  return [...items.slice(0, index), ...items.slice(index + count)];
};

/**
 * Removes an entire section (its heading plus its full body) by heading text. See `findSection`
 * for how section boundaries/duplicate heading text are handled.
 * @param contents The content to remove from.
 * @param headingText The section's heading text (rendered inner text, not the `==` wrapper).
 * @param options.level Only match a heading at this exact level.
 * @throws {Error} If no section is found for `headingText`.
 */
export const removeSection = (
  contents: MediaWikiContents,
  headingText: string,
  options: { level?: number } = {}
): MediaWikiContent[] => {
  const section = findSection(contents, headingText, options);
  if (!section) {
    throw new Error(`No section found for heading "${headingText}".`);
  }
  return removeAtIndex(contents, section.startIndex, section.endIndex - section.startIndex);
};
