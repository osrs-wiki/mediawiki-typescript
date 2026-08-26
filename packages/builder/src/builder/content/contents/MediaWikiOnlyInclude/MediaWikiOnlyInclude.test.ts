import { MediaWikiOnlyInclude } from "./MediaWikiOnlyInclude";
import { MediaWikiText } from "../MediaWikiText";

describe("MediaWikiOnlyInclude", () => {
  it("should render with no children", () => {
    expect(new MediaWikiOnlyInclude().build()).toBe(
      "<onlyinclude></onlyinclude>"
    );
  });

  it("should render with children", () => {
    const onlyInclude = new MediaWikiOnlyInclude([new MediaWikiText("world")]);
    expect(onlyInclude.build()).toBe("<onlyinclude>world</onlyinclude>");
  });
});
