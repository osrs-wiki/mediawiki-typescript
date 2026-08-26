import { UrlDecodeParserFunction } from "./UrlDecodeParserFunction";

describe("UrlDecodeParserFunction", () => {
  test("it should render with a value", () => {
    expect(
      new UrlDecodeParserFunction("AbC%0AdEf+ghi").build().build()
    ).toMatchSnapshot();
  });
});
