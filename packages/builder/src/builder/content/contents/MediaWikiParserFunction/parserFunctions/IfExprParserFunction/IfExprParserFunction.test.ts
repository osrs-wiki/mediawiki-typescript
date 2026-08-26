import { IfExprParserFunction } from "./IfExprParserFunction";

describe("IfExprParserFunction", () => {
  test("it should render with a then and else", () => {
    expect(
      new IfExprParserFunction("1 > 0", "yes", "no").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with only a then", () => {
    expect(
      new IfExprParserFunction("1 > 0", "yes").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with no then or else", () => {
    expect(new IfExprParserFunction("1 > 0").build().build()).toMatchSnapshot();
  });
});
