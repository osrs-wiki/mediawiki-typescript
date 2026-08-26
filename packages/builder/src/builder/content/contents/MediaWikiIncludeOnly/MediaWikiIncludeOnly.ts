import MediaWikiContent from "../../MediaWikiContent";
import { MediaWikiContents } from "../../MediaWikiContent.types";

/**
 * Renders `<includeonly>...</includeonly>` — content hidden on the source page, shown only
 * when the page is transcluded elsewhere.
 * @see https://www.mediawiki.org/wiki/Help:Transclusion#Source_page_syntax
 */
export class MediaWikiIncludeOnly extends MediaWikiContent {
  constructor(children?: MediaWikiContents) {
    super(children);
  }

  build() {
    return `<includeonly>${this.buildChildren()}</includeonly>`;
  }
}
