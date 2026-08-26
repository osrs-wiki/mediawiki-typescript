import { MediaWikiParserFunction } from "../MediaWikiParserFunction";

export abstract class ParserFunction {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract build(): MediaWikiParserFunction;
}
