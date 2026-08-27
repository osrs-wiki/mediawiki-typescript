import nock from "nock";
import { MediaWikiClient } from "../../client/MediaWikiClient";
import { compare } from "./compare";
import { opensearch } from "./opensearch";

const BASE_URL = "https://example.test";

describe("compare", () => {
  afterEach(() => nock.cleanAll());

  test("calls action=compare with the given from/to params", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "compare", format: "json", formatversion: "2", fromrev: "1", torev: "2" })
      .reply(200, { compare: { fromrevid: 1, torevid: 2, body: "<tr>diff</tr>" } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await compare(client, { fromrev: 1, torev: 2 });

    expect(result.compare.body).toContain("diff");
  });
});

describe("opensearch", () => {
  afterEach(() => nock.cleanAll());

  test("returns the raw 4-element tuple", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "opensearch", format: "json", formatversion: "2", search: "Jupiter" })
      .reply(200, ["Jupiter", ["Jupiter"], [], ["https://example.test/wiki/Jupiter"]]);

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await opensearch(client, { search: "Jupiter" });

    expect(result[1]).toEqual(["Jupiter"]);
  });
});
