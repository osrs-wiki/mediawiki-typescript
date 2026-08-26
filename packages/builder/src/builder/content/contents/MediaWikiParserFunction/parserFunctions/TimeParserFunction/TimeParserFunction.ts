import { TimeParserFunctionOptions } from "./TimeParserFunction.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#time:format|datetime|lang|local}}` — formats a date/time per the given format string.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##time
 */
export class TimeParserFunction extends ParserFunction {
  format: string;
  dateTime?: string;
  language?: string;
  local?: boolean;

  constructor(format: string, options?: TimeParserFunctionOptions & { local?: boolean }) {
    super("#time");
    this.format = format;
    this.dateTime = options?.dateTime;
    this.language = options?.language;
    this.local = options?.local;
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
    if (this.local !== undefined) {
      parserFunction.add(this.local ? "1" : "0");
    }
    return parserFunction;
  }
}
