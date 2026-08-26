import { MediaWikiContents } from "../../MediaWikiContent.types";

export type FileFormat = "frameless" | "frame" | "framed" | "thumb" | "thumbnail";

export type FileHorizontalAlignment = "left" | "right" | "center" | "none";

export type FileVerticalAlignment =
  | "baseline"
  | "sub"
  | "super"
  | "top"
  | "text-top"
  | "middle"
  | "bottom"
  | "text-bottom";

export type FileResizing = {
  width?: number;
  height?: number;
  /** `upright` (bare) or `upright=N` — pass `true` for the bare form. */
  upright?: number | true;
};

export type MediaWikiFileOptions = {
  /** Renders a thin gray border. Only has an effect alone or combined with `frameless`. */
  border?: boolean;
  caption?: MediaWikiContents;
  format?: FileFormat;
  resizing?: FileResizing;
  horizontalAlignment?: FileHorizontalAlignment;
  verticalAlignment?: FileVerticalAlignment;
  /** Target page/URL for the generated link; pass `""` to render with no link at all. */
  link?: string;
  alt?: string;
  /** Page number to render, for multi-page media (.pdf/.djvu). */
  page?: number;
  /** Timestamp (seconds or MM:SS/HH:MM:SS) to render a video thumbnail from. */
  thumbtime?: string;
  /** Timestamp (seconds or MM:SS/HH:MM:SS) to start video/audio playback at. */
  start?: string;
  muted?: boolean;
  loop?: boolean;
  lossy?: boolean;
  class?: string;
  lang?: string;
};
