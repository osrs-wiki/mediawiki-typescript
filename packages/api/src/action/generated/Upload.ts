/**
 * Generated from `action=paraminfo&modules=upload`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `upload` module (group: action). */
export interface UploadParams {
  filename?: string;
  comment?: string; /** Default: `""`. */
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  text?: string;
  watch?: boolean;
  watchlist?: "nochange" | "preferences" | "watch"; /** Default: `"preferences"`. */
  watchlistexpiry?: string;
  ignorewarnings?: boolean;
  file?: Blob;
  url?: string;
  filekey?: string;
  sessionkey?: string;
  stash?: boolean;
  filesize?: number;
  offset?: number;
  chunk?: Blob;
  async?: boolean;
  checkstatus?: boolean;
  autotext?: boolean;
  license?: string; /** Default: `""`. */
  token: string;
}
