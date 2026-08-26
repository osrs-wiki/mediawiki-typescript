import { TitlePartsParserFunction } from "./TitlePartsParserFunction";

describe("TitlePartsParserFunction", () => {
  test("it should render with only a pageName", () => {
    expect(
      new TitlePartsParserFunction("Talk:Foo/bar/baz/quok").build().build()
    ).toMatchSnapshot();
  });

  test("it should render with numSegments and startSegment", () => {
    expect(
      new TitlePartsParserFunction("Talk:Foo/bar/baz/quok", 2, 2)
        .build()
        .build()
    ).toMatchSnapshot();
  });

  test("it should render with a negative startSegment", () => {
    expect(
      new TitlePartsParserFunction("Talk:Foo/bar/baz/quok", undefined, -1)
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
