import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#ifeq:str1|str2|then|else}}` — compares two strings for equality (numeric if both are numeric).
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##ifeq
 */
export class IfEqParserFunction extends ParserFunction {
  value1: MediaWikiContents;
  value2: MediaWikiContents;
  then: MediaWikiContents;
  else?: MediaWikiContents;

  constructor(
    value1: MediaWikiContents,
    value2: MediaWikiContents,
    then: MediaWikiContents,
    elseValue?: MediaWikiContents
  ) {
    super("#ifeq");
    this.value1 = value1;
    this.value2 = value2;
    this.then = then;
    this.else = elseValue;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(buildContents(this.value1));
    parserFunction.add(buildContents(this.value2));
    parserFunction.add(buildContents(this.then));
    if (this.else !== undefined) {
      parserFunction.add(buildContents(this.else));
    }
    return parserFunction;
  }
}
