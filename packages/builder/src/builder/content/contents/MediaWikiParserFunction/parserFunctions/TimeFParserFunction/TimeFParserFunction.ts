import { TimeFFormatType } from "./TimeFParserFunction.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#timef:datetime|formatType|lang}}` — formats a date/time using the language's standard date format.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##timef
 */
export class TimeFParserFunction extends ParserFunction {
  dateTime?: string;
  formatType?: TimeFFormatType;
  language?: string;

  constructor(dateTime?: string, formatType?: TimeFFormatType, language?: string) {
    super("#timef");
    this.dateTime = dateTime;
    this.formatType = formatType;
    this.language = language;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.dateTime ?? "");
    if (this.formatType !== undefined) {
      parserFunction.add(this.formatType);
    }
    if (this.language !== undefined) {
      parserFunction.add(this.language);
    }
    return parserFunction;
  }
}
