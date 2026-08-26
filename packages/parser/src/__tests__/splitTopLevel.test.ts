import { splitAttributesAndContent, splitTopLevel } from "../blocks";

describe("splitTopLevel", () => {
  test("splits on a simple separator", () => {
    expect(splitTopLevel("a|b|c", "|")).toEqual(["a", "b", "c"]);
  });

  test("ignores separators nested inside {{ }}", () => {
    expect(splitTopLevel("a{{tpl|x}}|b", "|")).toEqual(["a{{tpl|x}}", "b"]);
  });

  test("ignores separators nested inside [[ ]]", () => {
    expect(splitTopLevel("a[[Page|Label]]|b", "|")).toEqual(["a[[Page|Label]]", "b"]);
  });

  test("supports multi-character separators (e.g. !! or ||)", () => {
    expect(splitTopLevel("a!!b!!c", "!!")).toEqual(["a", "b", "c"]);
  });

  test("returns the whole string when the separator never appears", () => {
    expect(splitTopLevel("no separator here", "|")).toEqual(["no separator here"]);
  });
});

describe("splitAttributesAndContent", () => {
  test("splits attributes from content on the first top-level pipe", () => {
    expect(splitAttributesAndContent('class="x" | content')).toEqual({
      attributes: 'class="x"',
      content: "content",
    });
  });

  test("treats the whole fragment as content when there's no top-level pipe", () => {
    expect(splitAttributesAndContent("just content")).toEqual({ content: "just content" });
  });

  test("does not split on a pipe nested inside a link", () => {
    expect(splitAttributesAndContent("[[Page|Label]]")).toEqual({
      content: "[[Page|Label]]",
    });
  });
});
