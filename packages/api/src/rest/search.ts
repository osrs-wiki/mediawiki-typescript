import type { MediaWikiClient } from "../client/MediaWikiClient";
import { restRequest } from "./restRequest";

/** One search result, as returned by both search endpoints. */
export type RestSearchResult = {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  matched_title: string | null;
  description: string | null;
  thumbnail: {
    mimetype: string;
    size: number | null;
    width: number | null;
    height: number | null;
    duration: number | null;
    url: string;
  } | null;
};

/** Options shared by {@link searchPages}/{@link searchTitles}. */
export type RestSearchOptions = {
  /** Search terms. */
  q: string;
  /** Maximum number of results, between 1 and 100. Default: 50. */
  limit?: number;
};

/** Searches page titles and contents (`GET /search/page`). */
export const searchPages = async (client: MediaWikiClient, options: RestSearchOptions): Promise<RestSearchResult[]> => {
  const response = await restRequest<{ pages: RestSearchResult[] }>(client, {
    method: "GET",
    url: "/search/page",
    params: options,
  });
  return response.pages;
};

/** Searches page titles for a typeahead/autocomplete prefix match (`GET /search/title`). */
export const searchTitles = async (
  client: MediaWikiClient,
  options: RestSearchOptions
): Promise<RestSearchResult[]> => {
  const response = await restRequest<{ pages: RestSearchResult[] }>(client, {
    method: "GET",
    url: "/search/title",
    params: options,
  });
  return response.pages;
};
