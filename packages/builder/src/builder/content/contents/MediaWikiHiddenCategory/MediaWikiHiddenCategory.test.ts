import { MediaWikiHiddenCategory } from "./MediaWikiHiddenCategory";

describe("MediaWikiHiddenCategory", () => {
  it("should build correctly", () => {
    expect(new MediaWikiHiddenCategory().build()).toBe("__HIDDENCAT__\n");
  });
});
