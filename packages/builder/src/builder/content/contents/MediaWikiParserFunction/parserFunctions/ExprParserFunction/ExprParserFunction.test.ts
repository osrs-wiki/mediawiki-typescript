import { ExprParserFunction } from "./ExprParserFunction";

describe("ExprParserFunction", () => {
  test("it should render a simple expression", () => {
    expect(new ExprParserFunction("1 + 1").build().build()).toMatchSnapshot();
  });

  test("it should render a nested expression from the user's example", () => {
    expect(
      new ExprParserFunction(
        "floor(floor(({{#time:U}}-{{#time:U|31 December 2025 10:30:00 UTC}})/(60*60*24))/7) mod 2"
      )
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
