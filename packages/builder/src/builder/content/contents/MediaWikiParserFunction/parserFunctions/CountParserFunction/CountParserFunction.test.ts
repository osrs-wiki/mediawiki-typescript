import { CountParserFunction } from "./CountParserFunction";

describe("CountParserFunction", () => {
  test("it should render with value and substring", () => {
    expect(
      new CountParserFunction("Hello world world", "world").build().build()
    ).toMatchSnapshot();
  });
});
