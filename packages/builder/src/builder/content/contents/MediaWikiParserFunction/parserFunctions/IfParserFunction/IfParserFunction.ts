import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#if:test|then|else}}` — evaluates whether a test string is empty.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##if
 */
export class IfParserFunction extends ParserFunction {
  test: MediaWikiContents;
  then: MediaWikiContents;
  else?: MediaWikiContents;

  constructor(test: MediaWikiContents, then: MediaWikiContents, elseValue?: MediaWikiContents) {
    super("#if");
    this.test = test;
    this.then = then;
    this.else = elseValue;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(buildContents(this.test));
    parserFunction.add(buildContents(this.then));
    if (this.else !== undefined) {
      parserFunction.add(buildContents(this.else));
    }
    return parserFunction;
  }
}
