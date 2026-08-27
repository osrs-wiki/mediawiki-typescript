import nock from "nock";
import { MediaWikiClient } from "../../client/MediaWikiClient";
import { edit } from "./edit";

const BASE_URL = "https://example.test";

describe("edit", () => {
  afterEach(() => nock.cleanAll());

  test("resolves MediaWikiContents to wikitext, fetches a CSRF token, and posts", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", meta: "tokens", type: "csrf" })
      .reply(200, { query: { tokens: { csrftoken: "abc+\\" } } });

    const scope = nock(BASE_URL)
      .post("/w/api.php", (body: string) => {
        const params = new URLSearchParams(body);
        return (
          params.get("action") === "edit" &&
          params.get("title") === "Sandbox" &&
          params.get("text") === "Hello world" &&
          params.get("token") === "abc+\\"
        );
      })
      .reply(200, { edit: { result: "Success", pageid: 1, title: "Sandbox", newrevid: 2 } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await edit(client, { title: "Sandbox", source: "Hello world" });

    expect(result.edit.result).toBe("Success");
    expect(scope.isDone()).toBe(true);
  });
});
