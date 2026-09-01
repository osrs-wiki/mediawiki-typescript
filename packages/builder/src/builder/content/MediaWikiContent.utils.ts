import type MediaWikiContent from "./MediaWikiContent";
import { MediaWikiContents } from "./MediaWikiContent.types";

/**
 * Normalizes the `string | MediaWikiContent | MediaWikiContent[]` union down to a single
 * `MediaWikiContent[]`, filtering out nullish/non-content entries. Plain strings normalize to
 * an empty array, since a raw string has no `MediaWikiContent` items to enumerate.
 * @param contents Either a string, a single MediaWikiContent, or an array of MediaWikiContent
 * @returns A flat array of valid MediaWikiContent instances.
 */
export const flattenContents = (contents: MediaWikiContents): MediaWikiContent[] => {
  if (typeof contents === "string") {
    return [];
  }
  const items = Array.isArray(contents) ? contents : [contents];
  return items.filter(
    (content) => content != null && typeof content.build === "function"
  );
};

/**
 * Build one or more MediaWikiContent
 * @param contents Either a single MediaWikiContent or an array of MediaWikiContent
 * @returns A resulting string value of building all content.
 */
export const buildContents = (contents: string | MediaWikiContents): string => {
  if (typeof contents === "string") {
    return contents;
  }
  return flattenContents(contents).reduce(
    (value, content) => (value += content.build()),
    ""
  );
};

/**
 * Recursively checks whether `contents` has no meaningful text: an empty/whitespace-only
 * string, an empty array, an array whose every item is itself empty, or a `MediaWikiContent`
 * whose `children` are themselves empty.
 * @param contents The content to check; `null`/`undefined` are treated as empty.
 */
export const isContentEmpty = (contents?: MediaWikiContents): boolean => {
  if (contents == null) {
    return true;
  }
  if (typeof contents === "string") {
    return contents.trim().length === 0;
  }
  if (Array.isArray(contents)) {
    return contents.length === 0 || contents.every((content) => isContentEmpty(content));
  }
  // Content types with no `children` concept (e.g. `MediaWikiLink`) still build non-empty wikitext.
  if (contents.children === undefined) {
    return contents.build().trim().length === 0;
  }
  return isContentEmpty(contents.children);
};

/**
 * Recursively checks whether the first meaningful child of `contents` starts with `str`,
 * diving into nested `children` (e.g. into a `MediaWikiText` wrapping a link) until a string
 * value is reached.
 * @param contents The content to check.
 * @param str The string to check for at the start.
 */
export const contentStartsWith = (contents: MediaWikiContents | undefined, str: string): boolean => {
  if (isContentEmpty(contents) || contents == null) {
    return false;
  }
  if (typeof contents === "string") {
    return contents.startsWith(str);
  }
  if (Array.isArray(contents)) {
    const first = contents.find((content) => !isContentEmpty(content));
    return first !== undefined && contentStartsWith(first, str);
  }
  if (contents.children === undefined) {
    return contents.build().startsWith(str);
  }
  return contentStartsWith(contents.children, str);
};

/**
 * Recursively finds the first descendant (including `content` itself) whose `children` is a
 * plain string, diving into single-child and array-child content along the way.
 * @param content The content to search from.
 * @returns The first content with string `children`, or `undefined` if none is found.
 */
export const findFirstStringContent = (content: MediaWikiContent): MediaWikiContent | undefined => {
  if (typeof content.children === "string") {
    return content;
  }
  if (content.children && !Array.isArray(content.children)) {
    return findFirstStringContent(content.children);
  }
  if (Array.isArray(content.children) && content.children.length > 0) {
    return findFirstStringContent(content.children[0]);
  }
  return undefined;
};
