import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders a category tag, e.g. `[[Category:Name]]` or `[[Category:Name|SortKey]]`, which adds
 * the current page to the given category (optionally under a custom sort key/heading).
 * @see https://www.mediawiki.org/wiki/Help:Categories
 */
export class MediaWikiCategory extends MediaWikiContent {
  name: string;
  sortKey?: string;

  constructor(name: string, sortKey?: string) {
    super();
    this.name = name;
    this.sortKey = sortKey;
  }

  build() {
    return `[[Category:${this.name}${this.sortKey ? `|${this.sortKey}` : ""}]]`;
  }
}
