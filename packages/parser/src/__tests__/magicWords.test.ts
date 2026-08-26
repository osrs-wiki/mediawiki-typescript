import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

/** Help:Magic_words coverage beyond __TOC__/__HIDDENCAT__ (covered in categories.test.ts). */
describe("parse - Help:Magic_words", () => {
  test("DEFAULTSORT", async () => {
    expect(await build("{{DEFAULTSORT:Smith, John}}")).toBe(
      "{{DEFAULTSORT:Smith, John}}\n"
    );
  });

  test.each([
    "__NOTOC__",
    "__FORCETOC__",
    "__NOEDITSECTION__",
    "__NOGALLERY__",
    "__STATICREDIRECT__",
    "__INDEX__",
    "__NOINDEX__",
  ])("behavior switch %s", async (word) => {
    expect(await build(word)).toBe(`${word}\n`);
  });

  test("a plain paragraph is not mistaken for a behavior switch", async () => {
    expect(await build("__NOTREALLY__")).toBe("__NOTREALLY__");
  });
});
