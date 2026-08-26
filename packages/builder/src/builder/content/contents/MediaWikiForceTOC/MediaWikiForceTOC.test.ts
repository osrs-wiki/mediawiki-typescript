import { MediaWikiForceTOC } from "./MediaWikiForceTOC";

describe("MediaWikiForceTOC", () => {
  it("should render the magic word", () => {
    expect(new MediaWikiForceTOC().build()).toBe("__FORCETOC__\n");
  });
});
