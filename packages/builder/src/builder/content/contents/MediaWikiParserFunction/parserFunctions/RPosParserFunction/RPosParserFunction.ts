import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#rpos:string|target}}` — returns the position of the last occurrence of target in string.
 * Requires `$wgPFEnableStringFunctions`; disabled by default on Wikimedia wikis.
 * @see https://www.mediawiki.org/wiki/Extension:ParserFunctions/String_functions
 */
export class RPosParserFunction extends ParserFunction {
  value: string;
  target: string;

  constructor(value: string, target: string) {
    super("#rpos");
    this.value = value;
    this.target = target;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    parserFunction.add(this.target);
    return parserFunction;
  }
}
