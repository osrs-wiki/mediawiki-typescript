import { MediaWikiFile } from "./MediaWikiFile";
import { MediaWikiExternalLink } from "../MediaWikiExternalLink";
import { MediaWikiText } from "../MediaWikiText";

describe("MediaWikiFile", () => {
  test("caption with MediaWikiText", () => {
    expect(
      new MediaWikiFile("test.png", {
        caption: new MediaWikiText("caption", { italics: true }),
      }).build()
    ).toMatchSnapshot();
  });

  test("caption with MediaWikiContent array", () => {
    expect(
      new MediaWikiFile("test.png", {
        caption: [
          new MediaWikiText("caption ", { italics: true }),
          new MediaWikiExternalLink("link", "https://test.com"),
          new MediaWikiText(" test", { italics: true }),
        ],
      }).build()
    ).toMatchSnapshot();
  });

  test("border alone", () => {
    expect(new MediaWikiFile("test.png", { border: true }).build()).toBe(
      "[[File:test.png|border]]"
    );
  });

  test("border combined with frameless", () => {
    expect(
      new MediaWikiFile("test.png", { border: true, format: "frameless" }).build()
    ).toBe("[[File:test.png|border|frameless]]");
  });

  test.each(["frameless", "frame", "framed", "thumb", "thumbnail"] as const)(
    "format: %s",
    (format) => {
      expect(new MediaWikiFile("test.png", { format }).build()).toBe(
        `[[File:test.png|${format}]]`
      );
    }
  );

  test("width-only resizing", () => {
    expect(
      new MediaWikiFile("test.png", { resizing: { width: 200 } }).build()
    ).toBe("[[File:test.png|200px]]");
  });

  test("height-only resizing uses the x{height}px form", () => {
    expect(
      new MediaWikiFile("test.png", { resizing: { height: 200 } }).build()
    ).toBe("[[File:test.png|x200px]]");
  });

  test("width and height resizing", () => {
    expect(
      new MediaWikiFile("test.png", { resizing: { width: 300, height: 200 } }).build()
    ).toBe("[[File:test.png|300x200px]]");
  });

  test("bare upright resizing", () => {
    expect(
      new MediaWikiFile("test.png", { resizing: { upright: true } }).build()
    ).toBe("[[File:test.png|upright]]");
  });

  test("upright with a value", () => {
    expect(
      new MediaWikiFile("test.png", { resizing: { upright: 2 } }).build()
    ).toBe("[[File:test.png|upright=2]]");
  });

  test.each(["left", "right", "center", "none"] as const)(
    "horizontal alignment: %s",
    (horizontalAlignment) => {
      expect(
        new MediaWikiFile("test.png", { horizontalAlignment }).build()
      ).toBe(`[[File:test.png|${horizontalAlignment}]]`);
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
  ] as const)("vertical alignment: %s", (verticalAlignment) => {
    expect(new MediaWikiFile("test.png", { verticalAlignment }).build()).toBe(
      `[[File:test.png|${verticalAlignment}]]`
    );
  });

  test("link to another page", () => {
    expect(new MediaWikiFile("test.png", { link: "Main Page" }).build()).toBe(
      "[[File:test.png|link=Main Page]]"
    );
  });

  test("link to an external URL", () => {
    expect(
      new MediaWikiFile("test.png", { link: "http://example.com" }).build()
    ).toBe("[[File:test.png|link=http://example.com]]");
  });

  test("empty link disables linking entirely", () => {
    expect(new MediaWikiFile("test.png", { link: "" }).build()).toBe(
      "[[File:test.png|link=]]"
    );
  });

  test("alt text", () => {
    expect(new MediaWikiFile("test.png", { alt: "Alt text" }).build()).toBe(
      "[[File:test.png|alt=Alt text]]"
    );
  });

  test("page number for multi-page media", () => {
    expect(new MediaWikiFile("test.pdf", { page: 4 }).build()).toBe(
      "[[File:test.pdf|page=4]]"
    );
  });

  test("thumbtime and start for video", () => {
    expect(
      new MediaWikiFile("test.ogv", { thumbtime: "10", start: "5" }).build()
    ).toBe("[[File:test.ogv|thumbtime=10|start=5]]");
  });

  test("muted and loop flags", () => {
    expect(
      new MediaWikiFile("test.ogv", { muted: true, loop: true }).build()
    ).toBe("[[File:test.ogv|muted|loop]]");
  });

  test("lossy option", () => {
    expect(new MediaWikiFile("test.tiff", { lossy: false }).build()).toBe(
      "[[File:test.tiff|lossy=false]]"
    );
  });

  test("class and lang options", () => {
    expect(
      new MediaWikiFile("test.svg", { class: "my-class", lang: "fr" }).build()
    ).toBe("[[File:test.svg|class=my-class|lang=fr]]");
  });

  test("multiple combined options with a caption last", () => {
    expect(
      new MediaWikiFile("test.png", {
        format: "thumb",
        resizing: { width: 300 },
        horizontalAlignment: "left",
        caption: "A caption",
      }).build()
    ).toBe("[[File:test.png|thumb|300px|left|A caption]]");
  });
});
