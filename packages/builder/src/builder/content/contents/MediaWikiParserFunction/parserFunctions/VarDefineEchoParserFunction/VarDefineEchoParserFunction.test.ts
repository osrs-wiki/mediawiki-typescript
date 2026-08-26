import { VarDefineEchoParserFunction } from "./VarDefineEchoParserFunction";

describe("VarDefineEchoParserFunction", () => {
  test("it should render with a variableName and value", () => {
    expect(
      new VarDefineEchoParserFunction("counter", "1").build().build()
    ).toMatchSnapshot();
  });
});
