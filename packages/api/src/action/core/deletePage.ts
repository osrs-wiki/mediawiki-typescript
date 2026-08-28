import type { ActionCallOptions, MediaWikiClient } from "../../client/MediaWikiClient";
import type { DeleteParams } from "../generated/Delete";

/** Options for {@link deletePage}: the generated `delete` params, minus the auto-fetched `token`. */
export type DeletePageOptions = Omit<DeleteParams, "token">;

/** Response shape of a successful `action=delete`. */
export type DeletePageResult = { delete: { title: string; reason: string; logid?: number } };

/**
 * Deletes a wiki page via `action=delete`, auto-fetching a CSRF token.
 * @param client The client to delete through.
 * @param options See {@link DeletePageOptions}. One of `title`/`pageid` is required.
 * @param callOptions Passed through to {@link MediaWikiClient.call}.
 */
export const deletePage = async (
  client: MediaWikiClient,
  options: DeletePageOptions,
  callOptions: ActionCallOptions = {}
): Promise<DeletePageResult> => {
  const token = await client.getToken("csrf");
  return (await client.call("delete", { ...options, token }, { method: "POST", ...callOptions })) as DeletePageResult;
};
