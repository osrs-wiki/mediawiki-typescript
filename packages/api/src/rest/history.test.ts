import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { compareRevisions, getPageHistory, getPageHistoryCounts, getRevision } from "./history";

const BASE_URL = "https://example.test";

describe("history", () => {
  afterEach(() => nock.cleanAll());

  test("getPageHistory returns the revisions segment", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/page/Jupiter/history")
      .query({ filter: "bot" })
      .reply(200, { latest: "/page/Jupiter/history", revisions: [{ id: 1, size: 100, minor: false, timestamp: "t", user: { id: 1, name: "Bot" }, comment: "c", delta: 10 }] });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await getPageHistory(client, "Jupiter", { filter: "bot" });

    expect(result.revisions).toHaveLength(1);
  });

  test("getPageHistoryCounts returns a count object", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/page/Jupiter/history/counts/edits")
      .reply(200, { count: 500, limit: false });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(getPageHistoryCounts(client, "Jupiter", "edits")).resolves.toEqual({ count: 500, limit: false });
  });

  test("getRevision returns bare revision metadata", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/revision/764138197/bare")
      .reply(200, { id: 764138197, size: 100, minor: false, timestamp: "t", user: { id: 1, name: "Bot" }, comment: "c", delta: 10 });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(getRevision(client, 764138197)).resolves.toMatchObject({ id: 764138197 });
  });

  test("compareRevisions returns the diff array", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/revision/1/compare/2")
      .reply(200, {
        from: { id: 1, slot_role: "main", sections: [] },
        to: { id: 2, slot_role: "main", sections: [] },
        diff: [{ type: 0, text: "unchanged", offset: { from: 0, to: 0 } }],
      });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await compareRevisions(client, 1, 2);

    expect(result.diff).toHaveLength(1);
  });
});
