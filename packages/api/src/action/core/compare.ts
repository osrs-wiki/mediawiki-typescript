import type { ActionCallOptions, MediaWikiClient } from "../../client/MediaWikiClient";
import type { CompareParams } from "../generated/Compare";

/** Response shape of `action=compare` (fields vary with the requested `prop`). */
export type CompareResult = {
  compare: {
    fromid?: number;
    fromrevid?: number;
    fromns?: number;
    fromtitle?: string;
    toid?: number;
    torevid?: number;
    tons?: number;
    totitle?: string;
    body?: string;
    diffsize?: number;
  };
};

/**
 * Computes a diff between two page revisions/titles/ad-hoc text via `action=compare`.
 * @param client The client to compare through.
 * @param params Generated `compare` parameters (`from*`/`to*` pairs).
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const compare = async (
  client: MediaWikiClient,
  params: CompareParams,
  callOptions: ActionCallOptions = {}
): Promise<CompareResult> => (await client.call("compare", { ...params }, callOptions)) as CompareResult;
