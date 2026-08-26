import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{lc:string}}` — converts a string to lowercase.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#Case_conversion_functions
 */
export class LowercaseParserFunction extends ParserFunction {
  value: string;

  constructor(value: string) {
    super("lc");
    this.value = value;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    return parserFunction;
  }
}
