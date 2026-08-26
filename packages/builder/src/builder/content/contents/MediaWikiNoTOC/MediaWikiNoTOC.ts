import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__NOTOC__` magic word, suppressing the automatic table of contents.
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiNoTOC extends MediaWikiContent {
  build() {
    return "__NOTOC__\n";
  }
}
