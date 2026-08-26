import { MediaWikiListItemOptions } from "./MediaWikiListItem.types";
import MediaWikiContent from "../../MediaWikiContent";
import { MediaWikiContents } from "../../MediaWikiContent.types";

export class MediaWikiListItem extends MediaWikiContent {
  options: MediaWikiListItemOptions;

  constructor(value: MediaWikiContents, options: MediaWikiListItemOptions) {
    super(value);
    this.options = options;
  }

  build() {
    const parsedValue = this.buildChildren();
    const marker = this.options.definitionType
      ? this.options.definitionType === "term"
        ? ";"
        : ":"
      : this.options.ordered
        ? "#"
        : "*";
    return `\n${marker.repeat(this.options.level)} ${parsedValue.trim()}`;
  }
}
