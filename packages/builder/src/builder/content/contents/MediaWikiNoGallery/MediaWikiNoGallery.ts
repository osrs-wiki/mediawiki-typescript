import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__NOGALLERY__` magic word, displaying category-page images as links instead of a thumbnail gallery.
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiNoGallery extends MediaWikiContent {
  build() {
    return "__NOGALLERY__\n";
  }
}
