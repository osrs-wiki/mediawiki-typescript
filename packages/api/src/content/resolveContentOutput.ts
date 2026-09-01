import { MediaWikiContentList } from "@mediawiki-typescript/builder";
import { parse } from "@mediawiki-typescript/parser";
import type { ContentReturnFormat, ResolvedContent } from "./content.types";

/**
 * Shapes an API response's wikitext content according to the caller-requested
 * `ContentReturnFormat`, shared by both the Action API and REST API clients so the two
 * behave identically.
 *
 * - `"string"` — the raw wikitext, unchanged.
 * - `"json"` — the untouched raw API response object (the caller already has this; passed
 *   through as-is so all three formats can be requested from the same call site).
 * - `"contents"` — the wikitext parsed and wrapped in a `MediaWikiContentList`, so every query
 *   and mutation helper is available directly via dot notation (e.g. `result.findSection(...)`,
 *   `result.insertInSection(...)`, `result.isEmpty()`, `result.trimBreaks()`).
 *
 * @param wikitext The extracted wikitext content to shape.
 * @param rawResponse The untouched raw API response, returned as-is for `"json"`.
 * @param format Which {@link ContentReturnFormat} to resolve to.
 * @returns The resolved content, typed per `format` via {@link ResolvedContent}.
 */
export const resolveContentOutput = async <Format extends ContentReturnFormat>(
  wikitext: string,
  rawResponse: unknown,
  format: Format
): Promise<ResolvedContent<Format>> => {
  switch (format) {
    case "json":
      return rawResponse as ResolvedContent<Format>;
    case "contents":
      return new MediaWikiContentList(await parse(wikitext)) as ResolvedContent<Format>;
    case "string":
    default:
      return wikitext as ResolvedContent<Format>;
  }
};
