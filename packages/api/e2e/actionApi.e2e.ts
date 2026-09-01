import { ActionApiClient, MediaWikiClient } from "../src";

const WIKI_URL = "https://en.wikipedia.org";

describe("ActionApiClient (en.wikipedia.org, read-only)", () => {
  const client = new MediaWikiClient({ baseUrl: WIKI_URL });
  const actionApi = new ActionApiClient(client);

  test("detects wiki capabilities via meta=siteinfo", async () => {
    const capabilities = await client.getCapabilities();

    expect(capabilities.generator).toMatch(/^MediaWiki /);
  });

  test("query.query fetches info + revisions for a known page", async () => {
    const { pages } = await actionApi.query.query({
      titles: ["Jupiter"],
      prop: ["info", "revisions"] as const,
      params: { rvprop: "ids", rvlimit: 1 },
    });

    expect(pages).toHaveLength(1);
    expect(pages[0].title).toBe("Jupiter");
    expect(pages[0].contentmodel).toBe("wikitext");
    expect(pages[0].revisions?.[0]?.revid).toBeGreaterThan(0);
  });

  test("opensearch finds titles starting with a known prefix", async () => {
    const [term, titles] = await actionApi.opensearch({ search: "Jupit", limit: 5 });

    expect(term).toBe("Jupit");
    expect(titles).toContain("Jupiter");
  });
});
