import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders `{{DEFAULTSORT:key}}` — overrides the default alphabetical sort key used for every
 * category the current page belongs to.
 * @see https://www.mediawiki.org/wiki/Help:Magic_words#Behavior_switches
 */
export class MediaWikiDefaultSort extends MediaWikiContent {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  build() {
    return `{{DEFAULTSORT:${this.key}}}\n`;
  }
}
