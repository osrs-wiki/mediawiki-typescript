import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__FORCETOC__` magic word, forcing a table of contents even below the usual heading threshold.
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiForceTOC extends MediaWikiContent {
  build() {
    return "__FORCETOC__\n";
  }
}
