import { TimeFFormatType } from "../TimeFParserFunction/TimeFParserFunction.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#timefl:datetime|formatType|lang}}` — identical to `{{#timef:}}` but always uses the wiki's local timezone.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##timefl
 */
export class TimeFLParserFunction extends ParserFunction {
  dateTime?: string;
  formatType?: TimeFFormatType;
  language?: string;

  constructor(dateTime?: string, formatType?: TimeFFormatType, language?: string) {
    super("#timefl");
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
