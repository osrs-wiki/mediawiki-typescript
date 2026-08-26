import { LowercaseFirstParserFunction } from "./LowercaseFirstParserFunction";

describe("LowercaseFirstParserFunction", () => {
  test("it should render with a value", () => {
    expect(
      new LowercaseFirstParserFunction("AbC").build().build()
    ).toMatchSnapshot();
  });
});
