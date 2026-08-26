export type HeadingBlock = { type: "heading"; level: number; content: string };
export type ListBlock = { type: "list"; marker: string; content: string };
export type HorizontalRuleBlock = { type: "hr" };
export type ParagraphBlock = { type: "paragraph"; content: string };
export type TableBlock = { type: "table"; content: string };
export type GalleryBlock = { type: "gallery"; content: string };
export type TocBlock = { type: "toc" };
export type RedirectBlock = { type: "redirect"; target: string };
export type HiddenCategoryBlock = { type: "hiddencat" };

/** Simple `__WORD__`-style Help:Magic_words#Behavior_switches, beyond `__TOC__`/`__HIDDENCAT__` above. */
export const BEHAVIOR_SWITCH_WORDS = [
  "NOTOC",
  "FORCETOC",
  "NOEDITSECTION",
  "NOGALLERY",
  "STATICREDIRECT",
  "INDEX",
  "NOINDEX",
] as const;
export type BehaviorSwitchWord = (typeof BEHAVIOR_SWITCH_WORDS)[number];
export type BehaviorSwitchBlock = { type: "behaviorswitch"; word: BehaviorSwitchWord };

export type Block =
  | HeadingBlock
  | ListBlock
  | HorizontalRuleBlock
  | ParagraphBlock
  | TableBlock
  | GalleryBlock
  | TocBlock
  | RedirectBlock
  | HiddenCategoryBlock
  | BehaviorSwitchBlock;

const HEADING_PATTERN = /^ {0,3}(={1,6})(.*?)\1\s*$/;
const HORIZONTAL_RULE_PATTERN = /^-{4,}\s*$/;
const LIST_PATTERN = /^ {0,3}([*#;:]+)(.*)$/;
const TABLE_START_PATTERN = /^ {0,3}\{\|/;
const TABLE_END_PATTERN = /^ {0,3}\|\}/;
const GALLERY_START_PATTERN = /^ {0,3}<gallery(\s[^>]*)?>/i;
const GALLERY_END_PATTERN = /<\/gallery>\s*$/i;
const TOC_PATTERN = /^__TOC__$/;
const HIDDEN_CATEGORY_PATTERN = /^__HIDDENCAT__$/;
const BEHAVIOR_SWITCH_PATTERN = new RegExp(`^__(${BEHAVIOR_SWITCH_WORDS.join("|")})__$`);
const REDIRECT_PATTERN = /^#REDIRECT\s*\[\[([^\]]+)\]\]/i;

/**
 * Splits raw wikitext into block-level constructs (headings, lists, horizontal rules, paragraphs)
 * based on the leading characters of each physical line, mirroring MediaWiki's line-based block
 * passes (`doHeadings`, list handling, `doTableStuff`'s sibling `doBlockLevels`) — see Manual:Parser.
 *
 * Tracks `{{`/`}}` brace depth across lines so that a multi-line template invocation (e.g. a
 * `|param = ...` value spanning several lines, some of which start with `*`) isn't mis-split by
 * the line-based block markers below — those only apply once brace depth returns to zero.
 *
 * Known limitation: since this operates on raw physical lines (not the preprocessor-expanded text)
 * using a naive brace count, edge cases like literal unbalanced braces inside `<nowiki>` are still
 * an accepted "best-effort" simplification, not a lossless implementation.
 */
export const splitBlocks = (text: string): Block[] => {
  const blocks: Block[] = [];
  const lines = text.split(/\r\n|\r|\n/);
  let paragraphLines: string[] = [];
  let braceDepth = 0;

  const applyBraceDelta = (s: string) => {
    let delta = 0;
    for (const ch of s) {
      if (ch === "{") delta += 1;
      else if (ch === "}") delta -= 1;
    }
    braceDepth = Math.max(0, braceDepth + delta);
  };

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

    if (braceDepth > 0) {
      paragraphLines.push(line);
      applyBraceDelta(line);
      continue;
    }

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
      applyBraceDelta(tableLines.join("\n"));
      i = end;
      continue;
    }

    // Blank lines are valid inside a gallery body (Help:Images#Gallery_syntax), so this needs its
    // own multi-line block — unlike other opaque tags, gallery content must survive blank-line paragraph splitting.
    if (GALLERY_START_PATTERN.test(line)) {
      flushParagraph();
      const galleryLines = [line];
      let end = i;
      while (end < lines.length && !GALLERY_END_PATTERN.test(lines[end])) {
        end += 1;
        if (end < lines.length) {
          galleryLines.push(lines[end]);
        }
      }
      blocks.push({ type: "gallery", content: galleryLines.join("\n") });
      applyBraceDelta(galleryLines.join("\n"));
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

    const behaviorSwitchMatch = BEHAVIOR_SWITCH_PATTERN.exec(line.trim());
    if (behaviorSwitchMatch) {
      flushParagraph();
      blocks.push({ type: "behaviorswitch", word: behaviorSwitchMatch[1] as BehaviorSwitchWord });
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
      applyBraceDelta(line);
      continue;
    }

    paragraphLines.push(line);
    applyBraceDelta(line);
  }
  flushParagraph();

  return blocks;
};
