import { TimeParserFunction } from "./TimeParserFunction";

describe("TimeParserFunction", () => {
  test("it should render with only a format", () => {
    expect(new TimeParserFunction("Y-m-d").build().build()).toMatchSnapshot();
  });

  test("it should render with a dateTime", () => {
    expect(
      new TimeParserFunction("Y-m-d", { dateTime: "now" }).build().build()
    ).toMatchSnapshot();
  });

  test("it should render with dateTime, language, and local", () => {
    expect(
      new TimeParserFunction("d F Y", {
        dateTime: "1988-02-28",
        language: "nl",
        local: true,
      })
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
