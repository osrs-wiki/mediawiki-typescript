import type { ActionCallOptions, MediaWikiClient } from "../../../client/MediaWikiClient";
import type { QueryAllpagesParams } from "../../generated/QueryAllpages";
import type { QueryBacklinksParams } from "../../generated/QueryBacklinks";
import type { QueryCategorymembersParams } from "../../generated/QueryCategorymembers";
import type { QuerySearchParams } from "../../generated/QuerySearch";

/**
 * Prefixes every key of a `list=` submodule's own parameters with its paraminfo `prefix`
 * (e.g. `limit` \u2192 `aplimit` for `list=allpages`), as the Action API requires on the wire.
 * @param prefix The submodule's paraminfo `prefix` (e.g. `"ap"`, `"sr"`, `"cm"`, `"bl"`).
 * @param params The submodule's own parameters, using their bare (unprefixed) names.
 */
const withPrefix = (prefix: string, params: object): Record<string, unknown> =>
  Object.fromEntries(Object.entries(params).map(([key, value]) => [`${prefix}${key}`, value]));

/** One row of `list=allpages`. */
export type AllPagesResult = { pageid: number; ns: number; title: string };

/**
 * Lists all pages in a namespace via `list=allpages`.
 * @param client The client to query.
 * @param params `query+allpages` parameters (unprefixed).
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const queryAllPages = async (
  client: MediaWikiClient,
  params: QueryAllpagesParams = {},
  callOptions: ActionCallOptions = {}
): Promise<AllPagesResult[]> => {
  const response = (await client.call(
    "query",
    { list: "allpages", ...withPrefix("ap", params) },
    callOptions
  )) as { query?: { allpages?: AllPagesResult[] } };
  return response.query?.allpages ?? [];
};

/** One row of `list=search`. */
export type SearchResult = {
  ns: number;
  title: string;
  pageid: number;
  size?: number;
  wordcount?: number;
  snippet?: string;
  timestamp?: string;
};

/**
 * Full-text searches the wiki via `list=search`.
 * @param client The client to query.
 * @param params `query+search` parameters (unprefixed). `search` is required.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const querySearch = async (
  client: MediaWikiClient,
  params: QuerySearchParams,
  callOptions: ActionCallOptions = {}
): Promise<SearchResult[]> => {
  const response = (await client.call("query", { list: "search", ...withPrefix("sr", params) }, callOptions)) as {
    query?: { search?: SearchResult[] };
  };
  return response.query?.search ?? [];
};

/** One row of `list=categorymembers`. */
export type CategoryMembersResult = {
  pageid: number;
  ns: number;
  title: string;
  sortkey?: string;
  sortkeyprefix?: string;
  timestamp?: string;
  type?: "page" | "subcat" | "file";
};

/**
 * Lists the members of a category via `list=categorymembers`.
 * @param client The client to query.
 * @param params `query+categorymembers` parameters (unprefixed). One of `title`/`pageid` is required.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const queryCategoryMembers = async (
  client: MediaWikiClient,
  params: QueryCategorymembersParams,
  callOptions: ActionCallOptions = {}
): Promise<CategoryMembersResult[]> => {
  const response = (await client.call(
    "query",
    { list: "categorymembers", ...withPrefix("cm", params) },
    callOptions
  )) as { query?: { categorymembers?: CategoryMembersResult[] } };
  return response.query?.categorymembers ?? [];
};

/** One row of `list=backlinks`. */
export type BacklinksResult = { pageid: number; ns: number; title: string; redirect?: boolean };

/**
 * Lists pages linking to a given title via `list=backlinks`.
 * @param client The client to query.
 * @param params `query+backlinks` parameters (unprefixed). One of `title`/`pageid` is required.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const queryBacklinks = async (
  client: MediaWikiClient,
  params: QueryBacklinksParams,
  callOptions: ActionCallOptions = {}
): Promise<BacklinksResult[]> => {
  const response = (await client.call("query", { list: "backlinks", ...withPrefix("bl", params) }, callOptions)) as {
    query?: { backlinks?: BacklinksResult[] };
  };
  return response.query?.backlinks ?? [];
};
