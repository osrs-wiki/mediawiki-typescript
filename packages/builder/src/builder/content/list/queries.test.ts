import MediaWikiContent from "../MediaWikiContent";
import { MediaWikiHeader, MediaWikiTemplate, MediaWikiText } from "../contents";
import { countContent, findAll, findHeadings, findSection, findTemplate, forEachContent, getSectionContents, mapContent } from "./queries";

describe("findHeadings", () => {
  test("lists every top-level heading in document order", () => {
    const h1 = new MediaWikiHeader("Combat", 2);
    const h2 = new MediaWikiHeader("Drops", 2);
    const contents = [new MediaWikiText("intro"), h1, new MediaWikiText("body"), h2];

    expect(findHeadings(contents)).toEqual([h1, h2]);
  });

  test("returns an empty array when there are no headings", () => {
    expect(findHeadings([new MediaWikiText("just text")])).toEqual([]);
  });
});

describe("findSection", () => {
  test("ends a section at the next same-level heading", () => {
    const changes = new MediaWikiHeader("Changes", 2);
    const body = new MediaWikiText("changelog text");
    const next = new MediaWikiHeader("References", 2);
    const contents = [changes, body, next];

    const section = findSection(contents, "Changes");

    expect(section).toEqual({ heading: changes, startIndex: 0, endIndex: 2 });
  });

  test("keeps a deeper subheading inside the section", () => {
    const changes = new MediaWikiHeader("Changes", 2);
    const sub = new MediaWikiHeader("2024", 3);
    const next = new MediaWikiHeader("References", 2);
    const contents = [changes, sub, next];

    const section = findSection(contents, "Changes");

    expect(section).toEqual({ heading: changes, startIndex: 0, endIndex: 2 });
  });

  test("ends at the end of the array when there is no following heading", () => {
    const changes = new MediaWikiHeader("Changes", 2);
    const body = new MediaWikiText("changelog text");
    const contents = [changes, body];

    expect(findSection(contents, "Changes")).toEqual({ heading: changes, startIndex: 0, endIndex: 2 });
  });

  test("returns undefined when the heading isn't found", () => {
    expect(findSection([new MediaWikiText("text")], "Changes")).toBeUndefined();
  });

  test("disambiguates duplicate heading text via the level option", () => {
    const shallow = new MediaWikiHeader("Notes", 2);
    const deep = new MediaWikiHeader("Notes", 3);
    const contents = [shallow, deep];

    expect(findSection(contents, "Notes", { level: 3 })?.heading).toBe(deep);
  });

  test("matches the first occurrence when heading text is duplicated without a level filter", () => {
    const first = new MediaWikiHeader("Notes", 2);
    const second = new MediaWikiHeader("Notes", 2);
    const contents = [first, second];

    expect(findSection(contents, "Notes")?.heading).toBe(first);
  });
});

describe("getSectionContents", () => {
  test("returns the section's content slice", () => {
    const changes = new MediaWikiHeader("Changes", 2);
    const body = new MediaWikiText("changelog text");
    const next = new MediaWikiHeader("References", 2);
    const contents = [changes, body, next];

    expect(getSectionContents(contents, "Changes")).toEqual([changes, body]);
  });

  test("returns undefined when the heading isn't found", () => {
    expect(getSectionContents([new MediaWikiText("text")], "Changes")).toBeUndefined();
  });
});

describe("findAll / findTemplate / countContent", () => {
  test("findAll filters by predicate", () => {
    const template = new MediaWikiTemplate("Infobox");
    const contents = [new MediaWikiText("text"), template];

    expect(findAll(contents, (content) => content instanceof MediaWikiTemplate)).toEqual([template]);
  });

  test("findTemplate finds a template by name", () => {
    const infobox = new MediaWikiTemplate("Infobox");
    const other = new MediaWikiTemplate("Other");
    const contents = [other, infobox];

    expect(findTemplate(contents, "Infobox")).toBe(infobox);
  });

  test("findTemplate returns undefined when not found", () => {
    expect(findTemplate([new MediaWikiTemplate("Other")], "Infobox")).toBeUndefined();
  });

  test("countContent counts matches", () => {
    const contents = [new MediaWikiTemplate("A"), new MediaWikiText("text"), new MediaWikiTemplate("B")];
    expect(countContent(contents, (content) => content instanceof MediaWikiTemplate)).toBe(2);
  });
});

describe("mapContent / forEachContent", () => {
  test("mapContent maps every item", () => {
    const contents = [new MediaWikiText("a"), new MediaWikiText("b")];
    expect(mapContent(contents, (content) => content.build())).toEqual(["a", "b"]);
  });

  test("forEachContent visits every item", () => {
    const seen: MediaWikiContent[] = [];
    const contents = [new MediaWikiText("a"), new MediaWikiText("b")];
    forEachContent(contents, (content) => seen.push(content));
    expect(seen).toEqual(contents);
  });
});
