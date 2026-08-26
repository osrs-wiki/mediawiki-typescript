import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#expr:expression}}` — evaluates a mathematical expression and returns the result.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##expr
 * @see https://www.mediawiki.org/wiki/Manual:Expr_parser_function_syntax
 */
export class ExprParserFunction extends ParserFunction {
  expression: MediaWikiContents;

  constructor(expression: MediaWikiContents) {
    super("#expr");
    this.expression = expression;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(buildContents(this.expression));
    return parserFunction;
  }
}
