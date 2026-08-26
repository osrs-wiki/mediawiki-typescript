import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__NOEDITSECTION__` magic word, removing "edit" links next to section headings.
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiNoEditSection extends MediaWikiContent {
  build() {
    return "__NOEDITSECTION__\n";
  }
}
