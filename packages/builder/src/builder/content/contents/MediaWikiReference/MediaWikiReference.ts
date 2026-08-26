import { MediaWikiReferenceOptions } from "./MediaWikiReference.types";
import MediaWikiContent from "../../MediaWikiContent";
import { MediaWikiContents } from "../../MediaWikiContent.types";

/**
 * Renders a `<ref>...</ref>` footnote, or a self-closing `<ref name="..." />` reuse of a
 * previously-defined one (no `children` given).
 * @see https://www.mediawiki.org/wiki/Extension:Cite
 */
export class MediaWikiReference extends MediaWikiContent {
  options?: MediaWikiReferenceOptions;

  constructor(children?: MediaWikiContents, options?: MediaWikiReferenceOptions) {
    super(children);
    this.options = options;
  }

  build() {
    const { name, group } = this.options ?? {};
    const attributes = `${name ? ` name="${name}"` : ""}${group ? ` group="${group}"` : ""}`;
    if (this.children === undefined) {
      return `<ref${attributes} />`;
    }
    return `<ref${attributes}>${this.buildChildren()}</ref>`;
  }
}
