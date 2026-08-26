import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#var:name}}` — reads the current value of a variable.
 * From the separate Extension:Variables (common on Fandom/gaming wikis), not core ParserFunctions.
 * @see https://www.mediawiki.org/wiki/Extension:Variables
 */
export class VarParserFunction extends ParserFunction {
  variableName: string;

  constructor(variableName: string) {
    super("#var");
    this.variableName = variableName;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.variableName);
    return parserFunction;
  }
}
