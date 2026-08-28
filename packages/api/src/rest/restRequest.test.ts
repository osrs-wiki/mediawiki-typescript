import nock from "nock";
import { MediaWikiClient } from "../client/MediaWikiClient";
import { MediaWikiApiError } from "../errors/MediaWikiApiError";
import { encodeTitle, restRequest } from "./restRequest";

const BASE_URL = "https://example.test";

describe("restRequest", () => {
  afterEach(() => nock.cleanAll());

  test("resolves with the response body on success", async () => {
    nock(BASE_URL).get("/w/rest.php/v1/page/Jupiter/bare").reply(200, { id: 1, title: "Jupiter" });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    const body = await restRequest<{ id: number; title: string }>(client, {
      method: "GET",
      url: "/page/Jupiter/bare",
    });

    expect(body).toEqual({ id: 1, title: "Jupiter" });
  });

  test("normalizes a REST error body into a MediaWikiApiError using the numeric HTTP status as code", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/page/Missing/bare")
      .reply(404, { httpCode: 404, httpReason: "Not Found", message: "The specified page does not exist." });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(
      restRequest(client, { method: "GET", url: "/page/Missing/bare" })
    ).rejects.toMatchObject(new MediaWikiApiError("The specified page does not exist.", { code: "404", httpStatus: 404 }));
  });

  test("falls back to detail, then title, when message is absent", async () => {
    nock(BASE_URL)
      .get("/w/rest.php/v1/page/Missing/bare")
      .reply(404, { title: "not-found", detail: "Page or revision not found" });

    const client = new MediaWikiClient({ baseUrl: BASE_URL });
    await expect(restRequest(client, { method: "GET", url: "/page/Missing/bare" })).rejects.toMatchObject(
      new MediaWikiApiError("Page or revision not found", { code: "404", httpStatus: 404 })
    );
  });
});

describe("encodeTitle", () => {
  test("encodes subpage slashes as %2F", () => {
    expect(encodeTitle("User:Foo/Bar")).toBe("User%3AFoo%2FBar");
  });
});
