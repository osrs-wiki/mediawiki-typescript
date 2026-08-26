import { MediaWikiNoIndex } from "./MediaWikiNoIndex";

describe("MediaWikiNoIndex", () => {
  it("should render the magic word", () => {
    expect(new MediaWikiNoIndex().build()).toBe("__NOINDEX__\n");
  });
});
