import { MediaWikiHeader, MediaWikiTemplate, MediaWikiText } from "../contents";
import { MediaWikiContentList } from "./MediaWikiContentList";

describe("MediaWikiContentList", () => {
  const buildPageContents = () => [
    new MediaWikiText("intro text\n"),
    new MediaWikiHeader("Changes", 2),
    new MediaWikiText("changelog text\n"),
    new MediaWikiHeader("References", 2),
  ];

  test("wraps a MediaWikiContents value and exposes it via toArray()", () => {
    const contents = buildPageContents();
    expect(new MediaWikiContentList(contents).toArray()).toEqual(contents);
  });

  test("chains find + insert + build, matching the 'add a template to a section' scenario", () => {
    const contents = buildPageContents();
    const template = new MediaWikiTemplate("Subject changes");
    template.add("from", "2024");
    template.add("to", "2025");

    const wikitext = new MediaWikiContentList(contents).insertInSection("Changes", template).build();

    expect(wikitext).toBe(
      "intro text\n==Changes==changelog text\n{{Subject changes|from=2024|to=2025}}\n==References==",
    );
  });

  test("chained mutation methods never mutate the original array or earlier chain links", () => {
    const contents = buildPageContents();
    const list = new MediaWikiContentList(contents);
    const withInsert = list.insertInSection("Changes", new MediaWikiTemplate("Subject changes"));

    expect(list.toArray()).toHaveLength(contents.length);
    expect(withInsert.toArray()).toHaveLength(contents.length + 1);
    expect(withInsert).not.toBe(list);
  });

  test("removeSection removes an entire section", () => {
    const contents = buildPageContents();
    const result = new MediaWikiContentList(contents).removeSection("Changes").toArray();

    expect(result.some((content) => content.build().includes("Changes"))).toBe(false);
  });

  test("findTemplate / findAll / countContent read through to the underlying items", () => {
    const template = new MediaWikiTemplate("Infobox");
    const list = new MediaWikiContentList([new MediaWikiText("text"), template]);

    expect(list.findTemplate("Infobox")).toBe(template);
    expect(list.findAll((content) => content instanceof MediaWikiTemplate)).toEqual([template]);
    expect(list.countContent((content) => content instanceof MediaWikiTemplate)).toBe(1);
  });

  test("findHeadings lists every top-level heading", () => {
    const contents = buildPageContents();
    const list = new MediaWikiContentList(contents);

    expect(list.findHeadings().map((heading) => heading.build())).toEqual(["==Changes==", "==References=="]);
  });

  test("findSection locates a section", () => {
    const list = new MediaWikiContentList(buildPageContents());

    expect(list.findSection("Changes")).toMatchObject({ startIndex: 1, endIndex: 3 });
    expect(list.findSection("Missing")).toBeUndefined();
  });

  test("getSectionContents wraps the section in a new MediaWikiContentList", () => {
    const list = new MediaWikiContentList(buildPageContents());

    const section = list.getSectionContents("Changes");
    expect(section?.toArray().map((content) => content.build())).toEqual(["==Changes==", "changelog text\n"]);
    expect(list.getSectionContents("Missing")).toBeUndefined();
  });

  test("mapContent / forEachContent traverse every item", () => {
    const list = new MediaWikiContentList([new MediaWikiText("a"), new MediaWikiText("b")]);

    expect(list.mapContent((content) => content.build())).toEqual(["a", "b"]);

    const seen: string[] = [];
    list.forEachContent((content) => seen.push(content.build()));
    expect(seen).toEqual(["a", "b"]);
  });

  test("insertAtIndex / insertAfter / insertBefore return a new list with the content inserted", () => {
    const first = new MediaWikiText("first");
    const second = new MediaWikiText("second");
    const list = new MediaWikiContentList([first, second]);
    const inserted = new MediaWikiText("inserted");

    expect(list.insertAtIndex(1, inserted).toArray()).toEqual([first, inserted, second]);
    expect(list.insertAfter(first, inserted).toArray()).toEqual([first, inserted, second]);
    expect(list.insertBefore(second, inserted).toArray()).toEqual([first, inserted, second]);
  });

  test("replaceContent / removeContent / removeAtIndex return a new list", () => {
    const first = new MediaWikiText("first");
    const second = new MediaWikiText("second");
    const replacement = new MediaWikiText("replacement");
    const list = new MediaWikiContentList([first, second]);

    expect(list.replaceContent(first, replacement).toArray()).toEqual([replacement, second]);
    expect(list.removeContent(first).toArray()).toEqual([second]);
    expect(list.removeAtIndex(0).toArray()).toEqual([second]);
  });
});
