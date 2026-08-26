import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

/** Full Help:Images option coverage for `[[File:...]]`/`[[Image:...]]` syntax. */
describe("parse - Help:Images file/image options", () => {
  test("border alone", async () => {
    expect(await build("[[File:Example.jpg|border]]")).toBe(
      "[[File:Example.jpg|border]]"
    );
  });

  test("border combined with frameless", async () => {
    expect(await build("[[File:Example.jpg|border|frameless]]")).toContain(
      "border"
    );
  });

  test.each(["frameless", "frame", "framed", "thumb", "thumbnail"])(
    "format: %s",
    async (format) => {
      expect(await build(`[[File:Example.jpg|${format}]]`)).toBe(
        `[[File:Example.jpg|${format}]]`
      );
    }
  );

  test("width-only resizing", async () => {
    expect(await build("[[File:Example.jpg|200px]]")).toBe(
      "[[File:Example.jpg|200px]]"
    );
  });

  test("height-only resizing", async () => {
    expect(await build("[[File:Example.jpg|x200px]]")).toBe(
      "[[File:Example.jpg|x200px]]"
    );
  });

  test("width and height resizing", async () => {
    expect(await build("[[File:Example.jpg|300x200px]]")).toBe(
      "[[File:Example.jpg|300x200px]]"
    );
  });

  test("bare upright", async () => {
    expect(await build("[[File:Example.jpg|upright]]")).toBe(
      "[[File:Example.jpg|upright]]"
    );
  });

  test("upright with an equals value", async () => {
    expect(await build("[[File:Example.jpg|upright=2]]")).toBe(
      "[[File:Example.jpg|upright=2]]"
    );
  });

  test("upright with a space-separated value", async () => {
    const result = await build("[[File:Example.jpg|upright 2]]");
    expect(result).toBe("[[File:Example.jpg|upright=2]]");
  });

  test.each(["left", "right", "center", "none"])(
    "horizontal alignment: %s",
    async (alignment) => {
      expect(await build(`[[File:Example.jpg|${alignment}]]`)).toBe(
        `[[File:Example.jpg|${alignment}]]`
      );
    }
  );

  test.each([
    "baseline",
    "sub",
    "super",
    "top",
    "text-top",
    "middle",
    "bottom",
    "text-bottom",
  ])("vertical alignment: %s", async (alignment) => {
    expect(await build(`[[File:Example.jpg|${alignment}]]`)).toBe(
      `[[File:Example.jpg|${alignment}]]`
    );
  });

  test("link to another page", async () => {
    expect(await build("[[File:Example.jpg|link=Main Page]]")).toBe(
      "[[File:Example.jpg|link=Main Page]]"
    );
  });

  test("link to an external URL", async () => {
    expect(await build("[[File:Example.jpg|link=http://example.com]]")).toBe(
      "[[File:Example.jpg|link=http://example.com]]"
    );
  });

  test("empty link disables linking entirely", async () => {
    expect(await build("[[File:Example.jpg|link=]]")).toBe(
      "[[File:Example.jpg|link=]]"
    );
  });

  test("alt text", async () => {
    expect(await build("[[File:Example.jpg|alt=Alt text]]")).toBe(
      "[[File:Example.jpg|alt=Alt text]]"
    );
  });

  test("page number", async () => {
    expect(await build("[[File:Example.pdf|page=4]]")).toBe(
      "[[File:Example.pdf|page=4]]"
    );
  });

  test("thumbtime and start", async () => {
    expect(await build("[[File:Example.ogv|thumbtime=10|start=5]]")).toBe(
      "[[File:Example.ogv|thumbtime=10|start=5]]"
    );
  });

  test("muted and loop", async () => {
    expect(await build("[[File:Example.ogv|muted|loop]]")).toBe(
      "[[File:Example.ogv|muted|loop]]"
    );
  });

  test("lossy option", async () => {
    expect(await build("[[File:Example.tiff|lossy=false]]")).toBe(
      "[[File:Example.tiff|lossy=false]]"
    );
  });

  test("class and lang options", async () => {
    expect(await build("[[File:Example.svg|class=my-class|lang=fr]]")).toBe(
      "[[File:Example.svg|class=my-class|lang=fr]]"
    );
  });

  test("Image: namespace alias", async () => {
    expect(await build("[[Image:Example.jpg|thumb]]")).toBe(
      "[[File:Example.jpg|thumb]]"
    );
  });

  test("everything combined, with caption last", async () => {
    const input =
      "[[File:Example.jpg|thumb|300px|left|link=Main Page|A caption]]";
    const result = await build(input);
    expect(result).toBe(input);
  });
});
