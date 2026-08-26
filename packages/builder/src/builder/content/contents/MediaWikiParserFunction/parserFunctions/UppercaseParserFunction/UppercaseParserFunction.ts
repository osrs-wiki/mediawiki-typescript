import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{uc:string}}` — converts a string to uppercase.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#Case_conversion_functions
 */
export class UppercaseParserFunction extends ParserFunction {
  value: string;

  constructor(value: string) {
    super("uc");
    this.value = value;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    return parserFunction;
  }
}
