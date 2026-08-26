import MediaWikiContent from "../../MediaWikiContent";
import { MediaWikiContents } from "../../MediaWikiContent.types";

/**
 * Renders `<onlyinclude>...</onlyinclude>` — the only content transcluded elsewhere, while
 * still appearing on the source page. Overrules `<noinclude>`/`<includeonly>` when present.
 * @see https://www.mediawiki.org/wiki/Help:Transclusion#Source_page_syntax
 */
export class MediaWikiOnlyInclude extends MediaWikiContent {
  constructor(children?: MediaWikiContents) {
    super(children);
  }

  build() {
    return `<onlyinclude>${this.buildChildren()}</onlyinclude>`;
  }
}
