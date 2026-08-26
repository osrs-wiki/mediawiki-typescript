import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

/** Full Help:Images#Gallery_syntax coverage. */
describe("parse - Help:Images gallery syntax", () => {
  test("a minimal gallery", async () => {
    const input = "<gallery>\nExample.jpg\nExample2.jpg\n</gallery>\n";
    expect(await build(input)).toBe(input);
  });

  test("a gallery with captions", async () => {
    const input = "<gallery>\nExample.jpg|A caption\nExample2.jpg|Another caption\n</gallery>\n";
    expect(await build(input)).toBe(input);
  });

  test("a gallery with mixed captioned/uncaptioned items", async () => {
    const input = "<gallery>\nExample.jpg\nExample2.jpg|A caption\n</gallery>\n";
    expect(await build(input)).toBe(input);
  });

  test("a gallery with attributes", async () => {
    const input =
      '<gallery mode="packed" widths="120" heights="120" perrow="4" caption="A gallery" class="custom" showfilename="yes">\nExample.jpg\n</gallery>\n';
    expect(await build(input)).toBe(input);
  });

  test("blank lines within the gallery body are ignored", async () => {
    const input = "<gallery>\nExample.jpg\n\nExample2.jpg\n</gallery>\n";
    const result = await build(input);
    expect(result).toBe("<gallery>\nExample.jpg\nExample2.jpg\n</gallery>\n");
  });

  test("an unrecognized mode is dropped rather than misrendered", async () => {
    const input = '<gallery mode="bogus">\nExample.jpg\n</gallery>\n';
    const result = await build(input);
    expect(result).toBe("<gallery>\nExample.jpg\n</gallery>\n");
  });

  test("an inline gallery mid-paragraph (not at the start of a line)", async () => {
    // MediaWikiGallery.build() always ends with its own trailing newline (a block-level
    // construct), so a gallery embedded mid-paragraph doesn't round-trip byte-for-byte —
    // consistent with this project's "best-effort semantic equivalence" goal.
    const input = "Some text <gallery>\nExample.jpg\n</gallery> more text";
    expect(await build(input)).toBe("Some text <gallery>\nExample.jpg\n</gallery>\n more text");
  });
});
