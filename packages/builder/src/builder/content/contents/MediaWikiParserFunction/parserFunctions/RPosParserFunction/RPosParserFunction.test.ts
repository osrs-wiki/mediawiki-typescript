import { RPosParserFunction } from "./RPosParserFunction";

describe("RPosParserFunction", () => {
  test("it should render with value and target", () => {
    expect(
      new RPosParserFunction("Hello world world", "world").build().build()
    ).toMatchSnapshot();
  });
});
