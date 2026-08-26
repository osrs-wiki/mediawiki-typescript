import { TimeFParserFunction } from "./TimeFParserFunction";

describe("TimeFParserFunction", () => {
  test("it should render with no params", () => {
    expect(new TimeFParserFunction().build().build()).toMatchSnapshot();
  });

  test("it should render with a dateTime, formatType, and language", () => {
    expect(
      new TimeFParserFunction("now", "both", "en").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with only a formatType", () => {
    expect(
      new TimeFParserFunction(undefined, "time").build().build()
    ).toMatchSnapshot();
  });
});
