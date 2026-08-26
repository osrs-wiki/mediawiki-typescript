import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#titleparts:pagename|numSegments|startSegment}}` — separates a page title into slash-delimited segments.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##titleparts
 */
export class TitlePartsParserFunction extends ParserFunction {
  pageName: string;
  numSegments?: number;
  startSegment?: number;

  constructor(pageName: string, numSegments?: number, startSegment?: number) {
    super("#titleparts");
    this.pageName = pageName;
    this.numSegments = numSegments;
    this.startSegment = startSegment;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.pageName);
    if (this.numSegments !== undefined) {
      parserFunction.add(this.numSegments.toString());
    }
    if (this.startSegment !== undefined) {
      parserFunction.add(this.startSegment.toString());
    }
    return parserFunction;
  }
}
