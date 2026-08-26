import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#replace:string|from|to|limit}}` — replaces occurrences of `from` with `to` within string.
 * Requires `$wgPFEnableStringFunctions`; disabled by default on Wikimedia wikis.
 * @see https://www.mediawiki.org/wiki/Extension:ParserFunctions/String_functions
 */
export class ReplaceParserFunction extends ParserFunction {
  value: string;
  from: string;
  to?: string;
  limit?: number;

  constructor(value: string, from: string, to?: string, limit?: number) {
    super("#replace");
    this.value = value;
    this.from = from;
    this.to = to;
    this.limit = limit;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    parserFunction.add(this.from);
    if (this.to !== undefined) {
      parserFunction.add(this.to);
    }
    if (this.limit !== undefined) {
      parserFunction.add(this.limit.toString());
    }
    return parserFunction;
  }
}
