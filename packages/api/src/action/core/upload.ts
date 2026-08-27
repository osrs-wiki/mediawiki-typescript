import type { MediaWikiClient } from "../../client/MediaWikiClient";
import { MediaWikiApiError } from "../../errors/MediaWikiApiError";
import type { UploadParams } from "../generated/Upload";

/** Options for {@link upload}: the generated `upload` params, minus the auto-fetched `token`. */
export type UploadOptions = Omit<UploadParams, "token">;

/** Response shape of a successful (non-chunked, non-async) `action=upload`. */
export type UploadResult = {
  upload: {
    result: string;
    filename?: string;
    imageinfo?: { url: string; descriptionurl: string; size: number; width: number; height: number };
  };
};

/**
 * Uploads a file via `action=upload`, auto-fetching a CSRF token. Unlike every other `action/core`
 * module, this bypasses {@link MediaWikiClient.call} (which always URL/form-encodes) and posts a
 * `multipart/form-data` body directly through the client's axios instance, using the platform's
 * global `FormData`/`Blob` (available on Node 18+).
 * @param client The client to upload through.
 * @param options See {@link UploadOptions}. One of `file`/`url`/`filekey` is required by the Action API.
 */
export const upload = async (client: MediaWikiClient, options: UploadOptions): Promise<UploadResult> => {
  await client.ensureAuthenticated();
  const token = await client.getToken("csrf");

  const formData = new FormData();
  formData.append("action", "upload");
  formData.append("format", "json");
  formData.append("formatversion", "2");
  formData.append("token", token);
  for (const [key, value] of Object.entries(options)) {
    if (value === undefined || value === null) {
      continue;
    }
    formData.append(key, value instanceof Blob ? value : String(value));
  }

  const response = await client.axios.post("", formData);
  const body = response.data as { error?: { code: string; info: string } } & UploadResult;
  if (body.error) {
    throw new MediaWikiApiError(body.error.info ?? body.error.code, { code: body.error.code, httpStatus: response.status });
  }
  return body;
};
