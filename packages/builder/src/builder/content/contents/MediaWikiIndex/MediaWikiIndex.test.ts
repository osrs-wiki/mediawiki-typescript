import { MediaWikiIndex } from "./MediaWikiIndex";

describe("MediaWikiIndex", () => {
  it("should render the magic word", () => {
    expect(new MediaWikiIndex().build()).toBe("__INDEX__\n");
  });
});
