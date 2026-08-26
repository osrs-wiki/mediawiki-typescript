import { TimeParserFunctionOptions } from "../TimeParserFunction/TimeParserFunction.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#timel:format|datetime|lang}}` — identical to `{{#time:}}` but always uses the wiki's local timezone.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##timel
 */
export class TimeLParserFunction extends ParserFunction {
  format: string;
  dateTime?: string;
  language?: string;

  constructor(format: string, options?: TimeParserFunctionOptions) {
    super("#timel");
    this.format = format;
    this.dateTime = options?.dateTime;
    this.language = options?.language;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.format);
    if (this.dateTime !== undefined) {
      parserFunction.add(this.dateTime);
    }
    if (this.language !== undefined) {
      parserFunction.add(this.language);
    }
    return parserFunction;
  }
}
