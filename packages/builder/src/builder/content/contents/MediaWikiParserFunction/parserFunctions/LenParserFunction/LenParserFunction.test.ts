import { LenParserFunction } from "./LenParserFunction";

describe("LenParserFunction", () => {
  test("it should render with a value", () => {
    expect(new LenParserFunction("Hello world").build().build()).toMatchSnapshot();
  });
});
