import MediaWikiContent from "../../MediaWikiContent";

/**
 * Renders a parser function or magic-word-style call, e.g. `{{#if:test|then|else}}` or `{{lc:AbC}}`.
 * @see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions
 */
export class MediaWikiParserFunction extends MediaWikiContent {
  name: string;
  params: string[];

  constructor(name: string) {
    super();
    this.name = name;
    this.params = [];
  }

  add(value: string) {
    this.params.push(value);
  }

  build() {
    const params = this.params.length ? `:${this.params.join("|")}` : "";
    return `{{${this.name}${params}}}\n`;
  }
}
