import { IfEqParserFunction } from "./IfEqParserFunction";

describe("IfEqParserFunction", () => {
  test("it should render with a then and else", () => {
    expect(
      new IfEqParserFunction("foo", "bar", "equal", "not equal")
        .build()
        .build()
    ).toMatchSnapshot();
  });

  test("it should render with only a then", () => {
    expect(
      new IfEqParserFunction("foo", "foo", "equal").build().build()
    ).toMatchSnapshot();
  });
});
