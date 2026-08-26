import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__NOINDEX__` magic word, telling search engines not to index the page.
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiNoIndex extends MediaWikiContent {
  build() {
    return "__NOINDEX__\n";
  }
}
