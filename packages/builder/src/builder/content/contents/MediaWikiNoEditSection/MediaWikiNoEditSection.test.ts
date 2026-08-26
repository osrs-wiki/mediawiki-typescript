import { MediaWikiNoEditSection } from "./MediaWikiNoEditSection";

describe("MediaWikiNoEditSection", () => {
  it("should render the magic word", () => {
    expect(new MediaWikiNoEditSection().build()).toBe("__NOEDITSECTION__\n");
  });
});
