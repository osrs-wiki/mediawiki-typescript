import { getNextMeaningfulContent, trimBreaks, trimContentEdge, trimContentEdges } from "./contentTraversal";
import { MediaWikiBreak } from "./contents/MediaWikiBreak/MediaWikiBreak";
import { MediaWikiLink } from "./contents/MediaWikiLink/MediaWikiLink";
import { MediaWikiText } from "./contents/MediaWikiText/MediaWikiText";

describe("trimBreaks", () => {
  test("removes leading and trailing MediaWikiBreak items", () => {
    const text = new MediaWikiText("text");
    const contents = [new MediaWikiBreak(), new MediaWikiBreak(), text, new MediaWikiBreak()];
    expect(trimBreaks(contents)).toEqual([text]);
  });

  test("does not mutate the original array", () => {
    const contents = [new MediaWikiBreak(), new MediaWikiText("text")];
    const result = trimBreaks(contents);
    expect(result).not.toBe(contents);
    expect(contents).toHaveLength(2);
  });

  test("returns an empty array when everything is a break", () => {
    expect(trimBreaks([new MediaWikiBreak(), new MediaWikiBreak()])).toEqual([]);
  });
});

describe("trimContentEdge / trimContentEdges", () => {
  test("trims leading whitespace from a string-child MediaWikiText", () => {
    const trimmed = trimContentEdge(new MediaWikiText("  Hello"), "start");
    expect(trimmed.build()).toBe("Hello");
  });

  test("trims trailing whitespace from a string-child MediaWikiText", () => {
    const trimmed = trimContentEdge(new MediaWikiText("Hello  "), "end");
    expect(trimmed.build()).toBe("Hello");
  });

  test("leaves non-MediaWikiText content unchanged", () => {
    const link = new MediaWikiLink("Page");
    expect(trimContentEdge(link, "start")).toBe(link);
  });

  test("leaves a MediaWikiText with no trimmable children unchanged", () => {
    const empty = new MediaWikiText([]);
    expect(trimContentEdge(empty, "start")).toBe(empty);
  });

  test("recurses into an array child without disturbing interior spacing", () => {
    const outer = new MediaWikiText([new MediaWikiText("  Hello "), new MediaWikiText(" world  ")]);
    const trimmedStart = trimContentEdge(outer, "start");
    const trimmedEnd = trimContentEdge(trimmedStart, "end");
    expect(trimmedEnd.build()).toBe("Hello  world");
  });

  test("trimContentEdges trims both edges of a content array", () => {
    const contents = [new MediaWikiText("  Hello"), new MediaWikiText("world  ")];
    const result = trimContentEdges(contents);
    expect(result.map((content) => content.build())).toEqual(["Hello", "world"]);
  });

  test("trims both edges of a single-item array", () => {
    const result = trimContentEdges([new MediaWikiText("  Hello  ")]);
    expect(result[0].build()).toBe("Hello");
  });

  test("returns the input unchanged for an empty array", () => {
    expect(trimContentEdges([])).toEqual([]);
  });
});

describe("getNextMeaningfulContent", () => {
  test("skips MediaWikiBreak items", () => {
    const text = new MediaWikiText("text");
    const contents = [new MediaWikiBreak(), text];
    expect(getNextMeaningfulContent(contents, 0)).toEqual({ content: text, index: 1 });
  });

  test("skips empty/whitespace-only MediaWikiText items", () => {
    const text = new MediaWikiText("text");
    const contents = [new MediaWikiText("   "), text];
    expect(getNextMeaningfulContent(contents, 0)).toEqual({ content: text, index: 1 });
  });

  test("does not skip other meaningful content without children", () => {
    const link = new MediaWikiLink("Page");
    expect(getNextMeaningfulContent([link], 0)).toEqual({ content: link, index: 0 });
  });

  test("returns undefined/-1 when nothing meaningful remains", () => {
    expect(getNextMeaningfulContent([new MediaWikiBreak()], 0)).toEqual({ content: undefined, index: -1 });
  });
});
