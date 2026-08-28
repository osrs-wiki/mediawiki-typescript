import nock from "nock";
import type { AxiosInstance } from "axios";
import { MediaWikiClient } from "../client/MediaWikiClient";
import type { AuthStrategy } from "../auth/AuthStrategy";
import { createPage, getPageSource, updatePage } from "./pages";

const BASE_URL = "https://example.test";

describe("getPageSource", () => {
  afterEach(() => nock.cleanAll());

  test("defaults to returning the raw source string", async () => {
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
    const page = await getPageSource(client, "Jupiter");

    expect(page.source).toBe("Jupiter is a planet.");
    expect(page.id).toBe(1);
  });
});

describe("createPage", () => {
  afterEach(() => nock.cleanAll());

  test("omits a token when no auth strategy requires one", async () => {
    const scope = nock(BASE_URL)
      .post("/w/rest.php/v1/page", (body: { token?: string }) => body.token === undefined)
      .reply(201, { id: 2, title: "New Page", source: "Hello world" });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await createPage(client, { title: "New Page", source: "Hello world", comment: "Creating a test page" });

    expect(scope.isDone()).toBe(true);
  });

  test("attaches a CSRF token when the auth strategy requires one", async () => {
    const fakeCookieAuth: AuthStrategy = {
      attach: (_axiosInstance: AxiosInstance) => undefined,
      requiresCsrfToken: () => true,
    };
    const client = new MediaWikiClient({ baseUrl: BASE_URL, auth: fakeCookieAuth });

    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", meta: "tokens", type: "csrf" })
      .reply(200, { query: { tokens: { csrftoken: "tok" } } });

    const scope = nock(BASE_URL)
      .post("/w/rest.php/v1/page", (body: { token?: string }) => body.token === "tok")
      .reply(201, { id: 2, title: "New Page", source: "Hello world" });

    await createPage(client, { title: "New Page", source: "Hello world", comment: "Creating a test page" });

    expect(scope.isDone()).toBe(true);
  });
});

describe("updatePage", () => {
  afterEach(() => nock.cleanAll());

  test("normalizes MediaWikiContents via the content bridge", async () => {
    const scope = nock(BASE_URL)
      .put("/w/rest.php/v1/page/Sandbox", (body: { source?: string }) => body.source === "Hello world")
      .reply(200, { id: 1, title: "Sandbox", source: "Hello world" });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await updatePage(client, "Sandbox", { source: "Hello world", comment: "Testing" });

    expect(scope.isDone()).toBe(true);
  });
});
