import type { ActionCallOptions, MediaWikiClient } from "../../../client/MediaWikiClient";
import type { ContentReturnFormat, ResolvedContent } from "../../../content/content.types";
import { resolveContentOutput } from "../../../content/resolveContentOutput";
import { QueryPage, QueryPropName, QueryPropResultMap } from "./query.types";

/** Converts a union type into an intersection type (used to merge the result fields of every requested `prop`). */
type UnionToIntersection<Union> = (Union extends unknown ? (member: Union) => void : never) extends (
  merged: infer Intersection
) => void
  ? Intersection
  : never;

/** A page result from {@link query}, with fields merged in per requested `prop`. */
export type QueryResult<Props extends readonly QueryPropName[]> = QueryPage &
  Partial<UnionToIntersection<QueryPropResultMap[Props[number]]>>;

/** Options accepted by {@link query}. */
export type QueryOptions<Props extends readonly QueryPropName[]> = {
  /** Page titles to query. Mutually exclusive with `pageids`. */
  titles?: string[];
  /** Page IDs to query. Mutually exclusive with `titles`. */
  pageids?: number[];
  /** Which curated `prop=` submodules to request; see {@link QueryPropName}. */
  prop: Props;
  /** Extra module-specific parameters forwarded as-is (e.g. `rvslots`, `cllimit`, `imlimit`). */
  params?: Record<string, unknown>;
};

/** Shape of the raw `action=query` response this module reads from. */
type QueryResponse<Props extends readonly QueryPropName[]> = {
  query?: { pages?: QueryResult<Props>[] };
};

/**
 * Typed wrapper for `action=query` restricted to the curated `prop` set this package hand-models
 * response types for (see `query.types.ts`). For anything outside that set, call
 * `client.call("query", {...})` directly using the generated `QueryXParams` param types instead.
 * @param client The client to query.
 * @param options See {@link QueryOptions}.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const query = async <Props extends readonly QueryPropName[]>(
  client: MediaWikiClient,
  options: QueryOptions<Props>,
  callOptions: ActionCallOptions = {}
): Promise<{ pages: QueryResult<Props>[] }> => {
  const { titles, pageids, prop, params } = options;
  const response = (await client.call(
    "query",
    {
      ...(titles ? { titles: titles.join("|") } : {}),
      ...(pageids ? { pageids: pageids.join("|") } : {}),
      prop: prop.join("|"),
      ...params,
    },
    callOptions
  )) as QueryResponse<Props>;

  return { pages: response.query?.pages ?? [] };
};

/** One page's resolved revision content, as returned by {@link queryRevisionContent}. */
export type QueryRevisionContent<Format extends ContentReturnFormat = "string"> = {
  pageid: number;
  title: string;
  content: ResolvedContent<Format>;
};

/**
 * Fetches each page's latest main-slot revision content via `prop=revisions`, shaping the
 * content per `responseFormat` through the shared content bridge (`../../../content`).
 * @param client The client to query.
 * @param options `titles`/`pageids` (as in {@link QueryOptions}) plus `responseFormat`.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const queryRevisionContent = async <Format extends ContentReturnFormat = "string">(
  client: MediaWikiClient,
  options: { titles?: string[]; pageids?: number[]; responseFormat?: Format },
  callOptions: ActionCallOptions = {}
): Promise<QueryRevisionContent<Format>[]> => {
  const responseFormat = (options.responseFormat ?? "string") as Format;
  const { pages } = await query(
    client,
    {
      titles: options.titles,
      pageids: options.pageids,
      prop: ["revisions"] as const,
      params: { rvprop: "content|ids|timestamp|user|comment", rvslots: "main" },
    },
    callOptions
  );

  return Promise.all(
    pages
      .filter((page): page is typeof page & { pageid: number } => page.pageid !== undefined)
      .map(async (page) => {
        const wikitext = page.revisions?.[0]?.slots?.main.content ?? "";
        const content = await resolveContentOutput(wikitext, page, responseFormat);
        return { pageid: page.pageid, title: page.title, content: content as ResolvedContent<Format> };
      })
  );
};
