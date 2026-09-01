import type { MediaWikiContents } from "@mediawiki-typescript/builder";
import type { MediaWikiClient } from "../client/MediaWikiClient";
import type { ContentReturnFormat, ResolvedContent } from "../content/content.types";
import { resolveContentInput } from "../content/resolveContentInput";
import { resolveContentOutput } from "../content/resolveContentOutput";
import { encodeTitle, restRequest } from "./restRequest";

/** Base fields present on every REST API page object. */
export type RestPage = {
  id: number;
  key: string;
  title: string;
  latest: { id: number; timestamp: string };
  content_model: string;
  license: { url: string; title: string };
};

/** A {@link RestPage} as returned by the "get page" (source) endpoint. */
export type RestPageSource = RestPage & { source: string };

/** A {@link RestPage} as returned by the "get page" (bare) endpoint. */
export type RestPageBare = RestPage & { html_url: string };

/** A {@link RestPage} as returned by the "get page with HTML" endpoint. */
export type RestPageWithHtml = RestPage & { html: string };

/** One entry from the "get languages" endpoint. */
export type RestPageLanguage = { code: string; name: string; key: string; title: string };

/** One entry from the "get files on page" endpoint. */
export type RestPageFile = {
  title: string;
  file_description_url: string;
  latest: { timestamp: string; user: { id: number; name: string } };
  preferred: { mediatype: string; size: number | null; width: number | null; height: number | null; url: string };
};

/**
 * Fetches a page's source (`GET /page/{title}`), shaping `source` per `responseFormat` through
 * the shared content bridge.
 * @param client The client to fetch through.
 * @param title The page title.
 * @param responseFormat How to shape `source`; see `../content/content.types.ts`. Defaults to `"string"`.
 */
export const getPageSource = async <Format extends ContentReturnFormat = "string">(
  client: MediaWikiClient,
  title: string,
  responseFormat?: Format
): Promise<Omit<RestPageSource, "source"> & { source: ResolvedContent<Format> }> => {
  const page = await restRequest<RestPageSource>(client, { method: "GET", url: `/page/${encodeTitle(title)}` });
  const source = await resolveContentOutput(page.source, page, (responseFormat ?? "string") as Format);
  return { ...page, source: source as ResolvedContent<Format> };
};

/** Fetches a page's metadata (`GET /page/{title}/bare`), without its content. */
export const getPageBare = (client: MediaWikiClient, title: string): Promise<RestPageBare> =>
  restRequest<RestPageBare>(client, { method: "GET", url: `/page/${encodeTitle(title)}/bare` });

/** Fetches a page's rendered HTML only (`GET /page/{title}/html`), as a raw HTML string. */
export const getPageHtml = (
  client: MediaWikiClient,
  title: string,
  options: { redirect?: boolean; flavor?: "view" | "edit" } = {}
): Promise<string> =>
  restRequest<string>(client, {
    method: "GET",
    url: `/page/${encodeTitle(title)}/html`,
    params: { redirect: options.redirect === false ? "no" : undefined, flavor: options.flavor },
  });

/** Fetches a page's metadata plus rendered HTML (`GET /page/{title}/with_html`). */
export const getPageWithHtml = (
  client: MediaWikiClient,
  title: string,
  options: { redirect?: boolean } = {}
): Promise<RestPageWithHtml> =>
  restRequest<RestPageWithHtml>(client, {
    method: "GET",
    url: `/page/${encodeTitle(title)}/with_html`,
    params: { redirect: options.redirect === false ? "no" : undefined },
  });

/** Fetches the pages connected to `title` in other languages (`GET /page/{title}/links/language`). */
export const getPageLanguages = (client: MediaWikiClient, title: string): Promise<RestPageLanguage[]> =>
  restRequest<RestPageLanguage[]>(client, { method: "GET", url: `/page/${encodeTitle(title)}/links/language` });

/** Fetches the media files used on a page, up to 100 (`GET /page/{title}/links/media`). */
export const getPageFiles = async (client: MediaWikiClient, title: string): Promise<RestPageFile[]> => {
  const response = await restRequest<{ files: RestPageFile[] }>(client, {
    method: "GET",
    url: `/page/${encodeTitle(title)}/links/media`,
  });
  return response.files;
};

/** Options for {@link createPage}: content plus an edit comment/content model. */
export type CreatePageOptions = {
  title: string;
  source: MediaWikiContents;
  comment: string;
  contentModel?: string;
};

/**
 * Creates a wiki page (`POST /page`), attaching a CSRF token when {@link MediaWikiClient.needsCsrfToken}
 * indicates cookie-based auth is in use, and normalizing `source` via the content bridge.
 * @param client The client to create the page through.
 * @param options See {@link CreatePageOptions}.
 */
export const createPage = async (client: MediaWikiClient, options: CreatePageOptions): Promise<RestPageSource> => {
  const token = client.needsCsrfToken() ? await client.getToken("csrf") : undefined;
  return restRequest<RestPageSource>(client, {
    method: "POST",
    url: "/page",
    data: {
      title: options.title,
      source: resolveContentInput(options.source),
      comment: options.comment,
      content_model: options.contentModel,
      token,
    },
  });
};

/** Options for {@link updatePage}: content plus an edit comment and the base revision to edit from. */
export type UpdatePageOptions = {
  source: MediaWikiContents;
  comment: string;
  /** The base revision ID this edit is built on; omit to create the page instead. */
  latestId?: number;
  contentModel?: string;
};

/**
 * Updates (or creates, if `latestId` is omitted) a wiki page (`PUT /page/{title}`), attaching a
 * CSRF token when cookie-based auth is in use, and normalizing `source` via the content bridge.
 * @param client The client to update the page through.
 * @param title The page title to update.
 * @param options See {@link UpdatePageOptions}.
 */
export const updatePage = async (
  client: MediaWikiClient,
  title: string,
  options: UpdatePageOptions
): Promise<RestPageSource> => {
  const token = client.needsCsrfToken() ? await client.getToken("csrf") : undefined;
  return restRequest<RestPageSource>(client, {
    method: "PUT",
    url: `/page/${encodeTitle(title)}`,
    data: {
      source: resolveContentInput(options.source),
      comment: options.comment,
      latest: options.latestId !== undefined ? { id: options.latestId } : undefined,
      content_model: options.contentModel,
      token,
    },
  });
};
