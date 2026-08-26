import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

describe("parse - Help:Formatting constructs", () => {
  test("bold text", async () => {
    expect(await build("'''bold'''")).toBe("'''bold'''");
  });

  test("italic text", async () => {
    expect(await build("''italic''")).toBe("''italic''");
  });

  test("bold and italic text", async () => {
    expect(await build("'''''bold & italic'''''")).toBe("'''''bold & italic'''''");
  });

  test.each([2, 3, 4, 5, 6])("heading level %i", async (level) => {
    const marker = "=".repeat(level);
    const result = await build(`${marker} Title ${marker}`);
    expect(result).toBe(`${marker}Title${marker}`);
  });

  test("horizontal rule", async () => {
    const result = await build("Text before\n----\nText after");
    expect(result).toContain("----");
  });

  test("bullet list", async () => {
    const result = await build("* one\n* two");
    expect(result).toContain("* one");
    expect(result).toContain("* two");
  });

  test("numbered list", async () => {
    const result = await build("# one\n# two");
    expect(result).toContain("# one");
    expect(result).toContain("# two");
  });

  test("internal link", async () => {
    expect(await build("[[name of page]]")).toBe("[[name of page]]");
  });

  test("internal link with display text", async () => {
    expect(await build("[[name of page|display text]]")).toBe(
      "[[name of page|display text]]"
    );
  });

  test("external link with display text", async () => {
    expect(await build("[http://www.example.com display text]")).toBe(
      "[http://www.example.com display text]"
    );
  });

  test("nowiki escapes markup", async () => {
    const result = await build("<nowiki>no [[wiki]] ''markup''</nowiki>");
    expect(result).toContain("<nowiki>no [[wiki]] ''markup''</nowiki>");
  });

  test("comment", async () => {
    expect(await build("<!-- This is a comment -->")).toBe(
      "<!-- This is a comment -->"
    );
  });

  test("table with header and data rows", async () => {
    const input = ["{|", "! Header 1 !! Header 2", "|-", "| Cell 1 || Cell 2", "|}"].join(
      "\n"
    );
    const result = await build(input);
    expect(result).toContain("{|");
    expect(result).toContain("! Header 1");
    expect(result).toContain("! Header 2");
    expect(result).toContain("| Cell 1");
    expect(result).toContain("| Cell 2");
    expect(result).toContain("|}");
  });

  test("table with class attribute and a cell colspan", async () => {
    const input = [
      '{| class="wikitable"',
      "|+ Caption text",
      "|-",
      '| colspan="2" | Merged cell',
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain('class="wikitable"');
    expect(result).toContain("Caption text");
    expect(result).toContain("Merged cell");
  });

  test("definition list", async () => {
    const result = await build("; Definition\n: item 1\n: item 2");
    expect(result).toContain("; Definition");
    expect(result).toContain(": item 1");
    expect(result).toContain(": item 2");
  });

  test("table of contents magic word", async () => {
    expect(await build("__TOC__")).toBe("__TOC__\n");
  });

  test("redirect", async () => {
    const result = await build("#REDIRECT [[Target page]]");
    expect(result).toBe("#REDIRECT [[Target page]]\n");
  });

  test("internal link to a category", async () => {
    expect(await build("[[:Category:name of category]]")).toBe(
      "[[:Category:name of category]]"
    );
  });

  test("interwiki link", async () => {
    expect(await build("[[w:name of article]]")).toBe("[[w:name of article]]");
  });

  test("mailto external link", async () => {
    expect(await build("[mailto:jane@example.com Jane's email]")).toBe(
      "[mailto:jane@example.com Jane's email]"
    );
  });

  test("thumbnail file image", async () => {
    const result = await build("[[File:Example.jpg|thumb|Caption text]]");
    expect(result).toBe("[[File:Example.jpg|thumb|Caption text]]");
  });

  test("file image with alignment, vertical alignment, and an explicit link= option", async () => {
    const result = await build(
      "[[File:Example.jpg|left|middle|link=Other page]]"
    );
    expect(result).toContain("left");
    expect(result).toContain("link=Other page");
  });

  test("file image with both width and height resizing", async () => {
    const result = await build("[[File:Example.jpg|300x200px]]");
    expect(result).toBe("[[File:Example.jpg|300x200px]]");
  });

  test("four apostrophes render a literal apostrophe plus bold", async () => {
    // Matches MediaWiki's doAllQuotes algorithm: 4 apostrophes = literal `'` + bold toggle.
    expect(await build("''''bold''''")).toBe("''''bold''''");
  });

  test("six apostrophes render bold+italic with one leftover literal apostrophe", async () => {
    expect(await build("''''''both''''''")).toBe("''''''both''''''");
  });

  test("an unterminated comment consumes to the end of input", async () => {
    // The raw comment text has no closing "-->", but MediaWikiComment.build() always
    // re-closes it, so the round-tripped result is well-formed.
    const result = await build("<!-- never closed");
    expect(result).toBe("<!-- never closed -->");
  });

  test("an unterminated triple-brace placeholder consumes to the end of input", async () => {
    const result = await build("{{{unclosed");
    expect(result).toBe("{{{unclosed");
  });

  test("two adjacent links that don't form a valid date are not merged", async () => {
    // "32 Blah" isn't a valid day/month combination, so this stays two separate links.
    const result = await build("[[32 Blah]] [[2024]]");
    expect(result).toBe("[[32 Blah]] [[2024]]");
  });

  test("table with a multi-line cell", async () => {
    const input = ["{|", "|-", "| line one", "line two", "|}"].join("\n");
    const result = await build(input);
    expect(result).toContain("line one");
    expect(result).toContain("line two");
  });

  test("an unterminated table consumes to the end of input", async () => {
    const input = ["{|", "|-", "| a cell"].join("\n");
    const result = await build(input);
    expect(result).toContain("a cell");
  });

  test("a stray pipe outside a template/link renders as literal text", async () => {
    expect(await build("a | b")).toBe("a | b");
  });

  test("a template with a positional (unnamed) parameter", async () => {
    const result = await build("{{Template|first|second}}");
    expect(result).toContain("first");
    expect(result).toContain("second");
  });

  test("a stray unmatched closing tag renders as literal text", async () => {
    expect(await build("</div>")).toBe("</div>");
  });
});
