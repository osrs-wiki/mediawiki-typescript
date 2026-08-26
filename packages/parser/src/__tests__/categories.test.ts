import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

/** Full Help:Categories coverage. */
describe("parse - Help:Categories", () => {
  test("adding a page to a category", async () => {
    expect(await build("[[Category:Help]]")).toBe("[[Category:Help]]");
  });

  test("a category with a sort key", async () => {
    expect(await build("[[Category:Help|Sort]]")).toBe(
      "[[Category:Help|Sort]]"
    );
  });

  test("linking to a category without adding the page to it (leading colon)", async () => {
    expect(await build("[[:Category:Help]]")).toBe("[[:Category:Help]]");
  });

  test("linking to a category with custom link text", async () => {
    expect(await build("[[:Category:Help|Help category]]")).toBe(
      "[[:Category:Help|Help category]]"
    );
  });

  test("multiple category tags on one page", async () => {
    const result = await build("[[Category:Help]]\n[[Category:Category]]");
    expect(result).toContain("[[Category:Help]]");
    expect(result).toContain("[[Category:Category]]");
  });

  test("hidden category magic word", async () => {
    expect(await build("__HIDDENCAT__")).toBe("__HIDDENCAT__\n");
  });
});
