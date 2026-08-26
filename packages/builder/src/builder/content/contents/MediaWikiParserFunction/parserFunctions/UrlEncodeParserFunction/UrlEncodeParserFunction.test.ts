import { UrlEncodeParserFunction } from "./UrlEncodeParserFunction";

describe("UrlEncodeParserFunction", () => {
  test("it should render with a value", () => {
    expect(
      new UrlEncodeParserFunction("AbC dEf ghi").build().build()
    ).toMatchSnapshot();
  });
});
