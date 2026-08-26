import { MediaWikiContents } from "../../../../MediaWikiContent.types";

export type ReflistListStyle =
  | "decimal"
  | "lower-alpha"
  | "lower-greek"
  | "lower-roman"
  | "upper-alpha"
  | "upper-roman";

export type ReflistTemplateOptions = {
  /** Fixed number of columns to render the reference list into. */
  columns?: number;
  /** A typographic unit of measurement (e.g. "30em") for the reference list columns. */
  colWidth?: string;
  /** The CSS list-style-type used to enumerate the reference list. */
  listStyle?: ReflistListStyle;
  /** The name of the references group to render (matches inline `<ref group="...">`). */
  group?: string;
  /** Named `<ref name="..." />` definitions to render within the reflist call. */
  refs?: MediaWikiContents;
};
