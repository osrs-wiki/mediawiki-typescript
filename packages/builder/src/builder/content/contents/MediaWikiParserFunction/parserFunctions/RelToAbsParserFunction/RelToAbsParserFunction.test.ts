import { RelToAbsParserFunction } from "./RelToAbsParserFunction";

describe("RelToAbsParserFunction", () => {
  test("it should render with only a path", () => {
    expect(new RelToAbsParserFunction("/quok").build().build()).toMatchSnapshot();
  });

  test("it should render with a path and basePath", () => {
    expect(
      new RelToAbsParserFunction("../quok", "Help:Foo/bar/baz")
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
