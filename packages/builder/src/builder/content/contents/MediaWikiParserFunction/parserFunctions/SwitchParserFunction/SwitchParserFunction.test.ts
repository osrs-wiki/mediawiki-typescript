import { SwitchParserFunction } from "./SwitchParserFunction";

describe("SwitchParserFunction", () => {
  test("it should render with cases and a default", () => {
    expect(
      new SwitchParserFunction(
        "{{#var:weekly}}",
        [
          { case: "0", result: "LMS Competitive" },
          { case: "1", result: "" },
        ]
      )
        .build()
        .build()
    ).toMatchSnapshot();
  });

  test("it should render with an explicit #default case", () => {
    expect(
      new SwitchParserFunction("test", [
        { case: "foo", result: "Foo" },
        { case: "#default", result: "Bar" },
        { case: "baz", result: "Baz" },
      ])
        .build()
        .build()
    ).toMatchSnapshot();
  });

  test("it should render with fallthrough cases sharing a result", () => {
    expect(
      new SwitchParserFunction("test", [
        { case: "case1", result: "result1" },
        { case: "case2" },
        { case: "case3" },
        { case: "case4", result: "result234" },
      ])
        .build()
        .build()
    ).toMatchSnapshot();
  });

  test("it should render with a trailing bare default", () => {
    expect(
      new SwitchParserFunction(
        "baz",
        [
          { case: "foo", result: "Foo" },
          { case: "baz", result: "Baz" },
        ],
        "Bar"
      )
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
