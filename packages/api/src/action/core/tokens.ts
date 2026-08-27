import type { MediaWikiClient, TokenType } from "../../client/MediaWikiClient";

/**
 * Re-exported for discoverability under `action.core.tokens`; delegates entirely to
 * {@link MediaWikiClient.getToken}, which already fetches and caches Action API tokens.
 * @param client The client to fetch a token from.
 * @param type The token type to fetch (`"csrf"`, `"login"`, etc.).
 */
export const getToken = (client: MediaWikiClient, type: TokenType): Promise<string> => client.getToken(type);
