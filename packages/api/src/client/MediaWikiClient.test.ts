import nock from "nock";
import type { AuthStrategy } from "../auth/AuthStrategy";
import { MediaWikiClient } from "./MediaWikiClient";
import { MediaWikiApiError } from "../errors/MediaWikiApiError";

const BASE_URL = "https://example.test";

describe("MediaWikiClient", () => {
  afterEach(() => nock.cleanAll());

  test("calls the Action API with format=json&formatversion=2 defaults", async () => {
    const scope = nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", meta: "siteinfo" })
      .reply(200, { query: { general: { generator: "MediaWiki 1.43.0" } } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const response = await client.call("query", { meta: "siteinfo" });

    expect(response).toEqual({ query: { general: { generator: "MediaWiki 1.43.0" } } });
    expect(scope.isDone()).toBe(true);
  });

  test("normalizes Action API errors into MediaWikiApiError", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query(true)
      .reply(200, { error: { code: "badtoken", info: "Invalid token" } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(client.call("edit", {})).rejects.toMatchObject(
      new MediaWikiApiError("Invalid token", { code: "badtoken" })
    );
  });

  test("normalizes an errors[] envelope into MediaWikiApiError", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query(true)
      .reply(200, { errors: [{ code: "badtoken", text: "Invalid token" }] });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(client.call("edit", {})).rejects.toMatchObject(
      new MediaWikiApiError("Invalid token", { code: "badtoken" })
    );
  });

  test("retries on maxlag reported via an errors[] envelope", async () => {
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { errors: [{ code: "maxlag", text: "Waiting" }] });
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { query: { general: {} } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL, maxlagRetrySeconds: 5 });
    await expect(client.call("query", { meta: "siteinfo" })).resolves.toEqual({ query: { general: {} } });
  });

  test("retries on maxlag until it succeeds", async () => {
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { error: { code: "maxlag", info: "Waiting" } });
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { query: { general: {} } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL, maxlagRetrySeconds: 5 });
    await expect(client.call("query", { meta: "siteinfo" })).resolves.toEqual({ query: { general: {} } });
  });

  test("caches tokens after the first fetch", async () => {
    const scope = nock(BASE_URL)
      .get("/w/api.php")
      .query(true)
      .once()
      .reply(200, { query: { tokens: { csrftoken: "abc+\\" } } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(client.getToken("csrf")).resolves.toBe("abc+\\");
    await expect(client.getToken("csrf")).resolves.toBe("abc+\\");
    expect(scope.isDone()).toBe(true);
  });

  test("getToken() runs ensureAuthenticated() by default, but skips it when skipAuth is set", async () => {
    const login = jest.fn().mockResolvedValue(undefined);
    const auth: AuthStrategy = { attach: () => undefined, requiresCsrfToken: () => true, login };
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { query: { tokens: { csrftoken: "abc" } } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL, auth });
    await client.getToken("csrf");

    expect(login).toHaveBeenCalledTimes(1);
  });

  test("getToken() with skipAuth does not trigger the login handshake", async () => {
    const login = jest.fn().mockResolvedValue(undefined);
    const auth: AuthStrategy = { attach: () => undefined, requiresCsrfToken: () => true, login };
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { query: { tokens: { logintoken: "tok" } } });

    const client = new MediaWikiClient({ baseUrl: BASE_URL, auth });
    await client.getToken("login", { skipAuth: true });

    expect(login).not.toHaveBeenCalled();
  });
});
