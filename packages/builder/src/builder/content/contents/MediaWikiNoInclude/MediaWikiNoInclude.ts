import MediaWikiContent from "../../MediaWikiContent";
import { MediaWikiContents } from "../../MediaWikiContent.types";

/**
 * Renders `<noinclude>...</noinclude>` — content visible only on the source page, excluded
 * whenever the page is transcluded elsewhere.
 * @see https://www.mediawiki.org/wiki/Help:Transclusion#Source_page_syntax
 */
export class MediaWikiNoInclude extends MediaWikiContent {
  constructor(children?: MediaWikiContents) {
    super(children);
  }

  build() {
    return `<noinclude>${this.buildChildren()}</noinclude>`;
  }
}
