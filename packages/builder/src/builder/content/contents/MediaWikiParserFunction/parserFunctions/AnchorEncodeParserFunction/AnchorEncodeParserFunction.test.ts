import { AnchorEncodeParserFunction } from "./AnchorEncodeParserFunction";

describe("AnchorEncodeParserFunction", () => {
  test("it should render with a value", () => {
    expect(
      new AnchorEncodeParserFunction("AbC dEf ghi").build().build()
    ).toMatchSnapshot();
  });
});
