import { Piece } from "./Piece";
import { MediaWikiContent, MediaWikiText } from "@mediawiki-typescript/builder";

const mergeTextRuns = (pieces: Piece[]): MediaWikiContent[] => {
  const out: MediaWikiContent[] = [];
  let textBuffer = "";
  const flushText = () => {
    if (textBuffer.length > 0) {
      out.push(new MediaWikiText(textBuffer));
      textBuffer = "";
    }
  };
  for (const piece of pieces) {
    if (piece.kind === "text") {
      textBuffer += piece.value;
    } else if (piece.kind === "content") {
      flushText();
      out.push(piece.value);
    }
  }
  flushText();
  return out;
};

/**
 * Resolves a flat sequence of inline pieces (including raw apostrophe-run "quote" markers) into
 * builder `MediaWikiContent` nodes, applying a simplified version of MediaWiki's `doAllQuotes`
 * apostrophe-counting algorithm for bold/italic (see Manual:Parser) — 2 apostrophes toggles italic,
 * 3 toggles bold, 4 is a literal apostrophe plus a bold toggle, and 5+ toggles both (with any extra
 * apostrophes beyond 5 rendered as literal text). This is an approximation, not the exact PHP
 * algorithm (which also considers the total count of unbalanced runs across the whole line).
 */
export const resolveQuotes = (pieces: Piece[]): MediaWikiContent[] => {
  const result: MediaWikiContent[] = [];
  let bold = false;
  let italics = false;
  let buffer: Piece[] = [];

  const flush = () => {
    if (buffer.length === 0) {
      return;
    }
    const built = mergeTextRuns(buffer);
    buffer = [];
    if (built.length === 0) {
      return;
    }
    if (!bold && !italics) {
      result.push(...built);
    } else {
      result.push(new MediaWikiText(built.length === 1 ? built[0] : built, { bold, italics }));
    }
  };

  for (const piece of pieces) {
    if (piece.kind !== "quote") {
      buffer.push(piece);
      continue;
    }
    flush();
    const count = piece.count;
    if (count === 2) {
      italics = !italics;
    } else if (count === 3) {
      bold = !bold;
    } else if (count === 4) {
      result.push(new MediaWikiText("'"));
      bold = !bold;
    } else if (count >= 5) {
      bold = !bold;
      italics = !italics;
      const leftover = count - 5;
      if (leftover > 0) {
        result.push(new MediaWikiText("'".repeat(leftover)));
      }
    }
  }
  flush();

  return result;
};

/**
 * Builds a segment's pieces down to a single wikitext string, for use as a template/parser-function
 * param. Each content's own trailing newline (content classes like `MediaWikiTemplate`/
 * `MediaWikiParserFunction` always append one for standalone top-level use) is stripped before
 * joining, so a nested call doesn't leave a stray newline embedded mid-string when more text follows.
 *
 * Deliberately does NOT trim the result: a positional template/parser-function parameter's leading
 * and trailing whitespace is semantically significant in real MediaWiki (only named parameters'
 * whitespace is stripped) — callers should trim explicitly where the segment is known to be an
 * identifier (a template name, a link target, etc.) rather than arbitrary param/label content.
 */
export const segmentToString = (pieces: Piece[]): string =>
  resolveQuotes(pieces)
    .map((content) => content.build().replace(/\n+$/, ""))
    .join("");
