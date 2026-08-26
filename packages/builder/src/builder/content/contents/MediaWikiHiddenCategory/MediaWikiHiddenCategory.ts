import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__HIDDENCAT__` magic word, used on a category page itself to hide it from the
 * default "Categories:" list shown on member pages.
 * @see https://www.mediawiki.org/wiki/Help:Categories#Hidden_categories
 */
export class MediaWikiHiddenCategory extends MediaWikiContent {
  build() {
    return "__HIDDENCAT__\n";
  }
}
