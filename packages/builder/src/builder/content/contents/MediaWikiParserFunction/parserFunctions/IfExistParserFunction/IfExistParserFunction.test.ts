import { IfExistParserFunction } from "./IfExistParserFunction";

describe("IfExistParserFunction", () => {
  test("it should render with exists and notExists", () => {
    expect(
      new IfExistParserFunction(
        "Help:Extension:ParserFunctions",
        "exists",
        "doesn't exist"
      )
        .build()
        .build()
    ).toMatchSnapshot();
  });

  test("it should render with only exists", () => {
    expect(
      new IfExistParserFunction("Special:Watchlist", "exists").build().build()
    ).toMatchSnapshot();
  });
});
