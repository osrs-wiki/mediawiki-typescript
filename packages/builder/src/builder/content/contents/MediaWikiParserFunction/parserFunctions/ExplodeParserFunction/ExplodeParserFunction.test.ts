import { ExplodeParserFunction } from "./ExplodeParserFunction";

describe("ExplodeParserFunction", () => {
  test("it should render with value and delimiter", () => {
    expect(
      new ExplodeParserFunction("John Q. Public", " ").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with value, delimiter, and position", () => {
    expect(
      new ExplodeParserFunction("John Q. Public", " ", 2).build().build()
    ).toMatchSnapshot();
  });
});
