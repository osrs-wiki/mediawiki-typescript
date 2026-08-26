import { MediaWikiNoTOC } from "./MediaWikiNoTOC";

describe("MediaWikiNoTOC", () => {
  it("should render the magic word", () => {
    expect(new MediaWikiNoTOC().build()).toBe("__NOTOC__\n");
  });
});
