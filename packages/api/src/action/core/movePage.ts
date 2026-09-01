import type { ActionCallOptions, MediaWikiClient } from "../../client/MediaWikiClient";
import type { MoveParams } from "../generated/Move";

/** Options for {@link movePage}: the generated `move` params, minus the auto-fetched `token`. */
export type MovePageOptions = Omit<MoveParams, "token">;

/** Response shape of a successful `action=move`. */
export type MovePageResult = { move: { from: string; to: string; reason?: string; redirectcreated?: boolean } };

/**
 * Renames/moves a wiki page via `action=move`, auto-fetching a CSRF token.
 * @param client The client to move through.
 * @param options See {@link MovePageOptions}. `to` is required; one of `from`/`fromid` is required.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const movePage = async (
  client: MediaWikiClient,
  options: MovePageOptions,
  callOptions: ActionCallOptions = {}
): Promise<MovePageResult> => {
  const token = await client.getToken("csrf");
  return (await client.call("move", { ...options, token }, { method: "POST", ...callOptions })) as MovePageResult;
};
