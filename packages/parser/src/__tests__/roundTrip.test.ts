import { parse } from "../index";
import {
  MediaWikiBreak,
  MediaWikiCategory,
  MediaWikiComment,
  MediaWikiDate,
  MediaWikiDefaultSort,
  MediaWikiExternalLink,
  MediaWikiFile,
  MediaWikiForceTOC,
  MediaWikiGallery,
  MediaWikiHeader,
  MediaWikiHiddenCategory,
  MediaWikiHTML,
  MediaWikiIncludeOnly,
  MediaWikiIndex,
  MediaWikiLink,
  MediaWikiListItem,
  MediaWikiNoEditSection,
  MediaWikiNoGallery,
  MediaWikiNoInclude,
  MediaWikiNoIndex,
  MediaWikiNoTOC,
  MediaWikiOnlyInclude,
  MediaWikiParserFunction,
  MediaWikiRedirect,
  MediaWikiReference,
  MediaWikiSeparator,
  MediaWikiStaticRedirect,
  MediaWikiTable,
  MediaWikiTemplate,
  MediaWikiText,
  MediaWikiTOC,
} from "@mediawiki-typescript/builder";

/**
 * `parse(new MediaWikiX(...).build())` should produce an object matching the original for every
 * existing builder content type — see docs/plans/builder-parser/plan.md for the two documented
 * exceptions (`MediaWikiBreak`, whose `"\n"` output is indistinguishable from ordinary whitespace,
 * and `MediaWikiText.styling.underline`, which round-trips to an equivalent `MediaWikiHTML` node
 * instead of the exact original type since `<u>` is also valid generic HTML).
 *
 * For content types whose `children` field accepts a raw string (`MediaWikiHeader`,
 * `MediaWikiListItem`, `MediaWikiText`) or that carry table cell/row defaults, the parser always
 * reconstructs an equally-valid but not byte-identical object graph (e.g. a wrapped
 * `[MediaWikiText(...)]` instead of a raw string, or explicit `false`/`undefined` defaults) — for
 * those, this test asserts `.build()` output equality instead of deep object equality, matching
 * the project's "best-effort semantic equivalence" goal rather than a lossless round trip.
 */
