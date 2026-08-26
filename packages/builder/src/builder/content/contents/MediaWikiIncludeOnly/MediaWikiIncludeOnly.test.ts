import { MediaWikiIncludeOnly } from "./MediaWikiIncludeOnly";
import { MediaWikiText } from "../MediaWikiText";

describe("MediaWikiIncludeOnly", () => {
  it("should render with no children", () => {
    expect(new MediaWikiIncludeOnly().build()).toBe(
      "<includeonly></includeonly>"
    );
  });

  it("should render with children", () => {
    const includeOnly = new MediaWikiIncludeOnly([
      new MediaWikiText("world"),
    ]);
    expect(includeOnly.build()).toBe("<includeonly>world</includeonly>");
  });
});
