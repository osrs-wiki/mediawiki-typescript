import { MediaWikiClient } from "./MediaWikiClient";
import { MediaWikiClientRegistry } from "./MediaWikiClientRegistry";

describe("MediaWikiClientRegistry", () => {
  test("defaults current to the first registered client", () => {
    const registry = new MediaWikiClientRegistry();
    const osrsWiki = new MediaWikiClient({ baseUrl: "https://oldschool.runescape.wiki" });
    registry.register("osrs", osrsWiki);

    expect(registry.current).toBe(osrsWiki);
  });

  test("setWiki()/use() switch the current client", () => {
    const registry = new MediaWikiClientRegistry();
    const osrsWiki = new MediaWikiClient({ baseUrl: "https://oldschool.runescape.wiki" });
    const testWiki = new MediaWikiClient({ baseUrl: "https://test.wikipedia.org" });
    registry.register("osrs", osrsWiki).register("test", testWiki);

    expect(registry.use("test")).toBe(testWiki);
    expect(registry.current).toBe(testWiki);
  });

  test("throws for an unregistered wiki name", () => {
    const registry = new MediaWikiClientRegistry();
    expect(() => registry.setWiki("missing")).toThrow(/No wiki registered/);
  });

  test("throws when reading current before any wiki is registered", () => {
    const registry = new MediaWikiClientRegistry();
    expect(() => registry.current).toThrow(/No current wiki set/);
  });
});
