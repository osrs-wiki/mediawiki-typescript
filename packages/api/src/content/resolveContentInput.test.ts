import { MediaWikiText } from "@mediawiki-typescript/builder";
import { resolveContentInput } from "./resolveContentInput";

describe("resolveContentInput", () => {
  test("passes a raw wikitext string through unchanged", () => {
    expect(resolveContentInput("== Hello ==")).toBe("== Hello ==");
  });

  test("builds a single MediaWikiContent", () => {
    expect(resolveContentInput(new MediaWikiText("Hello world"))).toBe("Hello world");
  });

  test("builds an array of MediaWikiContent", () => {
    const contents = [new MediaWikiText("Hello "), new MediaWikiText("world")];
    expect(resolveContentInput(contents)).toBe("Hello world");
  });
});
