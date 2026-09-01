import nock from "nock";
import { MediaWikiClient } from "../../../client/MediaWikiClient";
import { queryAllPages, queryBacklinks, queryCategoryMembers, querySearch } from "./lists";

const BASE_URL = "https://example.test";

describe("query lists", () => {
  afterEach(() => nock.cleanAll());

  test("queryAllPages prefixes its params with \"ap\"", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", list: "allpages", apnamespace: "0" })
      .reply(200, { query: { allpages: [{ pageid: 1, ns: 0, title: "A" }] } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(queryAllPages(client, { namespace: 0 })).resolves.toEqual([{ pageid: 1, ns: 0, title: "A" }]);
  });

  test("querySearch prefixes its params with \"sr\"", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", list: "search", srsearch: "jupiter" })
      .reply(200, { query: { search: [{ ns: 0, title: "Jupiter", pageid: 1 }] } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(querySearch(client, { search: "jupiter" })).resolves.toEqual([
      { ns: 0, title: "Jupiter", pageid: 1 },
    ]);
  });

  test("queryCategoryMembers prefixes its params with \"cm\"", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", list: "categorymembers", cmtitle: "Category:X" })
      .reply(200, { query: { categorymembers: [{ pageid: 1, ns: 0, title: "A" }] } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(queryCategoryMembers(client, { title: "Category:X" })).resolves.toEqual([
      { pageid: 1, ns: 0, title: "A" },
    ]);
  });

  test("queryBacklinks prefixes its params with \"bl\"", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", list: "backlinks", bltitle: "Jupiter" })
      .reply(200, { query: { backlinks: [{ pageid: 2, ns: 0, title: "B" }] } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(queryBacklinks(client, { title: "Jupiter" })).resolves.toEqual([{ pageid: 2, ns: 0, title: "B" }]);
  });
});
