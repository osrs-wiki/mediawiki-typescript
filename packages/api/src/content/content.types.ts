import { MediaWikiContent } from "@mediawiki-typescript/builder";

/**
 * Controls how page/revision content is returned from content-bearing calls
 * (e.g. `query` revisions/extracts, `action=parse`, REST get-source/get-html/revision-get).
 */
export type ContentReturnFormat = "string" | "json" | "contents";

/** Discriminated result of resolving content output, keyed by the requested `ContentReturnFormat`. */
export type ResolvedContent<Format extends ContentReturnFormat = "string"> = Format extends "string"
  ? string
  : Format extends "contents"
    ? MediaWikiContent[]
    : unknown;
