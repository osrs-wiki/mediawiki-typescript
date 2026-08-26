import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__INDEX__` magic word, allowing search engines to index the page (overriding
 * `$wgArticleRobotPolicies`/namespace defaults).
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiIndex extends MediaWikiContent {
  build() {
    return "__INDEX__\n";
  }
}
