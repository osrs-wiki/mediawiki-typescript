import { UppercaseParserFunction } from "./UppercaseParserFunction";

describe("UppercaseParserFunction", () => {
  test("it should render with a value", () => {
    expect(new UppercaseParserFunction("AbC").build().build()).toMatchSnapshot();
  });
});
