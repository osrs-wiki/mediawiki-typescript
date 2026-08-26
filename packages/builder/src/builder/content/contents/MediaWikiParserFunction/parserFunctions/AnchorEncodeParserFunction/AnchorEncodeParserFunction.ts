import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{anchorencode:string}}` — encodes a string for use as a section anchor.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#Anchor_encoding
 */
export class AnchorEncodeParserFunction extends ParserFunction {
  value: string;

  constructor(value: string) {
    super("anchorencode");
    this.value = value;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.value);
    return parserFunction;
  }
}
