import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

/** Full Help:Tables coverage for `{| ... |}` wikitext table syntax. */
describe("parse - Help:Tables", () => {
  test("minimal syntax with implicit first row (no leading |-)", async () => {
    const input = ["{|", "| Orange", "| Apple", "|-", "| Bread", "| Pie", "|}"].join("\n");
    const result = await build(input);
    expect(result).toContain("| Orange");
    expect(result).toContain("| Apple");
    expect(result).toContain("| Bread");
    expect(result).toContain("| Pie");
  });

  test("consecutive cells on one line separated by ||", async () => {
    const result = await build(
      ["{|", "| Orange || Apple || more", "|}"].join("\n")
    );
    expect(result).toContain("| Orange");
    expect(result).toContain("| Apple");
    expect(result).toContain("| more");
  });

  test("table headers with ! and !!", async () => {
    const result = await build(
      ["{|", "! Item !! Amount !! Cost", "|-", "| Orange", "| 10", "| 7.00", "|}"].join("\n")
    );
    expect(result).toContain("! Item");
    expect(result).toContain("! Amount");
    expect(result).toContain("! Cost");
  });

  test("caption", async () => {
    const result = await build(
      ["{|", "|+Food complements", "|-", "| Orange", "| Apple", "|}"].join("\n")
    );
    expect(result).toContain("|+Food complements");
  });

  test("caption with attributes", async () => {
    const result = await build(
      [
        "{|",
        '|+ style="caption-side:bottom; color:#e76700;" | Food complements',
        "|-",
        "| Orange",
        "|}",
      ].join("\n")
    );
    expect(result).toContain('caption-side:bottom');
    expect(result).toContain("Food complements");
  });

  test("class=wikitable on the table", async () => {
    const result = await build(
      ['{| class="wikitable"', "|+Food complements", "|-", "| Orange", "|}"].join("\n")
    );
    expect(result).toContain('class="wikitable"');
  });

  test("colspan and rowspan on cells", async () => {
    const input = [
      '{| class="wikitable"',
      '! colspan="6" | Shopping List',
      "|-",
      '| rowspan="2" | Bread & Butter',
      "| Pie",
      '| colspan="2" | Croissant',
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain('colspan="6"');
    expect(result).toContain('rowspan="2"');
    expect(result).toContain('colspan="2"');
  });

  test("attributes on individual cells", async () => {
    const input = [
      '{| class="wikitable"',
      "| Orange",
      "| Apple",
      '| style="text-align:right;" | 12,333.00',
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain('style="text-align:right;"');
    expect(result).toContain("12,333.00");
  });

  test("attributes on cells listed on one line with ||", async () => {
    const input = [
      '{| class="wikitable"',
      '| Orange || Apple || style="text-align:right;" | 12,333.00',
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain('style="text-align:right;"');
  });

  test("attributes on rows", async () => {
    const input = [
      '{| class="wikitable"',
      "|- ",
      "| Orange",
      "|- ",
      'style="font-style: italic; color: green;"',
      "| Butter",
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain("Orange");
    expect(result).toContain("Butter");
  });

  test("attributes on headers", async () => {
    const input = [
      '{| class="wikitable"',
      '!style="color:green"| Fruits',
      '!style="color:red"| Fats',
      "|-",
      "| Orange",
      "| Butter",
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain('style="color:green"');
    expect(result).toContain('style="color:red"');
  });

  test("scope attribute for accessibility", async () => {
    const input = [
      "{|",
      '! scope="col" | Item',
      '! scope="col" | Quantity',
      "|-",
      '! scope="row" | Bread',
      "| 0.3 kg",
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain('scope="col"');
    expect(result).toContain('scope="row"');
  });

  test("cell attributes on their own line, content on the following line (noresize-style)", async () => {
    const input = [
      '{| class="wikitable"',
      "|-",
      "|",
      'rowspan="2" |A long cell',
      "| Pie",
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain('rowspan="2"');
    expect(result).toContain("A long cell");
  });

  test("multi-line cell content without attributes stays a plain continuation", async () => {
    const input = ["{|", "|-", "| line one", "line two", "|}"].join("\n");
    const result = await build(input);
    expect(result).toContain("line one");
    expect(result).toContain("line two");
  });

  test("column width via cell style", async () => {
    const input = [
      '{| class="wikitable" style="width: 85%;"',
      '| style="width: 30%" | Thirty percent',
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain("width: 30%");
  });

  test("negative-number caveat: a bare |-6 cell is parsed as a row separator, not content", async () => {
    // Matches MediaWiki's own documented caveat (Help:Tables#Negative numbers) — this is
    // expected/correct behavior to replicate, not a bug.
    const input = ["{|", "|-6", "| Orange", "|}"].join("\n");
    const result = await build(input);
    expect(result).not.toContain("-6");
  });

  test("everything combined", async () => {
    const input = [
      '{| class="wikitable"',
      "|+ Shopping",
      '! scope="col" | Item',
      '! scope="col" | Qty',
      "|-",
      '! scope="row" | Bread',
      '| rowspan="2" | 2',
      "|-",
      '! scope="row" | Butter',
      "|}",
    ].join("\n");
    const result = await build(input);
    expect(result).toContain("Shopping");
    expect(result).toContain('scope="col"');
    expect(result).toContain('scope="row"');
    expect(result).toContain('rowspan="2"');
    expect(result).toContain("Bread");
    expect(result).toContain("Butter");
  });
});
