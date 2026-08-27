import type { MediaWikiClient } from "../client/MediaWikiClient";
import type { ContentReturnFormat } from "../content/content.types";
import * as history from "./history";
import * as media from "./media";
import * as pages from "./pages";
import * as search from "./search";
import * as transform from "./transform";

/** The `restApi.page.*` sub-facade returned by {@link RestApiClient.page}. */
export type RestApiPageFacade = {
  getSource<Format extends ContentReturnFormat = "string">(
    title: string,
    responseFormat?: Format
  ): ReturnType<typeof pages.getPageSource<Format>>;
  getBare: (title: string) => ReturnType<typeof pages.getPageBare>;
  getHtml(...args: Parameters<typeof pages.getPageHtml> extends [unknown, ...infer Rest] ? Rest : never): ReturnType<typeof pages.getPageHtml>;
  getWithHtml(
    ...args: Parameters<typeof pages.getPageWithHtml> extends [unknown, ...infer Rest] ? Rest : never
  ): ReturnType<typeof pages.getPageWithHtml>;
  getLanguages: (title: string) => ReturnType<typeof pages.getPageLanguages>;
  getFiles: (title: string) => ReturnType<typeof pages.getPageFiles>;
  create: (options: pages.CreatePageOptions) => ReturnType<typeof pages.createPage>;
  update: (title: string, options: pages.UpdatePageOptions) => ReturnType<typeof pages.updatePage>;
};

/** The `restApi.revision.*` sub-facade returned by {@link RestApiClient.revision}. */
export type RestApiRevisionFacade = {
  get: (id: number) => ReturnType<typeof history.getRevision>;
  getSource<Format extends ContentReturnFormat = "string">(
    id: number,
    responseFormat?: Format
  ): ReturnType<typeof history.getRevisionSource<Format>>;
  getHtml: (id: number) => ReturnType<typeof history.getRevisionHtml>;
  getWithHtml: (id: number) => ReturnType<typeof history.getRevisionWithHtml>;
  compare: (from: number, to: number) => ReturnType<typeof history.compareRevisions>;
};

/**
 * Facade over `/rest.php/v1`, bound to one {@link MediaWikiClient}, grouping endpoints the same
 * way the REST API reference does: `page`, `revision`, `search`, `file`, `transform`, plus
 * page-history helpers. See `docs/plans/api/plan.md` Phase 3 for the endpoint list this covers.
 */
export class RestApiClient {
  /** Page content/metadata endpoints; see {@link RestApiPageFacade}. */
  readonly page: RestApiPageFacade;
  /** Individual-revision endpoints; see {@link RestApiRevisionFacade}. */
  readonly revision: RestApiRevisionFacade;

  /** @param client The wiki connection this facade's methods operate against. */
  constructor(private readonly client: MediaWikiClient) {
    this.page = {
      getSource: (title, responseFormat) => pages.getPageSource(this.client, title, responseFormat),
      getBare: (title) => pages.getPageBare(this.client, title),
      getHtml: (title, options) => pages.getPageHtml(this.client, title, options),
      getWithHtml: (title, options) => pages.getPageWithHtml(this.client, title, options),
      getLanguages: (title) => pages.getPageLanguages(this.client, title),
      getFiles: (title) => pages.getPageFiles(this.client, title),
      create: (options) => pages.createPage(this.client, options),
      update: (title, options) => pages.updatePage(this.client, title, options),
    };
    this.revision = {
      get: (id) => history.getRevision(this.client, id),
      getSource: (id, responseFormat) => history.getRevisionSource(this.client, id, responseFormat),
      getHtml: (id) => history.getRevisionHtml(this.client, id),
      getWithHtml: (id) => history.getRevisionWithHtml(this.client, id),
      compare: (from, to) => history.compareRevisions(this.client, from, to),
    };
  }

  /** See `rest/history.ts`. */
  getPageHistory(
    title: string,
    options?: Parameters<typeof history.getPageHistory>[2]
  ): ReturnType<typeof history.getPageHistory> {
    return history.getPageHistory(this.client, title, options);
  }

  /** See `rest/history.ts`. */
  getPageHistoryCounts(
    title: string,
    type: Parameters<typeof history.getPageHistoryCounts>[2],
    options?: Parameters<typeof history.getPageHistoryCounts>[3]
  ): ReturnType<typeof history.getPageHistoryCounts> {
    return history.getPageHistoryCounts(this.client, title, type, options);
  }

  /** See `rest/search.ts`. */
  searchPages(options: search.RestSearchOptions): ReturnType<typeof search.searchPages> {
    return search.searchPages(this.client, options);
  }

  /** See `rest/search.ts`. */
  searchTitles(options: search.RestSearchOptions): ReturnType<typeof search.searchTitles> {
    return search.searchTitles(this.client, options);
  }

  /** See `rest/media.ts`. */
  getFile(title: string): ReturnType<typeof media.getFile> {
    return media.getFile(this.client, title);
  }

  /** See `rest/transform.ts`. */
  wikitextToHtml(title: string, wikitext: string): ReturnType<typeof transform.wikitextToHtml> {
    return transform.wikitextToHtml(this.client, title, wikitext);
  }

  /** See `rest/transform.ts`. */
  htmlToWikitext<Format extends ContentReturnFormat = "string">(
    title: string,
    html: string,
    responseFormat?: Format
  ): ReturnType<typeof transform.htmlToWikitext<Format>> {
    return transform.htmlToWikitext(this.client, title, html, responseFormat);
  }

  /** See `rest/transform.ts`. */
  wikitextToLint(title: string, wikitext: string): ReturnType<typeof transform.wikitextToLint> {
    return transform.wikitextToLint(this.client, title, wikitext);
  }
}
