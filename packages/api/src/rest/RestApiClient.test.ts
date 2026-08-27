import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { RestApiClient } from "./RestApiClient";

const BASE_URL = "https://example.test";

describe("RestApiClient", () => {
  afterEach(() => nock.cleanAll());

  test("binds page.getSource so callers don't have to pass the client", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/page/Jupiter")
      .reply(200, {
        id: 1,
        key: "Jupiter",
        title: "Jupiter",
        latest: { id: 10, timestamp: "2020-01-01T00:00:00Z" },
        content_model: "wikitext",
        license: { url: "//example.test/license", title: "CC-BY-SA" },
        source: "Jupiter is a planet.",
      });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const restApi = new RestApiClient(client);

    await expect(restApi.page.getSource("Jupiter")).resolves.toMatchObject({ source: "Jupiter is a planet." });
  });

  test("binds searchPages so callers don't have to pass the client", async () => {
    nock(BASE_URL).get("/w/rest.php/v1/search/page").query({ q: "jupiter" }).reply(200, { pages: [] });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const restApi = new RestApiClient(client);

    await expect(restApi.searchPages({ q: "jupiter" })).resolves.toEqual([]);
  });
});
