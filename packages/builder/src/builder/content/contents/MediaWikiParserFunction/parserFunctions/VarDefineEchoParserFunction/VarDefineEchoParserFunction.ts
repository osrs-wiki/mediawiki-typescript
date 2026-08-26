import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiContents } from "../../../../MediaWikiContent.types";
import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#vardefineecho:name|value}}` — sets the value of a variable and also outputs it.
 * From the separate Extension:Variables (common on Fandom/gaming wikis), not core ParserFunctions.
 * @see https://www.mediawiki.org/wiki/Extension:Variables
 */
export class VarDefineEchoParserFunction extends ParserFunction {
  variableName: string;
  value: MediaWikiContents;

  constructor(variableName: string, value: MediaWikiContents) {
    super("#vardefineecho");
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
