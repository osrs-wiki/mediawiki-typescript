import { MediaWikiStaticRedirect } from "./MediaWikiStaticRedirect";

describe("MediaWikiStaticRedirect", () => {
  it("should render the magic word", () => {
    expect(new MediaWikiStaticRedirect().build()).toBe("__STATICREDIRECT__\n");
  });
});
