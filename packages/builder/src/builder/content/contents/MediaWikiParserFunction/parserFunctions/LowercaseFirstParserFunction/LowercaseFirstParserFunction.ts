import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{lcfirst:string}}` — lowercases the first character of a string.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#Case_conversion_functions
 */
export class LowercaseFirstParserFunction extends ParserFunction {
  value: string;

  constructor(value: string) {
    super("lcfirst");
    this.value = value;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    return parserFunction;
  }
}
