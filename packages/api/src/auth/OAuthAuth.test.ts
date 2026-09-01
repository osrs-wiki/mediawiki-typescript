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

  test("signs POST requests using the actual body params, not an empty URLSearchParams cast", async () => {
    const signatures: string[] = [];
    const captureSignature = function reply(this: nock.ReplyFnContext) {
      const header = this.req.headers.authorization as string;
      signatures.push(/oauth_signature="([^"]+)"/.exec(header)?.[1] ?? "");
      return [200, {}];
    };
    nock(BASE_URL).post("/w/api.php").reply(captureSignature);
    nock(BASE_URL).post("/w/api.php").reply(captureSignature);

    const client = new MediaWikiClient({
      baseUrl: BASE_URL,
      auth: new OAuthAuth({ consumerKey: "k", consumerSecret: "s", accessToken: "t", accessSecret: "ts" }),
    });

    await client.call("edit", { title: "Page One", text: "content" }, { method: "POST", skipAuth: true });
    await client.call("edit", { title: "Page Two", text: "different" }, { method: "POST", skipAuth: true });

    // If the body params weren't actually included in the signature base string, both requests
    // would sign as if the body were empty and produce the same oauth_signature.
    expect(signatures[0]).not.toBe(signatures[1]);
  });
});
