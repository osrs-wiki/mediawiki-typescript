import { Block, parseTableBlock, ParsedTableCell, ParsedTableRow, splitBlocks } from "./blocks";
import { resolveInput, WikitextInput } from "./input";
import { WikitextLexer } from "./lexer";
import { wikitextParser } from "./parser";
import { parseAttributes } from "./attributes";
import { mergeDates, resolveQuotes, WikitextToBuilderVisitor, Piece } from "./visitor";
import {
  MediaWikiContent,
  MediaWikiHeader,
  MediaWikiListItem,
  MediaWikiRedirect,
  MediaWikiSeparator,
  MediaWikiTable,
  MediaWikiTableCellOptions,
  MediaWikiTableRow,
  MediaWikiTableRowOptions,
  MediaWikiTableOptions,
  MediaWikiText,
  MediaWikiTOC,
} from "@mediawiki-typescript/builder";

const visitor = new WikitextToBuilderVisitor();

/** Parses a single block's inline content (bold/italic, links, templates, tags, etc.) into builder content. */
const parseInlineText = (text: string): MediaWikiContent[] => {
  const lexResult = WikitextLexer.tokenize(text);
  wikitextParser.input = lexResult.tokens;
  const cst = wikitextParser.content();
  if (wikitextParser.errors.length > 0) {
    throw new Error(
      `Failed to parse wikitext: ${wikitextParser.errors.map((error) => error.message).join("; ")}`
    );
  }
  const pieces = visitor.visit(cst) as Piece[];
  return mergeDates(resolveQuotes(pieces));
};

/** Converts a raw table/row/cell attribute fragment into `{class?, style?}`. */
const toTableOptions = (raw?: string): MediaWikiTableOptions | MediaWikiTableRowOptions | undefined => {
  const attributes = raw ? parseAttributes(raw) : undefined;
  if (!attributes) {
    return undefined;
  }
  const { class: className, style } = attributes;
  return className || style ? { class: className, style } : undefined;
};

const toCellOptions = (
  cell: ParsedTableCell
): MediaWikiTableCellOptions | undefined => {
  const attributes = cell.attributes ? parseAttributes(cell.attributes) : undefined;
  const options: MediaWikiTableCellOptions = {};
  if (attributes?.class) options.class = attributes.class;
  if (attributes?.style) options.style = attributes.style;
  if (attributes?.colspan) options.colspan = Number(attributes.colspan);
  if (attributes?.rowspan) options.rowspan = Number(attributes.rowspan);
  if (cell.header) options.header = true;
  return Object.keys(options).length > 0 ? options : undefined;
};

const toTableRow = (row: ParsedTableRow): MediaWikiTableRow => ({
  cells: row.cells.map((cell) => ({
    content: parseInlineText(cell.content),
    options: toCellOptions(cell),
  })),
  header: row.cells.length > 0 && row.cells.every((cell) => cell.header),
  options: toTableOptions(row.attributes),
});

const blockToContent = (block: Block): MediaWikiContent[] => {
  switch (block.type) {
    case "heading":
      return [new MediaWikiHeader(parseInlineText(block.content), block.level)];
    case "hr":
      return [new MediaWikiSeparator()];
    case "toc":
      return [new MediaWikiTOC()];
    case "redirect":
      return [new MediaWikiRedirect(block.target)];
    case "list": {
      const lastMarker = block.marker[block.marker.length - 1];
      const definitionType =
        lastMarker === ";" ? "term" : lastMarker === ":" ? "definition" : undefined;
      return [
        new MediaWikiListItem(parseInlineText(block.content), {
          level: block.marker.length,
          ordered: lastMarker === "#",
          definitionType,
        }),
      ];
    }
    case "table": {
      const table = parseTableBlock(block.content);
      return [
        new MediaWikiTable({
          caption: table.caption,
          options: toTableOptions(table.attributes),
          rows: table.rows.map(toTableRow),
        }),
      ];
    }
    case "paragraph":
      return parseInlineText(block.content);
  }
};


/**
 * Parses raw wikitext (string, file, stream, or URL) into `@mediawiki-typescript/builder`
 * `MediaWikiContents`, ready to be re-built, inspected, or transformed programmatically.
 *
 * Fidelity goal is best-effort semantic equivalence, not a byte-for-byte lossless round-trip —
 * see docs/plans/builder-parser/plan.md for known gaps and simplifications.
 */
export const parse = async (input: WikitextInput): Promise<MediaWikiContent[]> => {
  const text = await resolveInput(input);
  const blocks = splitBlocks(text);
  const content: MediaWikiContent[] = [];
  blocks.forEach((block, index) => {
    content.push(...blockToContent(block));
    if (index < blocks.length - 1) {
      content.push(new MediaWikiText("\n"));
    }
  });
  return content;
};

export * from "./blocks";
export * from "./input";
export * from "./lexer";
export * from "./parser";
export * from "./visitor";
