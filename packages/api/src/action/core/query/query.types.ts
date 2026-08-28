/** Common fields present on every page object returned by `action=query`. */
export type QueryPage = {
  /** Omitted (instead of present-but-falsy) for `missing`/`invalid` titles, which have no page ID. */
  pageid?: number;
  ns: number;
  title: string;
  /** Present (and `true`) when the requested title/pageid does not exist. */
  missing?: boolean;
  /** Present (and `true`) when the requested title is invalid. */
  invalid?: boolean;
};

/** Fields `prop=info` adds to a {@link QueryPage}. */
export type QueryInfoResult = {
  contentmodel?: string;
  pagelanguage?: string;
  pagelanguagehtmlcode?: string;
  pagelanguagedir?: string;
  touched?: string;
  lastrevid?: number;
  length?: number;
  protection?: Array<{ type: string; level: string; expiry: string }>;
  displaytitle?: string;
};

/** A single revision slot's content, as returned within `prop=revisions`. */
export type QueryRevisionSlot = {
  contentmodel: string;
  contentformat?: string;
  content?: string;
};

/** Fields `prop=revisions` adds to a {@link QueryPage}. */
export type QueryRevisionsResult = {
  revisions?: Array<{
    revid: number;
    parentid: number;
    user?: string;
    timestamp?: string;
    comment?: string;
    slots?: { main: QueryRevisionSlot };
  }>;
};

/** Fields `prop=categories` adds to a {@link QueryPage}. */
export type QueryCategoriesResult = {
  categories?: Array<{ ns: number; title: string; sortkey?: string; hidden?: boolean }>;
};

/** Fields `prop=links` adds to a {@link QueryPage}. */
export type QueryLinksResult = {
  links?: Array<{ ns: number; title: string }>;
};

/** Fields `prop=images` adds to a {@link QueryPage}. */
export type QueryImagesResult = {
  images?: Array<{ ns: number; title: string }>;
};

/** Fields `prop=extracts` adds to a {@link QueryPage}. */
export type QueryExtractsResult = {
  extract?: string;
};

/** Fields `prop=langlinks` adds to a {@link QueryPage}. */
export type QueryLanglinksResult = {
  langlinks?: Array<{ lang: string; title: string; autonym?: string }>;
};

/**
 * Maps each curated `prop=` value this package hand-models to the fields it adds to a page
 * object. For any `prop` outside this map, call `client.call("query", {...})` directly using
 * the matching generated `QueryXParams` type from `../generated/`.
 */
export type QueryPropResultMap = {
  info: QueryInfoResult;
  revisions: QueryRevisionsResult;
  categories: QueryCategoriesResult;
  links: QueryLinksResult;
  images: QueryImagesResult;
  extracts: QueryExtractsResult;
  langlinks: QueryLanglinksResult;
};

/** The curated `prop=` values {@link QueryPropResultMap} covers. */
export type QueryPropName = keyof QueryPropResultMap;
