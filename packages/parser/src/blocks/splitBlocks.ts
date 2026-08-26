export type HeadingBlock = { type: "heading"; level: number; content: string };
export type ListBlock = { type: "list"; marker: string; content: string };
export type HorizontalRuleBlock = { type: "hr" };
export type ParagraphBlock = { type: "paragraph"; content: string };
export type TableBlock = { type: "table"; content: string };
export type TocBlock = { type: "toc" };
export type RedirectBlock = { type: "redirect"; target: string };
export type HiddenCategoryBlock = { type: "hiddencat" };

export type Block =
  | HeadingBlock
  | ListBlock
  | HorizontalRuleBlock
  | ParagraphBlock
  | TableBlock
  | TocBlock
  | RedirectBlock
  | HiddenCategoryBlock;

const HEADING_PATTERN = /^ {0,3}(={1,6})(.*?)\1\s*$/;
const HORIZONTAL_RULE_PATTERN = /^-{4,}\s*$/;
const LIST_PATTERN = /^ {0,3}([*#;:]+)(.*)$/;
const TABLE_START_PATTERN = /^ {0,3}\{\|/;
const TABLE_END_PATTERN = /^ {0,3}\|\}/;
const TOC_PATTERN = /^__TOC__$/;
const HIDDEN_CATEGORY_PATTERN = /^__HIDDENCAT__$/;
const REDIRECT_PATTERN = /^#REDIRECT\s*\[\[([^\]]+)\]\]/i;

/**
 * Splits raw wikitext into block-level constructs (headings, lists, horizontal rules, paragraphs)
 * based on the leading characters of each physical line, mirroring MediaWiki's line-based block
 * passes (`doHeadings`, list handling, `doTableStuff`'s sibling `doBlockLevels`) — see Manual:Parser.
 *
 * Known limitation: since this operates on raw physical lines (not the preprocessor-expanded text),
 * a multi-line template/tag call whose inner lines happen to start with block markers (e.g. `*`)
 * may be mis-split. This is an accepted "best-effort" simplification, not a lossless implementation.
 */
export const splitBlocks = (text: string): Block[] => {
  const blocks: Block[] = [];
  const lines = text.split(/\r\n|\r|\n/);
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      const content = paragraphLines.join("\n").trim();
      if (content.length > 0) {
        blocks.push({ type: "paragraph", content });
      }
      paragraphLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === "") {
      flushParagraph();
      continue;
    }

    if (TABLE_START_PATTERN.test(line)) {
      flushParagraph();
      const tableLines = [line];
      let end = i + 1;
      while (end < lines.length && !TABLE_END_PATTERN.test(lines[end])) {
        tableLines.push(lines[end]);
        end += 1;
      }
      if (end < lines.length) {
        tableLines.push(lines[end]);
      }
      blocks.push({ type: "table", content: tableLines.join("\n") });
      i = end;
      continue;
    }

    if (TOC_PATTERN.test(line.trim())) {
      flushParagraph();
      blocks.push({ type: "toc" });
      continue;
    }

    if (HIDDEN_CATEGORY_PATTERN.test(line.trim())) {
      flushParagraph();
      blocks.push({ type: "hiddencat" });
      continue;
    }

    const redirectMatch = REDIRECT_PATTERN.exec(line.trim());
    if (redirectMatch) {
      flushParagraph();
      blocks.push({ type: "redirect", target: redirectMatch[1].trim() });
      continue;
    }

    const headingMatch = HEADING_PATTERN.exec(line);
    if (headingMatch) {
      flushParagraph();
      blocks.push({ type: "heading", level: headingMatch[1].length, content: headingMatch[2].trim() });
      continue;
    }

    if (HORIZONTAL_RULE_PATTERN.test(line)) {
      flushParagraph();
      blocks.push({ type: "hr" });
      continue;
    }

    const listMatch = LIST_PATTERN.exec(line);
    if (listMatch) {
      flushParagraph();
      blocks.push({ type: "list", marker: listMatch[1], content: listMatch[2].trim() });
      continue;
    }

    paragraphLines.push(line);
  }
  flushParagraph();

  return blocks;
};
