import { TimeFLParserFunction } from "./TimeFLParserFunction";

describe("TimeFLParserFunction", () => {
  test("it should render with no params", () => {
    expect(new TimeFLParserFunction().build().build()).toMatchSnapshot();
  });

  test("it should render with a dateTime, formatType, and language", () => {
    expect(
      new TimeFLParserFunction("now", "pretty", "pl").build().build()
    ).toMatchSnapshot();
  });
});
