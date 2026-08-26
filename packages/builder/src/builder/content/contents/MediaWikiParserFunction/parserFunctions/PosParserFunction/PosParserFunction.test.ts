import { PosParserFunction } from "./PosParserFunction";

describe("PosParserFunction", () => {
  test("it should render with value and target", () => {
    expect(
      new PosParserFunction("Hello world", "world").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with an offset", () => {
    expect(
      new PosParserFunction("Hello world world", "world", 8)
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
