import { MediaWikiNoGallery } from "./MediaWikiNoGallery";

describe("MediaWikiNoGallery", () => {
  it("should render the magic word", () => {
    expect(new MediaWikiNoGallery().build()).toBe("__NOGALLERY__\n");
  });
});
