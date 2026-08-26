import { IfParserFunction } from "./IfParserFunction";

describe("IfParserFunction", () => {
  test("it should render with a then and else", () => {
    expect(
      new IfParserFunction("test string", "yes", "no").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with only a then", () => {
    expect(
      new IfParserFunction("foo", "yes").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with an empty test", () => {
    expect(new IfParserFunction("", "yes", "no").build().build()).toMatchSnapshot();
  });
});
