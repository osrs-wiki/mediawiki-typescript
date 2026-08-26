import { MediaWikiNoInclude } from "./MediaWikiNoInclude";
import { MediaWikiText } from "../MediaWikiText";

describe("MediaWikiNoInclude", () => {
  it("should render with no children", () => {
    expect(new MediaWikiNoInclude().build()).toBe("<noinclude></noinclude>");
  });

  it("should render with children", () => {
    const noInclude = new MediaWikiNoInclude([new MediaWikiText("world")]);
    expect(noInclude.build()).toBe("<noinclude>world</noinclude>");
  });
});
