import { UppercaseFirstParserFunction } from "./UppercaseFirstParserFunction";

describe("UppercaseFirstParserFunction", () => {
  test("it should render with a value", () => {
    expect(
      new UppercaseFirstParserFunction("abc").build().build()
    ).toMatchSnapshot();
  });
});
