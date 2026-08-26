import { MediaWikiGallery } from "./MediaWikiGallery";

describe("MediaWikiGallery", () => {
  it("should render with no options", () => {
    const gallery = new MediaWikiGallery([
      { file: "Example.jpg" },
      { file: "Example2.jpg", caption: "A caption" },
    ]);
    expect(gallery.build()).toBe(
      "<gallery>\nExample.jpg\nExample2.jpg|A caption\n</gallery>\n"
    );
  });

  it("should render with all options", () => {
    const gallery = new MediaWikiGallery([{ file: "Example.jpg" }], {
      mode: "packed",
      widths: 120,
      heights: 120,
      perrow: 4,
      caption: "Gallery caption",
      class: "custom-gallery",
      showfilename: true,
    });
    expect(gallery.build()).toBe(
      '<gallery mode="packed" widths="120" heights="120" perrow="4" caption="Gallery caption" class="custom-gallery" showfilename="yes">\nExample.jpg\n</gallery>\n'
    );
  });
});
