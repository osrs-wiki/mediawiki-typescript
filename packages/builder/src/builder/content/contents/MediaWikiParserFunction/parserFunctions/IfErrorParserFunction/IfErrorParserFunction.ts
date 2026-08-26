import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#iferror:test|error|correct}}` — checks whether the input contains an error, e.g. from `#expr`/`#time`.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##iferror
 */
export class IfErrorParserFunction extends ParserFunction {
  test: MediaWikiContents;
  error?: MediaWikiContents;
  correct?: MediaWikiContents;

  constructor(test: MediaWikiContents, error?: MediaWikiContents, correct?: MediaWikiContents) {
    super("#iferror");
    this.test = test;
    this.error = error;
    this.correct = correct;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(buildContents(this.test));
    if (this.error !== undefined) {
      parserFunction.add(buildContents(this.error));
    }
    if (this.correct !== undefined) {
      parserFunction.add(buildContents(this.correct));
    }
    return parserFunction;
  }
}
