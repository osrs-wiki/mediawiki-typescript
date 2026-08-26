import { VarDefineParserFunction } from "./VarDefineParserFunction";

describe("VarDefineParserFunction", () => {
  test("it should render with a variableName and value", () => {
    expect(
      new VarDefineParserFunction(
        "weekly",
        "{{#expr:floor(floor(({{#time:U}}-{{#time:U|31 December 2025 10:30:00 UTC}})/(60*60*24))/7) mod 2}}"
      )
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
