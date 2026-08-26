import {
  MediaWikiGalleryItem,
  MediaWikiGalleryOptions,
} from "./MediaWikiGallery.types";
import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders a `<gallery>...</gallery>` block — a grid of thumbnails, one `file|caption` pair per line.
 * @see https://www.mediawiki.org/wiki/Help:Images#Gallery_syntax
 */
export class MediaWikiGallery extends MediaWikiContent {
  items: MediaWikiGalleryItem[];
  options?: MediaWikiGalleryOptions;

  constructor(items: MediaWikiGalleryItem[], options?: MediaWikiGalleryOptions) {
    super();
    this.items = items;
    this.options = options;
  }

  build() {
    const attributes: string[] = [];
    const { mode, widths, heights, perrow, caption, class: className, showfilename } =
      this.options ?? {};
    if (mode) {
      attributes.push(`mode="${mode}"`);
    }
    if (widths !== undefined) {
      attributes.push(`widths="${widths}"`);
    }
    if (heights !== undefined) {
      attributes.push(`heights="${heights}"`);
    }
    if (perrow !== undefined) {
      attributes.push(`perrow="${perrow}"`);
    }
    if (caption !== undefined) {
      attributes.push(`caption="${caption}"`);
    }
    if (className) {
      attributes.push(`class="${className}"`);
    }
    if (showfilename) {
      attributes.push('showfilename="yes"');
    }
    const openTag = `<gallery${attributes.length > 0 ? " " + attributes.join(" ") : ""}>`;
    const body = this.items
      .map((item) => (item.caption !== undefined ? `${item.file}|${item.caption}` : item.file))
      .join("\n");
    return `${openTag}\n${body}\n</gallery>\n`;
  }
}
