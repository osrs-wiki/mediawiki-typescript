import { MediaWikiListItem } from "./MediaWikiListItem";

describe("MediaWikiListItem", () => {
  it("should build an unordered (bullet) item", () => {
    expect(new MediaWikiListItem("one", { level: 1 }).build()).toBe("\n* one");
  });

  it("should build an ordered (numbered) item", () => {
    expect(new MediaWikiListItem("one", { level: 1, ordered: true }).build()).toBe(
      "\n# one"
    );
  });

  it("should build a nested item using the level", () => {
    expect(new MediaWikiListItem("one", { level: 2, ordered: true }).build()).toBe(
      "\n## one"
    );
  });

  it("should build a definition list term", () => {
    expect(
      new MediaWikiListItem("Term", { level: 1, definitionType: "term" }).build()
    ).toBe("\n; Term");
  });

  it("should build a definition list definition", () => {
    expect(
      new MediaWikiListItem("Definition", {
        level: 1,
        definitionType: "definition",
      }).build()
    ).toBe("\n: Definition");
  });
});
