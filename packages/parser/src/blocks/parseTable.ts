import { splitAttributesAndContent, splitTopLevel } from "./splitTopLevel";

export type ParsedTableCell = {
  attributes?: string;
  header: boolean;
  content: string;
};

export type ParsedTableRow = {
  attributes?: string;
  cells: ParsedTableCell[];
};

export type ParsedTable = {
  attributes?: string;
  caption?: string;
  captionAttributes?: string;
  rows: ParsedTableRow[];
};

/**
 * Parses `{| ... |}` wikitext table markup into a structured intermediate form, mirroring
 * MediaWiki's own `doTableStuff` — described in Manual:Parser as "a simple line-based parser".
 *
 * Known limitation: nested tables (a `{|`/`|}` inside a cell) are not supported in this pass.
 */
export const parseTableBlock = (raw: string): ParsedTable => {
  const lines = raw.split(/\r\n|\r|\n/).map((line) => line.trim());

  const firstLine = lines[0] ?? "";
  const attributes = firstLine.slice(2).trim() || undefined;

  const table: ParsedTable = { attributes, rows: [] };
  let currentRow: ParsedTableRow | undefined;
  let currentCell: ParsedTableCell | undefined;
  // True right after a cell is started by a bare marker with nothing else on that line (e.g. a
  // lone "|"), so the *next* line is the "attrs | content" line rather than a plain continuation.
  let cellAwaitingFirstLine = false;

  const flushRow = () => {
    if (currentRow) {
      table.rows.push(currentRow);
    }
    currentRow = undefined;
    currentCell = undefined;
    cellAwaitingFirstLine = false;
  };

  const addCells = (line: string, marker: "!" | "|", header: boolean) => {
    if (!currentRow) {
      currentRow = { cells: [] };
    }
    const sameLineSeparator = marker === "!" ? "!!" : "||";
    const segments = splitTopLevel(line.slice(1), sameLineSeparator);
    segments.forEach((segment) => {
      const { attributes: cellAttributes, content } = splitAttributesAndContent(segment);
      currentCell = { attributes: cellAttributes, header, content };
      currentRow?.cells.push(currentCell);
      cellAwaitingFirstLine = !cellAttributes && content === "";
    });
  };

  for (const line of lines.slice(1, /^\|\}/.test(lines[lines.length - 1] ?? "") ? -1 : undefined)) {
    if (line.startsWith("|+")) {
      const { attributes: captionAttributes, content } = splitAttributesAndContent(
        line.slice(2)
      );
      table.caption = content;
      table.captionAttributes = captionAttributes;
      cellAwaitingFirstLine = false;
      continue;
    }
    if (line.startsWith("|-")) {
      flushRow();
      currentRow = { attributes: line.slice(2).trim() || undefined, cells: [] };
      continue;
    }
    if (line.startsWith("!")) {
      addCells(line, "!", true);
      continue;
    }
    if (line.startsWith("|")) {
      addCells(line, "|", false);
      continue;
    }
    if (currentCell) {
      if (cellAwaitingFirstLine) {
        // The marker line was bare (e.g. a lone "|"); this line is that cell's "attrs | content".
        const { attributes: cellAttributes, content } = splitAttributesAndContent(line);
        currentCell.attributes = cellAttributes;
        currentCell.content = content;
        cellAwaitingFirstLine = false;
      } else {
        currentCell.content = `${currentCell.content}\n${line}`;
      }
    }
  }
  flushRow();

  return table;
};
