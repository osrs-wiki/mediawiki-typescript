import { LowercaseParserFunction } from "./LowercaseParserFunction";

describe("LowercaseParserFunction", () => {
  test("it should render with a value", () => {
    expect(new LowercaseParserFunction("AbC").build().build()).toMatchSnapshot();
  });
});
