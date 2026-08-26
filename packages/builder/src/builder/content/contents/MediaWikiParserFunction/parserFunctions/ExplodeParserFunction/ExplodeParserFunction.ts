import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#explode:string|delimiter|position|limit}}` — splits string by delimiter and returns one segment.
 * Requires `$wgPFEnableStringFunctions`; disabled by default on Wikimedia wikis.
 * @see https://www.mediawiki.org/wiki/Extension:ParserFunctions/String_functions
 */
export class ExplodeParserFunction extends ParserFunction {
  value: string;
  delimiter: string;
  position?: number;
  limit?: number;

  constructor(value: string, delimiter: string, position?: number, limit?: number) {
    super("#explode");
    this.value = value;
    this.delimiter = delimiter;
    this.position = position;
    this.limit = limit;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    parserFunction.add(this.delimiter);
    if (this.position !== undefined) {
      parserFunction.add(this.position.toString());
    }
    if (this.limit !== undefined) {
      parserFunction.add(this.limit.toString());
    }
    return parserFunction;
  }
}
