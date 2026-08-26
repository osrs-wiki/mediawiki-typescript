import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#sub:string|start|length}}` — returns a substring of the given string.
 * Requires `$wgPFEnableStringFunctions`; disabled by default on Wikimedia wikis.
 * @see https://www.mediawiki.org/wiki/Extension:ParserFunctions/String_functions
 */
export class SubParserFunction extends ParserFunction {
  value: string;
  start: number;
  length?: number;

  constructor(value: string, start: number, length?: number) {
    super("#sub");
    this.value = value;
    this.start = start;
    this.length = length;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    parserFunction.add(this.start.toString());
    if (this.length !== undefined) {
      parserFunction.add(this.length.toString());
    }
    return parserFunction;
  }
}
