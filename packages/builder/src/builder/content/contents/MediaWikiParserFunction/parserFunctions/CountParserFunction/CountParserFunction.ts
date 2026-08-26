import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#count:string|substring}}` — counts the occurrences of substring within string.
 * Requires `$wgPFEnableStringFunctions`; disabled by default on Wikimedia wikis.
 * @see https://www.mediawiki.org/wiki/Extension:ParserFunctions/String_functions
 */
export class CountParserFunction extends ParserFunction {
  value: string;
  substring?: string;

  constructor(value: string, substring?: string) {
    super("#count");
    this.value = value;
    this.substring = substring;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    if (this.substring !== undefined) {
      parserFunction.add(this.substring);
    }
    return parserFunction;
  }
}
