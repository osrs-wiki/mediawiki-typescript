import MediaWikiContent from "../MediaWikiContent";
import { buildContents, contentStartsWith, findFirstStringContent, flattenContents, isContentEmpty } from "../MediaWikiContent.utils";
import { MediaWikiContents } from "../MediaWikiContent.types";
import { MediaWikiHeader, MediaWikiTemplate } from "../contents";
import {
  getNextMeaningfulContent as getNextMeaningfulContentFn,
  NextMeaningfulContent,
  trimBreaks as trimBreaksFn,
  trimContentEdges,
} from "../contentTraversal";
import * as mutations from "./mutations";
import * as queries from "./queries";
import { ContentTarget, InsertPosition, SectionRange } from "./queries.types";

/**
 * A chainable, immutable wrapper around a `MediaWikiContents` value, delegating to the
 * standalone functions in `queries.ts`/`mutations.ts`/`contentTraversal.ts`. Callers don't need
 * to know or care whether a given operation is a "list" query/mutation or a tree "traversal" —
 * every operation is just a method on this one class. Every mutation-shaped method returns a
 * *new* `MediaWikiContentList` rather than modifying this one, so chained calls never share
 * mutated state: `new MediaWikiContentList(contents).insertInSection("Changes", tmpl).build()`.
 */
export class MediaWikiContentList {
  /** The flattened, valid `MediaWikiContent[]` this list wraps. */
  readonly items: MediaWikiContent[];

  /** @param contents The content to wrap (a raw string isn't a list of items; wrap it in a `MediaWikiText` first). */
  constructor(contents: MediaWikiContent | MediaWikiContent[]) {
    this.items = flattenContents(contents);
  }

  /** See `queries.ts`' `findHeadings`. */
  findHeadings(): MediaWikiHeader[] {
    return queries.findHeadings(this.items);
  }

  /** See `queries.ts`' `findSection`. */
  findSection(headingText: string, options?: { level?: number }): SectionRange | undefined {
    return queries.findSection(this.items, headingText, options);
  }

  /** See `queries.ts`' `getSectionContents`; returns the slice wrapped in a new `MediaWikiContentList`. */
  getSectionContents(headingText: string, options?: { level?: number }): MediaWikiContentList | undefined {
    const section = queries.getSectionContents(this.items, headingText, options);
    return section && new MediaWikiContentList(section);
  }

  /** See `queries.ts`' `findAll`. */
  findAll(predicate: (content: MediaWikiContent, index: number) => boolean): MediaWikiContent[] {
    return queries.findAll(this.items, predicate);
  }

  /** See `queries.ts`' `findTemplate`. */
  findTemplate(name: string): MediaWikiTemplate | undefined {
    return queries.findTemplate(this.items, name);
  }

  /** See `queries.ts`' `mapContent`. */
  mapContent<T>(fn: (content: MediaWikiContent, index: number) => T): T[] {
    return queries.mapContent(this.items, fn);
  }

  /** See `queries.ts`' `forEachContent`. */
  forEachContent(fn: (content: MediaWikiContent, index: number) => void): void {
    queries.forEachContent(this.items, fn);
  }

  /** See `queries.ts`' `countContent`. */
  countContent(predicate: (content: MediaWikiContent, index: number) => boolean): number {
    return queries.countContent(this.items, predicate);
  }

  /** See `mutations.ts`' `insertAtIndex`. Returns a new `MediaWikiContentList`. */
  insertAtIndex(index: number, newContent: MediaWikiContents): MediaWikiContentList {
    return new MediaWikiContentList(mutations.insertAtIndex(this.items, index, newContent));
  }

  /** See `mutations.ts`' `insertAfter`. Returns a new `MediaWikiContentList`. */
  insertAfter(target: ContentTarget, newContent: MediaWikiContents): MediaWikiContentList {
    return new MediaWikiContentList(mutations.insertAfter(this.items, target, newContent));
  }

  /** See `mutations.ts`' `insertBefore`. Returns a new `MediaWikiContentList`. */
  insertBefore(target: ContentTarget, newContent: MediaWikiContents): MediaWikiContentList {
    return new MediaWikiContentList(mutations.insertBefore(this.items, target, newContent));
  }

  /** See `mutations.ts`' `insertInSection`. Returns a new `MediaWikiContentList`. */
  insertInSection(
    headingText: string,
    newContent: MediaWikiContents,
    options?: { position?: InsertPosition; level?: number }
  ): MediaWikiContentList {
    return new MediaWikiContentList(mutations.insertInSection(this.items, headingText, newContent, options));
  }

  /** See `mutations.ts`' `replaceContent`. Returns a new `MediaWikiContentList`. */
  replaceContent(target: ContentTarget, newContent: MediaWikiContents): MediaWikiContentList {
    return new MediaWikiContentList(mutations.replaceContent(this.items, target, newContent));
  }

  /** See `mutations.ts`' `removeContent`. Returns a new `MediaWikiContentList`. */
  removeContent(target: ContentTarget): MediaWikiContentList {
    return new MediaWikiContentList(mutations.removeContent(this.items, target));
  }

  /** See `mutations.ts`' `removeAtIndex`. Returns a new `MediaWikiContentList`. */
  removeAtIndex(index: number, count?: number): MediaWikiContentList {
    return new MediaWikiContentList(mutations.removeAtIndex(this.items, index, count));
  }

  /** See `mutations.ts`' `removeSection`. Returns a new `MediaWikiContentList`. */
  removeSection(headingText: string, options?: { level?: number }): MediaWikiContentList {
    return new MediaWikiContentList(mutations.removeSection(this.items, headingText, options));
  }

  /** See `MediaWikiContent.utils.ts`' `isContentEmpty`. */
  isEmpty(): boolean {
    return isContentEmpty(this.items);
  }

  /** See `MediaWikiContent.utils.ts`' `contentStartsWith`. */
  startsWith(str: string): boolean {
    return contentStartsWith(this.items, str);
  }

  /** See `MediaWikiContent.utils.ts`' `findFirstStringContent`, applied across every item in this list. */
  findFirstStringContent(): MediaWikiContent | undefined {
    for (const item of this.items) {
      const found = findFirstStringContent(item);
      if (found) {
        return found;
      }
    }
    return undefined;
  }

  /** See `contentTraversal.ts`' `trimBreaks`. Returns a new `MediaWikiContentList`. */
  trimBreaks(): MediaWikiContentList {
    return new MediaWikiContentList(trimBreaksFn(this.items));
  }

  /** See `contentTraversal.ts`' `trimContentEdges`. Returns a new `MediaWikiContentList`. */
  trimEdges(): MediaWikiContentList {
    return new MediaWikiContentList(trimContentEdges(this.items));
  }

  /** See `contentTraversal.ts`' `getNextMeaningfulContent`. */
  getNextMeaningfulContent(startIndex: number): NextMeaningfulContent {
    return getNextMeaningfulContentFn(this.items, startIndex);
  }

  /** Returns the underlying `MediaWikiContent[]`. */
  toArray(): MediaWikiContent[] {
    return this.items;
  }

  /** Builds every item in this list into a single wikitext string. */
  build(): string {
    return buildContents(this.items);
  }
}
