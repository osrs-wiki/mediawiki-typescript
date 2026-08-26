import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

/** Full Help:Transclusion / Transclusion coverage. */
describe("parse - Help:Transclusion", () => {
  describe("target page syntax", () => {
    test("transcluding a template (namespace omitted)", async () => {
      const result = await build("{{infobox}}");
      expect(result).toBe("{{infobox}}\n");
    });

    test("transcluding a page with an explicit namespace", async () => {
      const result = await build("{{Help:Transclusion}}");
      expect(result).toBe("{{Help:Transclusion}}\n");
    });

    test("transcluding a main-namespace article (leading colon)", async () => {
      const result = await build("{{:Transclusion}}");
      expect(result).toBe("{{:Transclusion}}\n");
    });

    test("transcluding a subpage of the current page", async () => {
      const result = await build("{{/doc}}");
      expect(result).toBe("{{/doc}}\n");
    });

    test("transcluding with parameters", async () => {
      const result = await build("{{note|inline|This is a note.}}");
      expect(result).toContain("note");
      expect(result).toContain("inline");
      expect(result).toContain("This is a note.");
    });

    test("transcluding a special page with URL-style parameters", async () => {
      const result = await build(
        "{{Special:RecentChanges|namespace=10|limit=5}}"
      );
      expect(result).toContain("Special:RecentChanges");
      expect(result).toContain("namespace=10");
      expect(result).toContain("limit=5");
    });
  });

  describe("substitution", () => {
    test("subst: prefix on a template call", async () => {
      const result = await build("{{subst:template name}}");
      expect(result).toBe("{{subst:template name}}\n");
    });

    test("subst: prefix with parameters", async () => {
      const result = await build("{{subst:Welcome|name=Example}}");
      expect(result).toContain("subst:Welcome");
      expect(result).toContain("name=Example");
    });
  });

  describe("source page syntax (partial transclusion)", () => {
    test("noinclude hides content from transclusion", async () => {
      expect(await build("Hello <noinclude>world</noinclude>")).toBe(
        "Hello <noinclude>world</noinclude>"
      );
    });

    test("includeonly hides content from the source page", async () => {
      expect(await build("Hello <includeonly>world</includeonly>")).toBe(
        "Hello <includeonly>world</includeonly>"
      );
    });

    test("onlyinclude restricts transcluded content", async () => {
      expect(await build("Hello <onlyinclude>world</onlyinclude>")).toBe(
        "Hello <onlyinclude>world</onlyinclude>"
      );
    });

    test("nesting includeonly inside noinclude", async () => {
      const input = "<noinclude>[[Category:Templates]]<includeonly>x</includeonly></noinclude>";
      const result = await build(input);
      expect(result).toBe(input);
    });

    test("wikitext inside noinclude is still parsed", async () => {
      const result = await build("<noinclude>[[Category:Templates]]</noinclude>");
      expect(result).toBe("<noinclude>[[Category:Templates]]</noinclude>");
    });
  });
});
