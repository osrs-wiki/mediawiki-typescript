import { MediaWikiClient, RestApiClient } from "../src";

const WIKI_URL = "https://en.wikipedia.org";

describe("RestApiClient (en.wikipedia.org, read-only)", () => {
  const client = new MediaWikiClient({ baseUrl: WIKI_URL });
  const restApi = new RestApiClient(client);

  test("searchPages finds a known page", async () => {
    const results = await restApi.searchPages({ q: "Jupiter", limit: 5 });

    expect(results.some((result) => result.title === "Jupiter")).toBe(true);
  });

  test("page.getBare fetches metadata for a known page", async () => {
    const page = await restApi.page.getBare("Jupiter");

    expect(page.title).toBe("Jupiter");
    expect(page.content_model).toBe("wikitext");
  });

  test("page.getSource fetches wikitext for a known page", async () => {
    const page = await restApi.page.getSource("Jupiter");

    expect(typeof page.source).toBe("string");
    expect((page.source as string).length).toBeGreaterThan(0);
  });
});
