import { SwitchCase } from "./SwitchParserFunction.types";
import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#switch:comparison|case=result|...|default}}` — compares one value against several cases.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##switch
 */
export class SwitchParserFunction extends ParserFunction {
  comparison: MediaWikiContents;
  cases: SwitchCase[];
  default?: string;

  constructor(comparison: MediaWikiContents, cases: SwitchCase[], defaultResult?: string) {
    super("#switch");
    this.comparison = comparison;
    this.cases = cases;
    this.default = defaultResult;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(buildContents(this.comparison));
    this.cases.forEach((switchCase) => {
      parserFunction.add(
        switchCase.result !== undefined
          ? `${switchCase.case}=${switchCase.result}`
          : switchCase.case
      );
    });
    if (this.default !== undefined) {
      parserFunction.add(this.default);
    }
    return parserFunction;
  }
}
