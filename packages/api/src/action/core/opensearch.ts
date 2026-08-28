import type { ActionCallOptions, MediaWikiClient } from "../../client/MediaWikiClient";
import type { OpensearchParams } from "../generated/Opensearch";

/**
 * The 4-element tuple `action=opensearch` returns: the original search term, matched titles,
 * matched descriptions (usually empty), and matched page URLs. See
 * https://www.mediawiki.org/wiki/API:Opensearch.
 */
export type OpenSearchResult = [search: string, titles: string[], descriptions: string[], urls: string[]];

/**
 * Searches page titles via the OpenSearch protocol (`action=opensearch`) \u2014 suited for
 * typeahead/autocomplete UIs.
 * @param client The client to search through.
 * @param params Generated `opensearch` parameters. `search` is required.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const opensearch = async (
  client: MediaWikiClient,
  params: OpensearchParams,
  callOptions: ActionCallOptions = {}
): Promise<OpenSearchResult> => (await client.call("opensearch", { ...params }, callOptions)) as OpenSearchResult;
