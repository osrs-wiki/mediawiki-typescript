import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders the `__STATICREDIRECT__` magic word, preventing bots from automatically updating the
 * links on a redirect page (e.g. when the redirect target is moved).
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiStaticRedirect extends MediaWikiContent {
  build() {
    return "__STATICREDIRECT__\n";
  }
}
