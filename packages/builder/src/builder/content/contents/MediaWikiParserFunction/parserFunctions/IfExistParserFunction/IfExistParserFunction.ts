import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#ifexist:page|exists|notexists}}` — checks whether a page exists on the local wiki.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##ifexist
 */
export class IfExistParserFunction extends ParserFunction {
  page: MediaWikiContents;
  exists?: MediaWikiContents;
  notExists?: MediaWikiContents;

  constructor(page: MediaWikiContents, exists?: MediaWikiContents, notExists?: MediaWikiContents) {
    super("#ifexist");
    this.page = page;
    this.exists = exists;
    this.notExists = notExists;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(buildContents(this.page));
    if (this.exists !== undefined) {
      parserFunction.add(buildContents(this.exists));
    }
    if (this.notExists !== undefined) {
      parserFunction.add(buildContents(this.notExists));
    }
    return parserFunction;
  }
}
