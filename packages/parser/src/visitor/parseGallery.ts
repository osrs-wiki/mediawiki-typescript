import { parseAttributes } from "../attributes";
import {
  MediaWikiGallery,
  MediaWikiGalleryItem,
  MediaWikiGalleryMode,
  MediaWikiGalleryOptions,
} from "@mediawiki-typescript/builder";

const OPEN_TAG_PATTERN = /^\s{0,3}<gallery([^>]*)>/i;
const CLOSE_TAG_PATTERN = /<\/gallery>\s*$/i;
const GALLERY_MODES: readonly string[] = [
  "traditional",
  "nolines",
  "packed",
  "packed-overlays",
  "packed-hover",
];

/** Parses a raw `<gallery ...>...</gallery>` opaque-tag capture into a `MediaWikiGallery`. */
export const parseGallery = (image: string): MediaWikiGallery => {
  const openMatch = OPEN_TAG_PATTERN.exec(image);
  const attributes = openMatch ? parseAttributes(openMatch[1]) : undefined;
  const bodyStart = openMatch ? openMatch[0].length : 0;
  const withoutCloseTag = image.replace(CLOSE_TAG_PATTERN, "");
  const body = withoutCloseTag.slice(bodyStart);

  const items: MediaWikiGalleryItem[] = body
    .split(/\r\n|\r|\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const pipeIndex = line.indexOf("|");
      return pipeIndex === -1
        ? { file: line }
        : { file: line.slice(0, pipeIndex), caption: line.slice(pipeIndex + 1) };
    });

  const mode =
    attributes?.mode && GALLERY_MODES.includes(attributes.mode)
      ? (attributes.mode as MediaWikiGalleryMode)
      : undefined;
  const options: MediaWikiGalleryOptions = {};
  if (mode) options.mode = mode;
  if (attributes?.widths) options.widths = Number(attributes.widths);
  if (attributes?.heights) options.heights = Number(attributes.heights);
  if (attributes?.perrow) options.perrow = Number(attributes.perrow);
  if (attributes?.caption !== undefined) options.caption = attributes.caption;
  if (attributes?.class) options.class = attributes.class;
  if (attributes?.showfilename === "yes") options.showfilename = true;

  return new MediaWikiGallery(items, Object.keys(options).length > 0 ? options : undefined);
};
