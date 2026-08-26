import { MediaWikiDefaultSort } from "./MediaWikiDefaultSort";

describe("MediaWikiDefaultSort", () => {
  it("should render the sort key", () => {
    expect(new MediaWikiDefaultSort("Smith, John").build()).toBe(
      "{{DEFAULTSORT:Smith, John}}\n"
    );
  });
});
