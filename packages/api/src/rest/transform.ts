import type { ContentReturnFormat, ResolvedContent } from "../content/content.types";
import { resolveContentOutput } from "../content/resolveContentOutput";
import type { MediaWikiClient } from "../client/MediaWikiClient";
import { encodeTitle, restRequest } from "./restRequest";

/** Converts wikitext to HTML in the context of a page, without saving it (`POST /transform/wikitext/to/html/{title}`). */
export const wikitextToHtml = (client: MediaWikiClient, title: string, wikitext: string): Promise<string> =>
  restRequest<string>(client, {
    method: "POST",
    url: `/transform/wikitext/to/html/${encodeTitle(title)}`,
    data: { wikitext },
  });

/**
 * Converts HTML to wikitext in the context of a page (`POST /transform/html/to/wikitext/{title}`),
 * shaping the resulting wikitext per `responseFormat` through the shared content bridge.
 * @param client The client to transform through.
 * @param title The page title to use as parsing context.
 * @param html The HTML to convert.
 * @param responseFormat How to shape the result; see `../content/content.types.ts`. Defaults to `"string"`.
 */
export const htmlToWikitext = async <Format extends ContentReturnFormat = "string">(
  client: MediaWikiClient,
  title: string,
  html: string,
  responseFormat?: Format
): Promise<ResolvedContent<Format>> => {
  const wikitext = await restRequest<string>(client, {
    method: "POST",
    url: `/transform/html/to/wikitext/${encodeTitle(title)}`,
    data: { html },
  });
  return resolveContentOutput(wikitext, wikitext, (responseFormat ?? "string") as Format);
};

/** One lint error, as returned by `POST /transform/wikitext/to/lint/{title}`. */
export type RestLintError = {
  type: string;
  dsr?: [number, number, number, number];
  params?: Record<string, unknown>;
  templateInfo?: Record<string, unknown>;
};

/** Transforms wikitext into a list of lint errors, without saving it (`POST /transform/wikitext/to/lint/{title}`). */
export const wikitextToLint = (client: MediaWikiClient, title: string, wikitext: string): Promise<RestLintError[]> =>
  restRequest<RestLintError[]>(client, {
    method: "POST",
    url: `/transform/wikitext/to/lint/${encodeTitle(title)}`,
    data: { wikitext },
  });
