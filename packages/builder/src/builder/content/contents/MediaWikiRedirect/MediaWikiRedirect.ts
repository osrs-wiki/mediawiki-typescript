import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders a page redirect directive, e.g. `#REDIRECT [[Target page]]`.
 * @see https://www.mediawiki.org/wiki/Help:Redirects
 */
export class MediaWikiRedirect extends MediaWikiContent {
  target: string;

  constructor(target: string) {
    super();
    this.target = target;
  }

  build() {
    return `#REDIRECT [[${this.target}]]\n`;
  }
}
