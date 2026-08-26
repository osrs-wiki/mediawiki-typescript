import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#vardefine:name|value}}` — sets the value of a variable (renders as empty output).
 * From the separate Extension:Variables (common on Fandom/gaming wikis), not core ParserFunctions.
 * @see https://www.mediawiki.org/wiki/Extension:Variables
 */
export class VarDefineParserFunction extends ParserFunction {
  variableName: string;
  value: MediaWikiContents;

  constructor(variableName: string, value: MediaWikiContents) {
    super("#vardefine");
    this.variableName = variableName;
    this.value = value;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.variableName);
    parserFunction.add(buildContents(this.value));
    return parserFunction;
  }
}
