import { IfErrorParserFunction } from "./IfErrorParserFunction";

describe("IfErrorParserFunction", () => {
  test("it should render with an error and correct value", () => {
    expect(
      new IfErrorParserFunction("{{#expr:1+X}}", "error", "correct")
        .build()
        .build()
    ).toMatchSnapshot();
  });

  test("it should render with only an error value", () => {
    expect(
      new IfErrorParserFunction("{{#expr:1+2}}", "error").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with no error or correct value", () => {
    expect(
      new IfErrorParserFunction("{{#expr:1+2}}").build().build()
    ).toMatchSnapshot();
  });
});
