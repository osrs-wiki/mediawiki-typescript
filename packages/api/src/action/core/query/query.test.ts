import nock from "nock";
import { MediaWikiClient } from "../../../client/MediaWikiClient";
import { query, queryRevisionContent } from "./query";

const BASE_URL = "https://example.test";

describe("query", () => {
  afterEach(() => nock.cleanAll());

  test("merges titles + prop into a single action=query call", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", titles: "Jupiter", prop: "info" })
      .reply(200, { query: { pages: [{ pageid: 1, ns: 0, title: "Jupiter", contentmodel: "wikitext" }] } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const { pages } = await query(client, { titles: ["Jupiter"], prop: ["info"] as const });

    expect(pages).toEqual([{ pageid: 1, ns: 0, title: "Jupiter", contentmodel: "wikitext" }]);
  });
});

describe("queryRevisionContent", () => {
  afterEach(() => nock.cleanAll());

  test("shapes the extracted revision content via the content bridge", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query(true)
      .reply(200, {
        query: {
          pages: [
            {
              pageid: 1,
              ns: 0,
              title: "Jupiter",
              revisions: [{ revid: 1, parentid: 0, slots: { main: { contentmodel: "wikitext", content: "Hello" } } }],
            },
          ],
        },
      });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const [result] = await queryRevisionContent(client, { titles: ["Jupiter"] });

    expect(result).toEqual({ pageid: 1, title: "Jupiter", content: "Hello" });
  });

  test("skips missing/invalid pages, which have no pageid", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query(true)
      .reply(200, {
        query: {
          pages: [
            { ns: 0, title: "Does Not Exist", missing: true },
            { title: "Invalid|Title", invalid: true },
            {
              pageid: 1,
              ns: 0,
              title: "Jupiter",
              revisions: [{ revid: 1, parentid: 0, slots: { main: { contentmodel: "wikitext", content: "Hello" } } }],
            },
          ],
        },
      });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await queryRevisionContent(client, { titles: ["Does Not Exist", "Invalid|Title", "Jupiter"] });

    expect(result).toEqual([{ pageid: 1, title: "Jupiter", content: "Hello" }]);
  });
});
