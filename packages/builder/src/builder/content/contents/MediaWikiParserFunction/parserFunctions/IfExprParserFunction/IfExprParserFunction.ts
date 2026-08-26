import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#ifexpr:expression|then|else}}` — evaluates a mathematical expression as a boolean.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##ifexpr
 */
export class IfExprParserFunction extends ParserFunction {
  expression: MediaWikiContents;
  then?: MediaWikiContents;
  else?: MediaWikiContents;

  constructor(
    expression: MediaWikiContents,
    then?: MediaWikiContents,
    elseValue?: MediaWikiContents
  ) {
    super("#ifexpr");
    this.expression = expression;
    this.then = then;
    this.else = elseValue;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(buildContents(this.expression));
    if (this.then !== undefined) {
      parserFunction.add(buildContents(this.then));
    }
    if (this.else !== undefined) {
      parserFunction.add(buildContents(this.else));
    }
    return parserFunction;
  }
}
