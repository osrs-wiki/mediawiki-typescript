import { MediaWikiParserFunction } from "./MediaWikiParserFunction";

describe("MediaWikiParserFunction", () => {
  test("it should render with no params", () => {
    const parserFunction = new MediaWikiParserFunction("#switch");

    expect(parserFunction.build()).toMatchSnapshot();
  });

  test("it should render with params", () => {
    const parserFunction = new MediaWikiParserFunction("#switch");
    parserFunction.add("{{#var:weekly}}");
    parserFunction.add("0=LMS Competitive");
    parserFunction.add("1=");

    expect(parserFunction.build()).toMatchSnapshot();
  });

  test("it should render a plain magic-word-style call", () => {
    const parserFunction = new MediaWikiParserFunction("lc");
    parserFunction.add("AbC");

    expect(parserFunction.build()).toMatchSnapshot();
  });
});
