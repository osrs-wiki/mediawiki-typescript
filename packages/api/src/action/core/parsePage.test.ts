import nock from "nock";
import { MediaWikiClient } from "../../client/MediaWikiClient";
import { parsePage } from "./parsePage";

const BASE_URL = "https://example.test";

describe("parsePage", () => {
  afterEach(() => nock.cleanAll());

  test("defaults to returning the raw wikitext string", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "parse", format: "json", formatversion: "2", prop: "wikitext", page: "Sandbox" })
      .reply(200, { parse: { title: "Sandbox", pageid: 1, wikitext: "Hello '''world'''" } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await parsePage(client, { page: "Sandbox" });

    expect(result).toEqual({ title: "Sandbox", pageid: 1, content: "Hello '''world'''" });
  });

  test("parses into MediaWikiContent[] when responseFormat is \"contents\"", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query(true)
      .reply(200, { parse: { title: "Sandbox", pageid: 1, wikitext: "Hello world" } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await parsePage(client, { page: "Sandbox", responseFormat: "contents" });

    expect(Array.isArray(result.content)).toBe(true);
  });
});
