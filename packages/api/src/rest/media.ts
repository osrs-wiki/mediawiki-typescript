import type { MediaWikiClient } from "../client/MediaWikiClient";
import { encodeTitle, restRequest } from "./restRequest";

/** A reduced/original/thumbnail rendition of a {@link RestFile}. */
export type RestFileRendition = {
  mediatype: string;
  size: number | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  url: string;
};

/** A file object, as returned by `GET /file/{title}`. */
export type RestFile = {
  title: string;
  file_description_url: string;
  latest: { timestamp: string; user: { id: number; name: string } };
  preferred: RestFileRendition;
  original: RestFileRendition;
  thumbnail?: RestFileRendition;
};

/**
 * Fetches information about a file, including thumbnail/preview/original download links
 * (`GET /file/{title}`).
 * @param client The client to fetch through.
 * @param title The file title (e.g. `"File:The_Blue_Marble.jpg"`).
 */
export const getFile = (client: MediaWikiClient, title: string): Promise<RestFile> =>
  restRequest<RestFile>(client, { method: "GET", url: `/file/${encodeTitle(title)}` });
