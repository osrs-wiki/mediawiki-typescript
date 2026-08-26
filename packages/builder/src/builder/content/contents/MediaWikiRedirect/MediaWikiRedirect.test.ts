import { MediaWikiRedirect } from "./MediaWikiRedirect";

describe("MediaWikiRedirect", () => {
  it("should build correctly", () => {
    expect(new MediaWikiRedirect("Target page").build()).toBe(
      "#REDIRECT [[Target page]]\n"
    );
  });
});
