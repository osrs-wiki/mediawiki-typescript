import type { ActionCallOptions, MediaWikiClient } from "../client/MediaWikiClient";
import type { ContentReturnFormat } from "../content/content.types";
import * as core from "./core";
import type { QueryPropName } from "./core/query/query.types";
import type { QueryAllpagesParams } from "./generated/QueryAllpages";
import type { QueryBacklinksParams } from "./generated/QueryBacklinks";
import type { QueryCategorymembersParams } from "./generated/QueryCategorymembers";
import type { QuerySearchParams } from "./generated/QuerySearch";

/** The `client.query.*` sub-facade returned by {@link ActionApiClient.query}. */
export type ActionApiQueryFacade = {
  /** See `action/core/query/query.ts`. */
  query<Props extends readonly QueryPropName[]>(
    options: core.QueryOptions<Props>,
    callOptions?: ActionCallOptions
  ): ReturnType<typeof core.query<Props>>;
  /** See `action/core/query/query.ts`. */
  revisionContent<Format extends ContentReturnFormat = "string">(
    options: { titles?: string[]; pageids?: number[]; responseFormat?: Format },
    callOptions?: ActionCallOptions
  ): ReturnType<typeof core.queryRevisionContent<Format>>;
  /** See `action/core/query/lists.ts`. */
  allPages(params?: QueryAllpagesParams, callOptions?: ActionCallOptions): ReturnType<typeof core.queryAllPages>;
  /** See `action/core/query/lists.ts`. */
  search(params: QuerySearchParams, callOptions?: ActionCallOptions): ReturnType<typeof core.querySearch>;
  /** See `action/core/query/lists.ts`. */
  categoryMembers(
    params: QueryCategorymembersParams,
    callOptions?: ActionCallOptions
  ): ReturnType<typeof core.queryCategoryMembers>;
  /** See `action/core/query/lists.ts`. */
  backlinks(params: QueryBacklinksParams, callOptions?: ActionCallOptions): ReturnType<typeof core.queryBacklinks>;
};

/**
 * Facade over the curated `action/core` Action API modules, bound to one {@link MediaWikiClient}
 * so callers don't have to thread the client through every call (e.g. `actionApi.edit(options)`
 * instead of `edit(client, options)`).
 *
 * For anything outside this curated set (270+ other generated modules), call
 * `client.call(action, params)` directly using the matching generated `*Params` type from
 * `action/generated/` \u2014 that's the documented "100% request coverage, curated response coverage"
 * boundary for this package (see `docs/plans/api/plan.md`).
 */
export class ActionApiClient {
  /** The curated `query`/list helpers; see {@link ActionApiQueryFacade}. */
  readonly query: ActionApiQueryFacade;

  /** @param client The wiki connection this facade's methods operate against. */
  constructor(private readonly client: MediaWikiClient) {
    this.query = {
      query: (options, callOptions) => core.query(this.client, options, callOptions),
      revisionContent: (options, callOptions) => core.queryRevisionContent(this.client, options, callOptions),
      allPages: (params, callOptions) => core.queryAllPages(this.client, params, callOptions),
      search: (params, callOptions) => core.querySearch(this.client, params, callOptions),
      categoryMembers: (params, callOptions) => core.queryCategoryMembers(this.client, params, callOptions),
      backlinks: (params, callOptions) => core.queryBacklinks(this.client, params, callOptions),
    };
  }

  /** See `action/core/edit.ts`. */
  edit(options: core.EditOptions, callOptions?: ActionCallOptions): ReturnType<typeof core.edit> {
    return core.edit(this.client, options, callOptions);
  }

  /** See `action/core/parsePage.ts`. */
  parsePage<Format extends ContentReturnFormat = "string">(
    options: core.ParsePageOptions<Format>,
    callOptions?: ActionCallOptions
  ): ReturnType<typeof core.parsePage<Format>> {
    return core.parsePage(this.client, options, callOptions);
  }

  /** See `action/core/deletePage.ts`. */
  deletePage(options: core.DeletePageOptions, callOptions?: ActionCallOptions): ReturnType<typeof core.deletePage> {
    return core.deletePage(this.client, options, callOptions);
  }

  /** See `action/core/movePage.ts`. */
  movePage(options: core.MovePageOptions, callOptions?: ActionCallOptions): ReturnType<typeof core.movePage> {
    return core.movePage(this.client, options, callOptions);
  }

  /** See `action/core/compare.ts`. */
  compare(
    params: Parameters<typeof core.compare>[1],
    callOptions?: ActionCallOptions
  ): ReturnType<typeof core.compare> {
    return core.compare(this.client, params, callOptions);
  }

  /** See `action/core/opensearch.ts`. */
  opensearch(
    params: Parameters<typeof core.opensearch>[1],
    callOptions?: ActionCallOptions
  ): ReturnType<typeof core.opensearch> {
    return core.opensearch(this.client, params, callOptions);
  }

  /** See `action/core/upload.ts`. */
  upload(options: core.UploadOptions): ReturnType<typeof core.upload> {
    return core.upload(this.client, options);
  }

  /** See `action/core/tokens.ts`. */
  getToken(type: Parameters<typeof core.getToken>[1]): ReturnType<typeof core.getToken> {
    return core.getToken(this.client, type);
  }

  /** See `action/core/siteinfo.ts`. */
  siteinfo(): ReturnType<typeof core.siteinfo> {
    return core.siteinfo(this.client);
  }
}
