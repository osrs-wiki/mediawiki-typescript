import { generatedModuleManifest } from "./generated/manifest";

/** The curated high-value module list `action/core` is planned to hand-author response types for. */
const CURATED_CORE_MODULES = [
  "login",
  "clientlogin",
  "edit",
  "upload",
  "delete",
  "move",
  "parse",
  "compare",
  "opensearch",
  "tokens",
  "info",
  "revisions",
  "categories",
  "links",
  "images",
  "extracts",
  "langlinks",
  "allpages",
  "search",
  "categorymembers",
  "backlinks",
];

describe("generatedModuleManifest", () => {
  test("discovers a substantial number of Action API modules", () => {
    // A loose lower bound: the live Action API has 150+ top-level actions plus ~100 query
    // submodules. This guards against the crawl silently discovering far fewer modules
    // (e.g. a broken paraminfo request) without hard-coding the exact count.
    expect(generatedModuleManifest.length).toBeGreaterThan(200);
  });

  test("includes every module the curated action/core tier depends on", () => {
    const discoveredNames = new Set(generatedModuleManifest.map((entry) => entry.name));
    const missing = CURATED_CORE_MODULES.filter((name) => !discoveredNames.has(name));
    expect(missing).toEqual([]);
  });

  test("every entry has a unique exportName", () => {
    const exportNames = generatedModuleManifest.map((entry) => entry.exportName);
    expect(new Set(exportNames).size).toBe(exportNames.length);
  });
});
