import type { MediaWikiClient } from "../client/MediaWikiClient";
import type { ContentReturnFormat, ResolvedContent } from "../content/content.types";
import { resolveContentOutput } from "../content/resolveContentOutput";
import { encodeTitle, restRequest } from "./restRequest";

/** A single revision, as returned by the history/revision endpoints (fields vary by endpoint). */
export type RestRevision = {
  id: number;
  page?: { id: number; title: string };
  size: number;
  minor: boolean;
  timestamp: string;
  user: { id: number | null; name: string };
  comment: string | null;
  delta: number | null;
  html_url?: string;
  html?: string;
  source?: string;
};

/** Response of `GET /page/{title}/history`. */
export type RestPageHistory = {
  latest: string;
  older?: string;
  newer?: string;
  revisions: RestRevision[];
};

/** Filter accepted by {@link getPageHistory}. */
export type RestPageHistoryFilter = "reverted" | "anonymous" | "bot" | "minor";

/**
 * Fetches the latest revisions to a page, 20 at a time (`GET /page/{title}/history`).
 * @param client The client to fetch through.
 * @param title The page title.
 * @param options `older_than`/`newer_than` (revision IDs) and/or a single `filter`.
 */
export const getPageHistory = (
  client: MediaWikiClient,
  title: string,
  options: { olderThan?: number; newerThan?: number; filter?: RestPageHistoryFilter } = {}
): Promise<RestPageHistory> =>
  restRequest<RestPageHistory>(client, {
    method: "GET",
    url: `/page/${encodeTitle(title)}/history`,
    params: { older_than: options.olderThan, newer_than: options.newerThan, filter: options.filter },
  });

/** The `type` accepted by {@link getPageHistoryCounts}. */
export type RestHistoryCountType = "anonymous" | "bot" | "editors" | "edits" | "minor" | "reverted";

/** Response of `GET /page/{title}/history/counts/{type}`. */
export type RestHistoryCount = { count: number; limit: boolean };

/**
 * Fetches a count of some aspect of a page's history (`GET /page/{title}/history/counts/{type}`).
 * @param client The client to fetch through.
 * @param title The page title.
 * @param type Which count to fetch; see {@link RestHistoryCountType}.
 * @param options `from`/`to` revision IDs, for `edits`/`editors` only.
 */
export const getPageHistoryCounts = (
  client: MediaWikiClient,
  title: string,
  type: RestHistoryCountType,
  options: { from?: number; to?: number } = {}
): Promise<RestHistoryCount> =>
  restRequest<RestHistoryCount>(client, {
    method: "GET",
    url: `/page/${encodeTitle(title)}/history/counts/${type}`,
    params: options,
  });

/** Fetches an individual revision's metadata, without content (`GET /revision/{id}/bare`). */
export const getRevision = (client: MediaWikiClient, id: number): Promise<RestRevision> =>
  restRequest<RestRevision>(client, { method: "GET", url: `/revision/${id}/bare` });

/**
 * Fetches an individual revision's source content (`GET /revision/{id}`), shaping `source` per
 * `responseFormat` through the shared content bridge.
 * @param client The client to fetch through.
 * @param id The revision ID.
 * @param responseFormat How to shape `source`; see `../content/content.types.ts`. Defaults to `"string"`.
 */
export const getRevisionSource = async <Format extends ContentReturnFormat = "string">(
  client: MediaWikiClient,
  id: number,
  responseFormat?: Format
): Promise<Omit<RestRevision, "source"> & { source: ResolvedContent<Format> }> => {
  const revision = await restRequest<RestRevision>(client, { method: "GET", url: `/revision/${id}` });
  const source = await resolveContentOutput(revision.source ?? "", revision, (responseFormat ?? "string") as Format);
  return { ...revision, source: source as ResolvedContent<Format> };
};

/** Fetches an individual revision's rendered HTML only (`GET /revision/{id}/html`), as a raw HTML string. */
export const getRevisionHtml = (client: MediaWikiClient, id: number): Promise<string> =>
  restRequest<string>(client, { method: "GET", url: `/revision/${id}/html` });

/** Fetches an individual revision's metadata plus rendered HTML (`GET /revision/{id}/with_html`). */
export const getRevisionWithHtml = (client: MediaWikiClient, id: number): Promise<RestRevision> =>
  restRequest<RestRevision>(client, { method: "GET", url: `/revision/${id}/with_html` });

/** One line of the Wikidiff2 diff format returned by {@link compareRevisions}. */
export type RestDiffLine = {
  type: number;
  text: string;
  lineNumber?: number;
  highlightRanges?: Array<{ start: number; length: number; type: number }>;
  offset: { from: number | null; to: number | null };
};

/** Response of `GET /revision/{from}/compare/{to}`. */
export type RestRevisionComparison = {
  from: { id: number; slot_role: string; sections: Array<{ level: number; heading: string; offset: number }> };
  to: { id: number; slot_role: string; sections: Array<{ level: number; heading: string; offset: number }> };
  diff: RestDiffLine[];
};

/**
 * Compares two revisions line-by-line via Wikidiff2 (`GET /revision/{from}/compare/{to}`).
 * Requires the Wikidiff2 extension (1.9.0+) on the target wiki.
 * @param client The client to fetch through.
 * @param from The base revision ID.
 * @param to The revision ID to compare against `from`.
 */
export const compareRevisions = (
  client: MediaWikiClient,
  from: number,
  to: number
): Promise<RestRevisionComparison> =>
  restRequest<RestRevisionComparison>(client, { method: "GET", url: `/revision/${from}/compare/${to}` });
