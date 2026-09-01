import type { ContentReturnFormat, ResolvedContent } from "../../content/content.types";
import { resolveContentOutput } from "../../content/resolveContentOutput";
import type { ActionCallOptions, MediaWikiClient } from "../../client/MediaWikiClient";
import type { ParseParams } from "../generated/Parse";

/**
 * Options for {@link parsePage}: the generated `parse` params, minus `prop` (this wrapper always
 * requests `prop=wikitext` so it has content to shape via `responseFormat`), plus `responseFormat`.
 */
export type ParsePageOptions<Format extends ContentReturnFormat = "string"> = Omit<ParseParams, "prop"> & {
  /** How to shape the returned content; see `../../content/content.types.ts`. Defaults to `"string"`. */
  responseFormat?: Format;
};

/** Result of {@link parsePage}. */
export type ParsePageResult<Format extends ContentReturnFormat = "string"> = {
  title: string;
  pageid: number;
  content: ResolvedContent<Format>;
};

/** Shape of the raw `action=parse&prop=wikitext` response this module reads from. */
type ParseResponse = { parse: { title: string; pageid: number; wikitext: string } };

/**
 * Parses a page (or ad-hoc wikitext, via `text`) via `action=parse`, shaping the resulting
 * wikitext per `responseFormat` through the shared content bridge (`../../content`).
 *
 * Named `parsePage` (not `parse`) to avoid confusion with `@mediawiki-typescript/parser`'s
 * own `parse()`, which this module calls internally when `responseFormat: "contents"` is requested.
 * @param client The client to parse through.
 * @param options See {@link ParsePageOptions}.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const parsePage = async <Format extends ContentReturnFormat = "string">(
  client: MediaWikiClient,
  options: ParsePageOptions<Format>,
  callOptions: ActionCallOptions = {}
): Promise<ParsePageResult<Format>> => {
  const { responseFormat, ...params } = options;
  const format = (responseFormat ?? "string") as Format;
  const response = (await client.call("parse", { ...params, prop: "wikitext" }, callOptions)) as ParseResponse;
  const content = await resolveContentOutput(response.parse.wikitext, response, format);
  return { title: response.parse.title, pageid: response.parse.pageid, content: content as ResolvedContent<Format> };
};
