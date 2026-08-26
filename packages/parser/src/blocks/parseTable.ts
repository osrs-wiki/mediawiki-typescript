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
      const rest = line.slice(2).trim();
      if (rest.startsWith("{{")) {
        // A "|-{{...}}" marker immediately followed by a template/parser-function call (e.g. a
        // conditional {{#switch}} producing a row) rather than genuine HTML row attributes —
        // preserve it as the row's own cell content instead of discarding it as "attributes".
        currentRow = { cells: [] };
        currentCell = { header: false, content: rest };
        currentRow.cells.push(currentCell);
      } else {
        currentRow = { attributes: rest || undefined, cells: [] };
      }
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
    } else {
      // No active cell (e.g. a bare template call relying on its own transclusion to emit the
      // "|-"/"|" row and cell markup, which this pass doesn't expand) — preserve it as its own
      // cell rather than silently dropping the content.
      if (!currentRow) {
        currentRow = { cells: [] };
      }
      currentCell = { header: false, content: line };
      currentRow.cells.push(currentCell);
    }
  }
  flushRow();

  return table;
};
