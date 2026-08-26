import { MediaWikiCategory } from "./MediaWikiCategory";

describe("MediaWikiCategory", () => {
  it("should build correctly without a sort key", () => {
    expect(new MediaWikiCategory("Help").build()).toBe("[[Category:Help]]");
  });

  it("should build correctly with a sort key", () => {
    expect(new MediaWikiCategory("Help", "Sort").build()).toBe(
      "[[Category:Help|Sort]]"
    );
  });
});
