import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#pos:string|target|offset}}` — returns the position of the first occurrence of target in string.
 * Requires `$wgPFEnableStringFunctions`; disabled by default on Wikimedia wikis.
 * @see https://www.mediawiki.org/wiki/Extension:ParserFunctions/String_functions
 */
export class PosParserFunction extends ParserFunction {
  value: string;
  target: string;
  offset?: number;

  constructor(value: string, target: string, offset?: number) {
    super("#pos");
    this.value = value;
    this.target = target;
    this.offset = offset;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    parserFunction.add(this.target);
    if (this.offset !== undefined) {
      parserFunction.add(this.offset.toString());
    }
    return parserFunction;
  }
}
