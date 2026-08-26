import { parseAttributes } from "../attributes";

describe("parseAttributes", () => {
  test("parses double-quoted attributes", () => {
    expect(parseAttributes('class="wikitable" style="width:100%"')).toEqual({
      class: "wikitable",
      style: "width:100%",
    });
  });

  test("parses single-quoted attributes", () => {
    expect(parseAttributes("class='wikitable' style='width:100%'")).toEqual({
      class: "wikitable",
      style: "width:100%",
    });
  });

  test("parses attributes from a full open-tag image", () => {
    expect(parseAttributes('<div class="x">')).toEqual({ class: "x" });
  });

  test("returns undefined when there are no attributes", () => {
    expect(parseAttributes("no attributes here")).toBeUndefined();
  });
});
