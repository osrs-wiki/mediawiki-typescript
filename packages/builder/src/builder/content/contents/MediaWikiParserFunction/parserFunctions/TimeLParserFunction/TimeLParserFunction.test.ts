import { TimeLParserFunction } from "./TimeLParserFunction";

describe("TimeLParserFunction", () => {
  test("it should render with only a format", () => {
    expect(new TimeLParserFunction("H:i, j xg Y (e)").build().build()).toMatchSnapshot();
  });

  test("it should render with a dateTime and language", () => {
    expect(
      new TimeLParserFunction("l", { dateTime: "now", language: "uk" })
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
