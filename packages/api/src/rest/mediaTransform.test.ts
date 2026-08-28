import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { getFile } from "./media";
import { htmlToWikitext, wikitextToHtml, wikitextToLint } from "./transform";

const BASE_URL = "https://example.test";

describe("getFile", () => {
  afterEach(() => nock.cleanAll());

  test("fetches file metadata", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/file/File%3ATest.jpg")
      .reply(200, {
        title: "File:Test.jpg",
        file_description_url: "//example.test/wiki/File:Test.jpg",
        latest: { timestamp: "t", user: { id: 1, name: "Bot" } },
        preferred: { mediatype: "BITMAP", size: 100, width: 10, height: 10, duration: null, url: "//example.test/Test.jpg" },
        original: { mediatype: "BITMAP", size: 100, width: 10, height: 10, duration: null, url: "//example.test/Test.jpg" },
      });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(getFile(client, "File:Test.jpg")).resolves.toMatchObject({ title: "File:Test.jpg" });
  });
});

describe("transform", () => {
  afterEach(() => nock.cleanAll());

  test("wikitextToHtml posts the wikitext and returns raw HTML", async () => {
    nock(BASE_URL)
      .post("/w/rest.php/v1/transform/wikitext/to/html/Jupiter", { wikitext: "== Hello ==" })
      .reply(200, "<h2>Hello</h2>");

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(wikitextToHtml(client, "Jupiter", "== Hello ==")).resolves.toBe("<h2>Hello</h2>");
  });

  test("htmlToWikitext shapes the result via the content bridge", async () => {
    nock(BASE_URL)
      .post("/w/rest.php/v1/transform/html/to/wikitext/Jupiter", { html: "<h2>Hello</h2>" })
      .reply(200, "== Hello ==");

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(htmlToWikitext(client, "Jupiter", "<h2>Hello</h2>")).resolves.toBe("== Hello ==");
  });

  test("wikitextToLint returns the lint error array", async () => {
    nock(BASE_URL)
      .post("/w/rest.php/v1/transform/wikitext/to/lint/Jupiter")
      .reply(200, [{ type: "fostered", dsr: [0, 1, 0, 0] }]);

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await wikitextToLint(client, "Jupiter", "<table><table>");

    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("fostered");
  });
});
