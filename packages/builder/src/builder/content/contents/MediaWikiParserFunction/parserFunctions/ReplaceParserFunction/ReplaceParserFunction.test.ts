import { ReplaceParserFunction } from "./ReplaceParserFunction";

describe("ReplaceParserFunction", () => {
  test("it should render with value and from", () => {
    expect(
      new ReplaceParserFunction("Hello world", "world").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with value, from, to, and limit", () => {
    expect(
      new ReplaceParserFunction("a-a-a", "-", "_", 1).build().build()
    ).toMatchSnapshot();
  });
});
