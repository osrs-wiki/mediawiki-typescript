import { VarParserFunction } from "./VarParserFunction";

describe("VarParserFunction", () => {
  test("it should render with a variableName", () => {
    expect(new VarParserFunction("weekly").build().build()).toMatchSnapshot();
  });
});
