import MediaWikiContent from "../MediaWikiContent";
import { flattenContents } from "../MediaWikiContent.utils";
import { MediaWikiContents } from "../MediaWikiContent.types";
import { MediaWikiHeader, MediaWikiTemplate } from "../contents";
import { SectionRange } from "./queries.types";

/**
 * Renders a heading's inner text, stripping the `=` wrapper `build()` adds, so heading text can
 * be matched regardless of level (e.g. `"== Changes =="` and `"=== Changes ==="` both yield
 * `"Changes"`).
 * @param heading The heading to render.
 * @returns The heading's rendered inner text, with the `=` wrapper stripped.
 * @internal
 */
const getHeadingText = (heading: MediaWikiHeader): string => heading.build().replace(/^=+|=+$/g, "").trim();

/**
 * Lists every top-level heading in `contents`, in document order.
 * @param contents The content to search.
 */
export const findHeadings = (contents: MediaWikiContents): MediaWikiHeader[] =>
  flattenContents(contents).filter((content): content is MediaWikiHeader => content instanceof MediaWikiHeader);

/**
 * Locates a section by its heading text: the heading itself, plus the index range (in the
 * top-level array) it spans, ending at the next heading whose level is the same or shallower
 * (a `===` subheading stays inside a `==` section).
 *
 * Matches the *first* heading with this text — if a page has more than one section with the
 * same heading text, disambiguate with `options.level`, or this always returns the first one.
 * @param contents The content to search.
 * @param headingText The heading's rendered inner text (e.g. `"Changes"`, not `"== Changes =="`).
 * @param options.level Only match a heading at this exact level (e.g. `2` for `==`).
 */
export const findSection = (
  contents: MediaWikiContents,
  headingText: string,
  options: { level?: number } = {}
): SectionRange | undefined => {
  const items = flattenContents(contents);
  const startIndex = items.findIndex(
    (content) =>
      content instanceof MediaWikiHeader &&
      getHeadingText(content) === headingText &&
      (options.level === undefined || content.level === options.level)
  );
  if (startIndex === -1) {
    return undefined;
  }
  const heading = items[startIndex] as MediaWikiHeader;
  const endIndex = items.findIndex(
    (content, index) => index > startIndex && content instanceof MediaWikiHeader && content.level <= heading.level
  );
  return { heading, startIndex, endIndex: endIndex === -1 ? items.length : endIndex };
};

/**
 * Returns the content belonging to a section (its heading plus everything up to the next
 * same-or-shallower heading), without modifying `contents`. See {@link findSection} for how
 * section boundaries and duplicate heading text are handled.
 * @param contents The content to search.
 * @param headingText The heading's rendered inner text.
 * @param options.level Only match a heading at this exact level.
 */
export const getSectionContents = (
  contents: MediaWikiContents,
  headingText: string,
  options: { level?: number } = {}
): MediaWikiContent[] | undefined => {
  const section = findSection(contents, headingText, options);
  if (!section) {
    return undefined;
  }
  return flattenContents(contents).slice(section.startIndex, section.endIndex);
};

/**
 * Filters `contents` down to the top-level items matching `predicate`.
 * @param contents The content to search.
 * @param predicate Called with each item and its index; return `true` to keep it.
 */
export const findAll = (
  contents: MediaWikiContents,
  predicate: (content: MediaWikiContent, index: number) => boolean
): MediaWikiContent[] => flattenContents(contents).filter(predicate);

/**
 * Finds the first top-level `MediaWikiTemplate` with the given name.
 * @param contents The content to search.
 * @param name The template's name, as passed to `new MediaWikiTemplate(name)`.
 */
export const findTemplate = (contents: MediaWikiContents, name: string): MediaWikiTemplate | undefined =>
  findAll(contents, (content): content is MediaWikiTemplate => content instanceof MediaWikiTemplate && content.name === name)[0] as
    | MediaWikiTemplate
    | undefined;

/**
 * Maps every top-level content item to a new value, in document order.
 * @param contents The content to traverse.
 * @param fn Called with each item and its index.
 */
export const mapContent = <T>(
  contents: MediaWikiContents,
  fn: (content: MediaWikiContent, index: number) => T
): T[] => flattenContents(contents).map(fn);

/**
 * Runs a callback for every top-level content item, in document order.
 * @param contents The content to traverse.
 * @param fn Called with each item and its index.
 */
export const forEachContent = (
  contents: MediaWikiContents,
  fn: (content: MediaWikiContent, index: number) => void
): void => flattenContents(contents).forEach(fn);

/**
 * Counts the top-level content items matching `predicate`.
 * @param contents The content to search.
 * @param predicate Called with each item and its index; return `true` to count it.
 */
export const countContent = (
  contents: MediaWikiContents,
  predicate: (content: MediaWikiContent, index: number) => boolean
): number => findAll(contents, predicate).length;
