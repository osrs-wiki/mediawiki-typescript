import { SubParserFunction } from "./SubParserFunction";

describe("SubParserFunction", () => {
  test("it should render with value and start", () => {
    expect(new SubParserFunction("Hello world", 6).build().build()).toMatchSnapshot();
  });

  test("it should render with value, start, and length", () => {
    expect(
      new SubParserFunction("Hello world", 0, 5).build().build()
    ).toMatchSnapshot();
  });
});
