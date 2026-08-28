import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { MediaWikiAuthError } from "../errors/MediaWikiAuthError";
import { BotPasswordAuth } from "./BotPasswordAuth";

const BASE_URL = "https://example.test";

describe("BotPasswordAuth", () => {
  afterEach(() => nock.cleanAll());

  test("attaches a cookie jar to the client's axios instance", () => {
    const client = new MediaWikiClient({ baseUrl: BASE_URL, auth: new BotPasswordAuth({ username: "u", password: "p" }) });

    expect((client.axios.defaults as { jar?: unknown }).jar).toBeDefined();
    expect(client.axios.defaults.withCredentials).toBe(true);
  });

  test("requiresCsrfToken() is true", () => {
    expect(new BotPasswordAuth({ username: "u", password: "p" }).requiresCsrfToken()).toBe(true);
  });

  test("logs in via clientlogin, fetching a login token first", async () => {
    nock(BASE_URL)
      .get("/w/api.php")
      .query({ action: "query", format: "json", formatversion: "2", meta: "tokens", type: "login" })
      .reply(200, { query: { tokens: { logintoken: "logintok" } } });

    const scope = nock(BASE_URL)
      .post("/w/api.php", (body: string) => {
        const params = new URLSearchParams(body);
        return (
          params.get("action") === "clientlogin" &&
          params.get("username") === "MyBot@pw" &&
          params.get("logintoken") === "logintok"
        );
      })
      .reply(200, { clientlogin: { status: "PASS" } });

    const client = new MediaWikiClient({
      baseUrl: BASE_URL,
      auth: new BotPasswordAuth({ username: "MyBot@pw", password: "secret" }),
    });

    await client.ensureAuthenticated();
    expect(scope.isDone()).toBe(true);
  });

  test("throws MediaWikiAuthError when clientlogin does not report PASS", async () => {
    nock(BASE_URL).get("/w/api.php").query(true).reply(200, { query: { tokens: { logintoken: "logintok" } } });
    nock(BASE_URL)
      .post("/w/api.php")
      .reply(200, { clientlogin: { status: "FAIL", message: "Incorrect password" } });

    const client = new MediaWikiClient({
      baseUrl: BASE_URL,
      auth: new BotPasswordAuth({ username: "MyBot@pw", password: "wrong" }),
    });

    await expect(client.ensureAuthenticated()).rejects.toThrow(MediaWikiAuthError);
  });
});
