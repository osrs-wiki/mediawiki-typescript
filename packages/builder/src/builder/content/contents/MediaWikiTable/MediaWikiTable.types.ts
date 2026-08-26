import MediaWikiContent from "../../MediaWikiContent";

export type MediaWikiTableParams = {
  caption?: string;
  captionOptions?: MediaWikiTableCaptionOptions;
  rows: MediaWikiTableRow[];
  options?: MediaWikiTableOptions;
};

export type MediaWikiTableRow = {
  cells: MediaWikiTableCell[];
  header?: boolean;
  minimal?: boolean;
  options?: MediaWikiTableRowOptions;
};

export type MediaWikiTableCell = {
  content: MediaWikiContent[];
  options?: MediaWikiTableCellOptions;
};

export type MediaWikiTableOptions = {
  class?: string;
  style?: string;
};

export type MediaWikiTableRowOptions = {
  class?: string;
  style?: string;
};

export type MediaWikiTableCaptionOptions = {
  class?: string;
  style?: string;
};

export type MediaWikiTableCellOptions = {
  class?: string;
  colspan?: number;
  header?: boolean;
  rowspan?: number;
  /** Accessibility hint for header cells — see Help:Tables#Accessibility of table header cells. */
  scope?: "row" | "col";
  style?: string;
};
