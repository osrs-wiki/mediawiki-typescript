import { MediaWikiParserFunction } from "../../MediaWikiParserFunction";
import { ParserFunction } from "../ParserFunction";

/**
 * Renders `{{#rel2abs:path|basePath}}` — converts a relative file path into an absolute path.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions##rel2abs
 */
export class RelToAbsParserFunction extends ParserFunction {
  path: string;
  basePath?: string;

  constructor(path: string, basePath?: string) {
    super("#rel2abs");
    this.path = path;
    this.basePath = basePath;
  }

  build() {
    const parserFunction = new MediaWikiParserFunction(this.name);
    parserFunction.add(this.path);
    if (this.basePath !== undefined) {
      parserFunction.add(this.basePath);
    }
    return parserFunction;
  }
}
