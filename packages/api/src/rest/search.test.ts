import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { searchPages, searchTitles } from "./search";

const BASE_URL = "https://example.test";

describe("searchPages", () => {
  afterEach(() => nock.cleanAll());

  test("unwraps the pages array", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/search/page")
      .query({ q: "jupiter", limit: "20" })
      .reply(200, { pages: [{ id: 1, key: "Jupiter", title: "Jupiter", excerpt: "...", matched_title: null, description: null, thumbnail: null }] });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const results = await searchPages(client, { q: "jupiter", limit: 20 });

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Jupiter");
  });
});

describe("searchTitles", () => {
  afterEach(() => nock.cleanAll());

  test("unwraps the pages array", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/search/title")
      .query({ q: "solar" })
      .reply(200, { pages: [] });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(searchTitles(client, { q: "solar" })).resolves.toEqual([]);
  });
});
