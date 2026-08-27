import axios, { AxiosRequestConfig } from "axios";
import type { MediaWikiClient } from "../client/MediaWikiClient";
import { MediaWikiApiError } from "../errors/MediaWikiApiError";

/** Shape of a REST API error response body (MediaWiki's REST API errors aren't fully RFC 7807-consistent). */
type RestErrorBody = { httpCode?: number; httpReason?: string; message?: string; title?: string; detail?: string };

/**
 * Low-level `/rest.php/v1` request shared by every `rest/` module. Reuses the same axios
 * instance (and therefore the same auth strategy/cookie jar) as the Action API client, just
 * pointed at the REST API's base path instead of `api.php`.
 * @param client The client whose wiki to call.
 * @param config Standard axios request config; `url` is resolved relative to `{baseUrl}/w/rest.php/v1`.
 */
export const restRequest = async <T>(client: MediaWikiClient, config: AxiosRequestConfig): Promise<T> => {
  await client.ensureAuthenticated();
  try {
    const response = await client.axios.request<T>({ ...config, baseURL: `${client.baseUrl}/w/rest.php/v1` });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const body = (error.response.data ?? {}) as RestErrorBody;
      throw new MediaWikiApiError(body.message ?? body.title ?? body.httpReason ?? error.message, {
        code: body.httpReason ?? String(error.response.status),
        httpStatus: error.response.status,
      });
    }
    throw error;
  }
};

/**
 * Encodes a page title for use as a REST API path segment, including the `/` \u2192 `%2F` encoding
 * the Action API docs require for subpage titles (e.g. `"User:Foo/Bar"`).
 * @param title The page title to encode.
 */
export const encodeTitle = (title: string): string => encodeURIComponent(title);
