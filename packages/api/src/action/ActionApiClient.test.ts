import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { ActionApiClient } from "./ActionApiClient";

const BASE_URL = "https://example.test";

describe("ActionApiClient", () => {
  afterEach(() => nock.cleanAll());

  test("binds core.query so callers don't have to pass the client", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", titles: "Jupiter", prop: "info" })
      .reply(200, { query: { pages: [{ pageid: 1, ns: 0, title: "Jupiter" }] } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const actionApi = new ActionApiClient(client);
    const { pages } = await actionApi.query.query({ titles: ["Jupiter"], prop: ["info"] as const });

    expect(pages).toEqual([{ pageid: 1, ns: 0, title: "Jupiter" }]);
  });

  test("binds core.opensearch so callers don't have to pass the client", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "opensearch", format: "json", formatversion: "2", search: "Jupiter" })
      .reply(200, ["Jupiter", ["Jupiter"], [], []]);

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const actionApi = new ActionApiClient(client);

    await expect(actionApi.opensearch({ search: "Jupiter" })).resolves.toEqual(["Jupiter", ["Jupiter"], [], []]);
  });
});
