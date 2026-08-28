import type { MediaWikiContents } from "@mediawiki-typescript/builder";
import type { ActionCallOptions, MediaWikiClient } from "../../client/MediaWikiClient";
import { resolveContentInput } from "../../content/resolveContentInput";
import type { EditParams } from "../generated/Edit";

/**
 * Options for {@link edit}: the generated `edit` params, minus `text`/`token` (which this
 * wrapper derives from `source` and an auto-fetched CSRF token, respectively).
 */
export type EditOptions = Omit<EditParams, "text" | "token"> & {
  /** Page content to save \u2014 raw wikitext or `MediaWikiContents`, normalized via the content bridge. */
  source: MediaWikiContents;
};

/** Response shape of a successful `action=edit`. */
export type EditResult = {
  edit: {
    result: string;
    pageid?: number;
    title?: string;
    contentmodel?: string;
    oldrevid?: number;
    newrevid?: number;
    newtimestamp?: string;
  };
};

/**
 * Creates or edits a wiki page via `action=edit`. Accepts `source` as raw wikitext or
 * `MediaWikiContents` (normalized via the content bridge's `resolveContentInput`) and
 * auto-fetches a CSRF token rather than requiring the caller to supply one.
 * @param client The client to edit through.
 * @param options See {@link EditOptions}.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const edit = async (
  client: MediaWikiClient,
  options: EditOptions,
  callOptions: ActionCallOptions = {}
): Promise<EditResult> => {
  const { source, ...params } = options;
  const token = await client.getToken("csrf");
  return (await client.call(
    "edit",
    { ...params, text: resolveContentInput(source), token },
    { method: "POST", ...callOptions }
  )) as EditResult;
};
