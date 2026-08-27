import MediaWikiContent from "./MediaWikiContent";
import {
  buildContents,
  contentStartsWith,
  findFirstStringContent,
  flattenContents,
  isContentEmpty,
} from "./MediaWikiContent.utils";
import { MediaWikiLink } from "./contents/MediaWikiLink/MediaWikiLink";
import { MediaWikiText } from "./contents/MediaWikiText/MediaWikiText";

class MediaWikiContentTest extends MediaWikiContent {
  build(): string {
    return "test";
  }
}

describe("MediaWikiContent utils", () => {
  test("buildContents string", () => {
    expect(buildContents("test")).toBe("test");
  });

  test("buildContents MediaWikiContent", () => {
    expect(buildContents(new MediaWikiContentTest())).toBe("test");
  });

  test("buildContents MediaWikiContent array", () => {
    expect(
      buildContents([new MediaWikiContentTest(), new MediaWikiContentTest()])
    ).toBe("testtest");
  });

  test("buildContents filters out undefined elements", () => {
    // Test the safety filter by creating an array with undefined elements
    const contentArray = [
      new MediaWikiContentTest(),
      undefined,
      new MediaWikiContentTest(),
    ] as (MediaWikiContentTest | undefined)[];

    expect(buildContents(contentArray as MediaWikiContent[])).toBe("testtest");
  });

  test("buildContents filters out null elements", () => {
    // Test the safety filter by creating an array with null elements
    const contentArray = [
      new MediaWikiContentTest(),
      null,
      new MediaWikiContentTest(),
    ] as (MediaWikiContentTest | null)[];

    expect(buildContents(contentArray as MediaWikiContent[])).toBe("testtest");
  });

  test("buildContents filters out objects without build method", () => {
    // Test the safety filter by creating an array with invalid objects
    const invalidObject = { notABuildMethod: () => "should not appear" };
    const contentArray = [
      new MediaWikiContentTest(),
      invalidObject,
      new MediaWikiContentTest(),
    ] as (MediaWikiContentTest | typeof invalidObject)[];

    expect(buildContents(contentArray as MediaWikiContent[])).toBe("testtest");
  });

  test("buildContents handles array with all invalid elements", () => {
    // Test with array containing only invalid elements
    const invalidArray = [undefined, null, {}] as (undefined | null | object)[];
    expect(buildContents(invalidArray as MediaWikiContent[])).toBe("");
  });

  test("buildContents handles empty array", () => {
    expect(buildContents([])).toBe("");
  });

  test("buildContents handles mixed valid and invalid elements", () => {
    const validElement1 = new MediaWikiContentTest();
    const validElement2 = new MediaWikiContentTest();
    const invalidObject = { someProperty: "value" };
    const invalidBuildObject = { build: "not a function" };

    const mixedArray = [
      validElement1,
      undefined,
      null,
      invalidObject,
      validElement2,
      invalidBuildObject,
    ] as (
      | MediaWikiContentTest
      | undefined
      | null
      | typeof invalidObject
      | typeof invalidBuildObject
    )[];

    expect(buildContents(mixedArray as MediaWikiContent[])).toBe("testtest");
  });
});

describe("flattenContents", () => {
  test("returns an empty array for a string", () => {
    expect(flattenContents("test")).toEqual([]);
  });

  test("wraps a single MediaWikiContent in an array", () => {
    const content = new MediaWikiContentTest();
    expect(flattenContents(content)).toEqual([content]);
  });

  test("returns the array as-is (filtered) for an array input", () => {
    const first = new MediaWikiContentTest();
    const second = new MediaWikiContentTest();
    expect(flattenContents([first, second])).toEqual([first, second]);
  });

  test("filters out nullish and non-content entries", () => {
    const valid = new MediaWikiContentTest();
    const invalid = { notABuildMethod: () => "nope" };
    const mixed = [valid, null, undefined, invalid] as MediaWikiContent[];
    expect(flattenContents(mixed)).toEqual([valid]);
  });
});

describe("isContentEmpty", () => {
  test("treats null/undefined as empty", () => {
    expect(isContentEmpty(undefined)).toBe(true);
  });

  test("treats a whitespace-only string as empty", () => {
    expect(isContentEmpty("   ")).toBe(true);
    expect(isContentEmpty("text")).toBe(false);
  });

  test("treats an empty array as empty", () => {
    expect(isContentEmpty([])).toBe(true);
  });

  test("treats an array of only-empty content as empty", () => {
    expect(isContentEmpty([new MediaWikiText(""), new MediaWikiText("  ")])).toBe(true);
    expect(isContentEmpty([new MediaWikiText(""), new MediaWikiText("text")])).toBe(false);
  });

  test("recurses into a MediaWikiContent's children", () => {
    expect(isContentEmpty(new MediaWikiText(""))).toBe(true);
    expect(isContentEmpty(new MediaWikiText("text"))).toBe(false);
  });
});

describe("contentStartsWith", () => {
  test("checks a raw string directly", () => {
    expect(contentStartsWith("Hello world", "Hello")).toBe(true);
  });

  test("checks the first item of an array", () => {
    expect(contentStartsWith([new MediaWikiText("Hello"), new MediaWikiText("world")], "Hello")).toBe(true);
  });

  test("dives through nested MediaWikiContent children", () => {
    const nested = new MediaWikiText(new MediaWikiText("Hello world"));
    expect(contentStartsWith(nested, "Hello")).toBe(true);
  });

  test("returns false for empty content", () => {
    expect(contentStartsWith(undefined, "Hello")).toBe(false);
    expect(contentStartsWith([], "Hello")).toBe(false);
  });
});

describe("findFirstStringContent", () => {
  test("returns the content itself when its children is a string", () => {
    const text = new MediaWikiText("Hello");
    expect(findFirstStringContent(text)).toBe(text);
  });

  test("recurses through a single nested MediaWikiContent child", () => {
    const inner = new MediaWikiText("Hello");
    const outer = new MediaWikiText(inner);
    expect(findFirstStringContent(outer)).toBe(inner);
  });

  test("recurses through the first item of an array child", () => {
    const inner = new MediaWikiText("Hello");
    const outer = new MediaWikiText([inner, new MediaWikiText("world")]);
    expect(findFirstStringContent(outer)).toBe(inner);
  });

  test("returns undefined when no string content is found", () => {
    expect(findFirstStringContent(new MediaWikiLink("Page"))).toBeUndefined();
  });
});

