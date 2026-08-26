import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{urlencode:string}}` — URL-encodes a string for use in a query string.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#Encoding_functions
 */
export class UrlEncodeParserFunction extends ParserFunction {
  value: string;

  constructor(value: string) {
    super("urlencode");
    this.value = value;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    return parserFunction;
  }
}
