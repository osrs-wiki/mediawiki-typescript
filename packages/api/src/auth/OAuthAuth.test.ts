import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { OAuthAuth } from "./OAuthAuth";

const BASE_URL = "https://example.test";

describe("OAuthAuth", () => {
  afterEach(() => nock.cleanAll());

  test("requiresCsrfToken() is false", () => {
    const auth = new OAuthAuth({ consumerKey: "k", consumerSecret: "s", accessToken: "t", accessSecret: "ts" });
    expect(auth.requiresCsrfToken()).toBe(false);
  });

  test("signs every request with an OAuth Authorization header", async () => {
    let authorizationHeader: string | undefined;
    const scope = nock(BASE_URL)
      .get("/w/api.php")
      .query(true)
      .reply(function reply() {
        authorizationHeader = this.req.headers.authorization as string | undefined;
        return [200, { query: { general: { generator: "MediaWiki 1.43.0" } } }];
      });

    const client = new MediaWikiClient({
      baseUrl: BASE_URL,
      auth: new OAuthAuth({ consumerKey: "k", consumerSecret: "s", accessToken: "t", accessSecret: "ts" }),
    });

    await client.call("query", { meta: "siteinfo" });

    expect(scope.isDone()).toBe(true);
    expect(authorizationHeader).toMatch(/^OAuth /);
    expect(authorizationHeader).toContain('oauth_consumer_key="k"');
  });
});
