import type { MediaWikiContentList } from "@mediawiki-typescript/builder";

/**
 * Controls how page/revision content is returned from content-bearing calls
 * (e.g. `query` revisions/extracts, `action=parse`, REST get-source/get-html/revision-get).
 */
export type ContentReturnFormat = "string" | "json" | "contents";

/**
 * Discriminated result of resolving content output, keyed by the requested `ContentReturnFormat`.
 * `"contents"` resolves to a `MediaWikiContentList` — a single object exposing every query and
 * mutation helper (list-shaped and tree-traversal-shaped alike) via dot notation, so callers
 * never need to import standalone helper functions or care how a given operation is implemented.
 */
export type ResolvedContent<Format extends ContentReturnFormat = "string"> = Format extends "string"
  ? string
  : Format extends "contents"
    ? MediaWikiContentList
    : unknown;
