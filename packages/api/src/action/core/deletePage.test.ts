import nock from "nock";
import { MediaWikiClient } from "../../client/MediaWikiClient";
import { deletePage } from "./deletePage";
import { movePage } from "./movePage";

const BASE_URL = "https://example.test";

describe("deletePage", () => {
  afterEach(() => nock.cleanAll());

  test("fetches a CSRF token and posts action=delete", async () => {
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { query: { tokens: { csrftoken: "tok" } } });
    const scope = nock(BASE_URL)
      .post("/w/api.php", (body: string) => new URLSearchParams(body).get("action") === "delete")
      .reply(200, { delete: { title: "Sandbox", reason: "cleanup" } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await deletePage(client, { title: "Sandbox", reason: "cleanup" });

    expect(result.delete.title).toBe("Sandbox");
    expect(scope.isDone()).toBe(true);
  });
});

describe("movePage", () => {
  afterEach(() => nock.cleanAll());

  test("fetches a CSRF token and posts action=move", async () => {
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { query: { tokens: { csrftoken: "tok" } } });
    const scope = nock(BASE_URL)
      .post("/w/api.php", (body: string) => new URLSearchParams(body).get("action") === "move")
      .reply(200, { move: { from: "Old", to: "New" } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const result = await movePage(client, { from: "Old", to: "New" });

    expect(result.move).toEqual({ from: "Old", to: "New" });
    expect(scope.isDone()).toBe(true);
  });
});
