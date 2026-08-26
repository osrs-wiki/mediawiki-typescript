import { MediaWikiReference } from "./MediaWikiReference";
import { MediaWikiText } from "../MediaWikiText";

describe("MediaWikiReference", () => {
  it("should render self-closing when there are no children", () => {
    expect(new MediaWikiReference(undefined, { name: "test" }).build()).toBe(
      '<ref name="test" />'
    );
  });

  it("should render with children", () => {
    const ref = new MediaWikiReference([new MediaWikiText("A citation.")]);
    expect(ref.build()).toBe("<ref>A citation.</ref>");
  });

  it("should render with a name and group", () => {
    const ref = new MediaWikiReference([new MediaWikiText("A citation.")], {
      name: "test",
      group: "note",
    });
    expect(ref.build()).toBe('<ref name="test" group="note">A citation.</ref>');
  });
});
