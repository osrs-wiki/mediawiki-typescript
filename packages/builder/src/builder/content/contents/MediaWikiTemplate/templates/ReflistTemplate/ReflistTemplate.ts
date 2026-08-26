import { ReflistTemplateOptions } from "./ReflistTemplate.types";
import { buildContents } from "../../../../MediaWikiContent.utils";
import { MediaWikiTemplate } from "../../MediaWikiTemplate";
import { Template } from "../Template";

/**
 * Renders a `{{Reflist}}` template, which wraps `<references/>` to display the list of
 * footnotes defined by `<ref>` tags, with support for columns, groups, and named refs.
 * @see https://www.mediawiki.org/wiki/Template:Reflist
 */
export class ReflistTemplate extends Template {
  columns?: number;
  colWidth?: string;
  listStyle?: ReflistTemplateOptions["listStyle"];
  group?: string;
  refs?: ReflistTemplateOptions["refs"];

  constructor(options?: ReflistTemplateOptions) {
    super("Reflist");
    this.columns = options?.columns;
    this.colWidth = options?.colWidth;
    this.listStyle = options?.listStyle;
    this.group = options?.group;
    this.refs = options?.refs;
  }

  build() {
    const reflistTemplate = new MediaWikiTemplate(this.name);
    if (this.columns) {
      reflistTemplate.add("", this.columns.toString());
    }
    if (this.colWidth) {
      reflistTemplate.add("colwidth", this.colWidth);
    }
    if (this.listStyle) {
      reflistTemplate.add("liststyle", this.listStyle);
    }
    if (this.group) {
      reflistTemplate.add("group", this.group);
    }
    if (this.refs) {
      reflistTemplate.add("refs", buildContents(this.refs));
    }
    return reflistTemplate;
  }
}
