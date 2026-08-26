import {
  MediaWikiTableOptions,
  MediaWikiTableRow,
  MediaWikiTableParams,
  MediaWikiTableRowOptions,
  MediaWikiTableCellOptions,
  MediaWikiTableCaptionOptions,
} from "./MediaWikiTable.types";
import { toKeyValueString } from "../../../../utils/objects";
import MediaWikiContent from "../../MediaWikiContent";

export class MediaWikiTable extends MediaWikiContent {
  caption?: string;
  captionOptions?: MediaWikiTableCaptionOptions;
  options?: MediaWikiTableOptions;
  rows: MediaWikiTableRow[];

  constructor(params: MediaWikiTableParams) {
    super();
    this.caption = params.caption;
    this.captionOptions = params.captionOptions;
    this.rows = params.rows;
    this.options = params.options;
  }

  build() {
    const tableOptions = this.options
      ? " " + toKeyValueString<MediaWikiTableOptions>(this.options)
      : "";
    const caption = this.caption
      ? this.captionOptions
        ? `|+ ${toKeyValueString<MediaWikiTableCaptionOptions>(
            this.captionOptions
          )} | ${this.caption}\n`
        : `|+${this.caption}\n`
      : "";
    return `{|${tableOptions}\n${caption}${this.rows
      .map(
        (row) =>
          `|-${
            row.options
              ? " " + toKeyValueString<MediaWikiTableRowOptions>(row.options)
              : ""
          }\n` +
          row.cells
            .map((cell, cellIndex) => {
              // Filter out 'header' from cell options for toKeyValueString
              const cellOptionsForOutput = cell.options
                ? Object.fromEntries(
                    Object.entries(cell.options).filter(
                      ([key]) => key !== "header"
                    )
                  )
                : undefined;
              const hasOptionsForOutput =
                cellOptionsForOutput &&
                Object.keys(cellOptionsForOutput).length > 0;

              return (
                (row.header || cell.options?.header ? `!` : `|`).repeat(
                  row.minimal && cellIndex > 0 ? 2 : 1
                ) +
                " " +
                (hasOptionsForOutput
                  ? `${toKeyValueString<MediaWikiTableCellOptions>(
                      cellOptionsForOutput as MediaWikiTableCellOptions
                    )} | `
                  : "") +
                cell.content.map((content) => content.build()).join("") +
                (row.minimal ? "" : "\n")
              );
            })
            .join(row.minimal ? " " : "") +
          (row.minimal ? "\n" : "")
      )
      .join("")}|}`;
  }
}