describe("parse - round trip of existing builder content types", () => {
  const expectSameBuild = async (content: { build(): string }) => {
    const result = await parse(content.build());
    expect(result.map((c) => c.build()).join("")).toBe(content.build());
  };

  test("MediaWikiHeader", async () => {
    await expectSameBuild(new MediaWikiHeader("Title", 2));
  });

  test("MediaWikiSeparator", async () => {
    const result = await parse(new MediaWikiSeparator().build());
    expect(result).toEqual([new MediaWikiSeparator()]);
  });

  test("MediaWikiComment", async () => {
    const result = await parse(new MediaWikiComment("a comment").build());
    expect(result).toEqual([new MediaWikiComment("a comment")]);
  });

  test("MediaWikiTOC", async () => {
    const result = await parse(new MediaWikiTOC().build());
    expect(result).toEqual([new MediaWikiTOC()]);
  });

  test("MediaWikiRedirect", async () => {
    const result = await parse(new MediaWikiRedirect("Target page").build());
    expect(result).toEqual([new MediaWikiRedirect("Target page")]);
  });

  test("MediaWikiCategory", async () => {
    const result = await parse(new MediaWikiCategory("Help").build());
    expect(result).toEqual([new MediaWikiCategory("Help")]);
  });

  test("MediaWikiCategory (with sort key)", async () => {
    const result = await parse(new MediaWikiCategory("Help", "Sort").build());
    expect(result).toEqual([new MediaWikiCategory("Help", "Sort")]);
  });

  test("MediaWikiHiddenCategory", async () => {
    const result = await parse(new MediaWikiHiddenCategory().build());
    expect(result).toEqual([new MediaWikiHiddenCategory()]);
  });

  test("MediaWikiLink (no label)", async () => {
    const result = await parse(new MediaWikiLink("Some Page").build());
    expect(result).toEqual([new MediaWikiLink("Some Page")]);
  });

  test("MediaWikiLink (with label)", async () => {
    const result = await parse(new MediaWikiLink("Some Page", "display text").build());
    expect(result).toEqual([new MediaWikiLink("Some Page", "display text")]);
  });

  test("MediaWikiExternalLink", async () => {
    const result = await parse(
      new MediaWikiExternalLink("display text", "http://example.com").build()
    );
    expect(result).toEqual([new MediaWikiExternalLink("display text", "http://example.com")]);
  });

  test("MediaWikiExternalLink (no label)", async () => {
    const result = await parse(new MediaWikiExternalLink("", "http://example.com").build());
    expect(result).toEqual([new MediaWikiExternalLink("", "http://example.com")]);
  });

  test("MediaWikiFile", async () => {
    const input = new MediaWikiFile("Example.png", {
      format: "thumb",
      resizing: { width: 300 },
      horizontalAlignment: "left",
      caption: "A caption",
    });
    const result = await parse(input.build());
    expect(result).toEqual([input]);
  });

  test("MediaWikiText (bold)", async () => {
    await expectSameBuild(new MediaWikiText("bold text", { bold: true }));
  });

  test("MediaWikiText (italics)", async () => {
    await expectSameBuild(new MediaWikiText("italic text", { italics: true }));
  });

  test("MediaWikiListItem (unordered)", async () => {
    await expectSameBuild(new MediaWikiListItem("item", { level: 1 }));
  });

  test("MediaWikiListItem (ordered)", async () => {
    await expectSameBuild(new MediaWikiListItem("item", { level: 1, ordered: true }));
  });

  test("MediaWikiListItem (definition term)", async () => {
    await expectSameBuild(
      new MediaWikiListItem("Term", { level: 1, definitionType: "term" })
    );
  });

  test("MediaWikiListItem (definition)", async () => {
    await expectSameBuild(
      new MediaWikiListItem("Definition", { level: 1, definitionType: "definition" })
    );
  });

  test("MediaWikiDate", async () => {
    const date = new Date(2026, 7, 25);
    const result = await parse(new MediaWikiDate(date).build());
    expect(result).toEqual([new MediaWikiDate(date)]);
  });

  test("MediaWikiTemplate", async () => {
    const template = new MediaWikiTemplate("Infobox");
    template.add("name", "Test");
    const result = await parse(template.build());
    expect(result).toEqual([template]);
  });

  test("MediaWikiTemplate (subst)", async () => {
    const template = new MediaWikiTemplate("Welcome", { subst: true });
    const result = await parse(template.build());
    expect(result).toEqual([template]);
  });

  test("MediaWikiNoInclude", async () => {
    const noInclude = new MediaWikiNoInclude([new MediaWikiText("hidden")]);
    const result = await parse(noInclude.build());
    expect(result).toEqual([noInclude]);
  });

  test("MediaWikiIncludeOnly", async () => {
    const includeOnly = new MediaWikiIncludeOnly([new MediaWikiText("shown")]);
    const result = await parse(includeOnly.build());
    expect(result).toEqual([includeOnly]);
  });

  test("MediaWikiOnlyInclude", async () => {
    const onlyInclude = new MediaWikiOnlyInclude([new MediaWikiText("shown")]);
    const result = await parse(onlyInclude.build());
    expect(result).toEqual([onlyInclude]);
  });

  test("MediaWikiParserFunction", async () => {
    const parserFunction = new MediaWikiParserFunction("#if");
    parserFunction.add("test");
    parserFunction.add("yes");
    const result = await parse(parserFunction.build());
    expect(result).toEqual([parserFunction]);
  });

  test("MediaWikiHTML (self-closing)", async () => {
    const result = await parse(new MediaWikiHTML("br").build());
    expect(result).toEqual([new MediaWikiHTML("br")]);
  });

  test("MediaWikiHTML (with children, collapsed)", async () => {
    const html = new MediaWikiHTML("span", [new MediaWikiText("hi")], undefined, {
      collapsed: true,
    });
    await expectSameBuild(html);
  });

  test("MediaWikiTable", async () => {
    const table = new MediaWikiTable({
      caption: "A caption",
      rows: [
        {
          header: true,
          cells: [{ content: [new MediaWikiText("Header 1")] }],
        },
        {
          cells: [{ content: [new MediaWikiText("Cell 1")] }],
        },
      ],
    });
    await expectSameBuild(table);
  });

  test("MediaWikiBreak (documented limitation: not round-trippable)", async () => {
    // MediaWikiBreak.build() is a bare "\n", indistinguishable from ordinary whitespace once
    // parsed back — real MediaWiki itself requires <br/> for a manual line break (Help:Formatting).
    const result = await parse(new MediaWikiBreak().build());
    expect(result).toEqual([]);
  });

  test("MediaWikiDefaultSort", async () => {
    const result = await parse(new MediaWikiDefaultSort("Smith, John").build());
    expect(result).toEqual([new MediaWikiDefaultSort("Smith, John")]);
  });

  test.each([
    ["MediaWikiNoTOC", MediaWikiNoTOC],
    ["MediaWikiForceTOC", MediaWikiForceTOC],
    ["MediaWikiNoEditSection", MediaWikiNoEditSection],
    ["MediaWikiNoGallery", MediaWikiNoGallery],
    ["MediaWikiStaticRedirect", MediaWikiStaticRedirect],
    ["MediaWikiIndex", MediaWikiIndex],
    ["MediaWikiNoIndex", MediaWikiNoIndex],
  ] as const)("%s", async (_name, BehaviorSwitch) => {
    const result = await parse(new BehaviorSwitch().build());
    expect(result).toEqual([new BehaviorSwitch()]);
  });

  test("MediaWikiGallery", async () => {
    const gallery = new MediaWikiGallery(
      [{ file: "Example.jpg" }, { file: "Example2.jpg", caption: "A caption" }],
      { mode: "packed", perrow: 4 }
    );
    const result = await parse(gallery.build());
    expect(result).toEqual([gallery]);
  });

  test("MediaWikiReference", async () => {
    const reference = new MediaWikiReference([new MediaWikiText("A citation.")], {
      name: "test",
    });
    const result = await parse(reference.build());
    expect(result).toEqual([reference]);
  });

  test("MediaWikiReference (self-closing)", async () => {
    const reference = new MediaWikiReference(undefined, { name: "test" });
    const result = await parse(reference.build());
    expect(result).toEqual([reference]);
  });
});

