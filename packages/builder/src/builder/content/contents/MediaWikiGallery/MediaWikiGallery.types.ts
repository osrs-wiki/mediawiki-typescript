export type MediaWikiGalleryMode =
  | "traditional"
  | "nolines"
  | "packed"
  | "packed-overlays"
  | "packed-hover";

export type MediaWikiGalleryItem = { file: string; caption?: string };

export type MediaWikiGalleryOptions = {
  mode?: MediaWikiGalleryMode;
  widths?: number;
  heights?: number;
  perrow?: number;
  caption?: string;
  class?: string;
  showfilename?: boolean;
};
