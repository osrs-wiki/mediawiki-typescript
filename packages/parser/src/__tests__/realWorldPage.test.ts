import { readFileSync } from "fs";
import { join } from "path";
import { createTwoFilesPatch } from "diff";
import { MediaWikiContent } from "@mediawiki-typescript/builder";
import { parse } from "../index";

/**
 * Real-world OSRS Wiki "Worlds" article (as of 2026-08-26), used as an end-to-end regression
 * fixture: unlike the topic-scoped tests elsewhere in this package, this exercises many features
 * at once (citation templates, `<onlyinclude>`, multi-line templates, `{{#switch}}`/`{{#var}}`
 * parser functions, and a large templated wikitable) in their natural, combined form.
 *
 * This is not a byte-for-byte round-trip assertion (see the package's documented "best-effort
 * semantic equivalence" fidelity goal) — it instead guards against the two real bugs this fixture
 * caught: a hard parse failure on multi-line template params containing list markup, and silent
 * content loss for bare/templated table rows lacking explicit "|"/"!" markers.
 */
describe("parse - real-world OSRS Wiki 'Worlds' article", () => {
  const wikitext = readFileSync(join(__dirname, "fixtures/worlds.wikitext.txt"), "utf-8");

  const extractWorldIds = (text: string): Set<string> => {
    const ids = new Set<string>();
    const pattern = /WorldLine\s*\n?\|(\d+)/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text))) {
      ids.add(match[1]);
    }
    return ids;
  };

  test("parses without throwing", async () => {
    await expect(parse(wikitext)).resolves.toBeDefined();
  });

  test("every {{WorldLine|<id>|...}} invocation survives parse-then-rebuild", async () => {
    const result = await parse(wikitext);
    const rebuilt = result.map((content: MediaWikiContent) => content.build()).join("");

    const inputIds = extractWorldIds(wikitext);
    const rebuiltIds = extractWorldIds(rebuilt);

    expect(inputIds.size).toBeGreaterThan(400);
    expect([...inputIds].filter((id) => !rebuiltIds.has(id))).toEqual([]);
  });

  test("all major sections survive parse-then-rebuild", async () => {
    const result = await parse(wikitext);
    const rebuilt = result.map((content: MediaWikiContent) => content.build()).join("");

    for (const heading of [
      "==Types of worlds==",
      "==List of worlds==",
      "==Isolation of worlds==",
      "==Themed worlds==",
      "==Technical details==",
      "==Changes==",
      "==Trivia==",
      "==References==",
    ]) {
      expect(rebuilt).toContain(heading);
    }

    expect(rebuilt).toContain("{{reflist}}");
    expect(rebuilt).toContain("{{Mechanics}}");
  });

  test("diff between input and rebuilt output snapshot", async () => {
    const result = await parse(wikitext);
    const rebuilt = result.map((content: MediaWikiContent) => content.build()).join("");

    // A diff (rather than the full rebuilt text) keeps the snapshot focused on what actually
    // changes, so a future regression's review doesn't have to scan an ~54KB unchanged blob.
    const patch = createTwoFilesPatch("original.wikitext", "rebuilt.wikitext", wikitext, rebuilt);
    expect(patch).toMatchSnapshot();
  });

  test("build output snapshot", async () => {
    const result = await parse(wikitext);
    const rebuilt = result.map((content: MediaWikiContent) => content.build()).join("");

    expect(rebuilt).toMatchSnapshot();
  });
});
