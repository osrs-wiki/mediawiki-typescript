import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{ucfirst:string}}` — uppercases the first character of a string.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#Case_conversion_functions
 */
export class UppercaseFirstParserFunction extends ParserFunction {
  value: string;

  constructor(value: string) {
    super("ucfirst");
    this.value = value;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    return parserFunction;
  }
}
