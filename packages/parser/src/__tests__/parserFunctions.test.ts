import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

describe("parse - ParserFunctions", () => {
  test("the user's #switch/#var example", async () => {
    const result = await build("{{#switch:{{#var:weekly}}|0=LMS Competitive|1=}}");
    expect(result).toBe("{{#switch:{{#var:weekly}}|0=LMS Competitive|1=}}\n");
  });

  test("the user's #vardefine/#expr/#time example", async () => {
    const input =
      "{{#vardefine:weekly|{{#expr:floor(floor(({{#time:U}}-{{#time:U|31 December 2025 10:30:00 UTC}})/(60*60*24))/7) mod 2}}}}";
    const result = await build(input);
    expect(result).toBe(
      "{{#vardefine:weekly|{{#expr:floor(floor(({{#time:U}}-{{#time:U|31 December 2025 10:30:00 UTC}})/(60*60*24))/7) mod 2}}}}\n"
    );
  });

  test("a plain template call", async () => {
    // 2 params stays in MediaWikiTemplate's "collapsed" (inline, no spaces around `=`) form.
    const result = await build("{{Infobox|name=Test|value=1}}");
    expect(result).toContain("Infobox");
    expect(result).toContain("name=Test");
    expect(result).toContain("value=1");
  });

  test("a bare magic-word-style call", async () => {
    const result = await build("{{lc:AbC}}");
    expect(result).toBe("{{lc:AbC}}\n");
  });
});
