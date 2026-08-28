import { MediaWikiContentList } from "@mediawiki-typescript/builder";
import { resolveContentOutput } from "./resolveContentOutput";

describe("resolveContentOutput", () => {
  const wikitext = "Hello '''world'''";
  const rawResponse = { query: { pages: [{ revisions: [{ slots: { main: { content: wikitext } } }] }] } };

  test("\"string\" returns the raw wikitext", async () => {
    await expect(resolveContentOutput(wikitext, rawResponse, "string")).resolves.toBe(wikitext);
  });

  test("\"json\" returns the untouched raw response", async () => {
    await expect(resolveContentOutput(wikitext, rawResponse, "json")).resolves.toBe(rawResponse);
  });

  test("\"contents\" parses the wikitext into a MediaWikiContentList", async () => {
    const result = await resolveContentOutput(wikitext, rawResponse, "contents");
    expect(result).toBeInstanceOf(MediaWikiContentList);
    expect(result.build().includes("world")).toBe(true);
  });
});
