import { parse } from "../index";

const build = async (text: string): Promise<string> =>
  (await parse(text)).map((content) => content.build()).join("");

/** Extension:Cite (<ref>/<references/>) coverage — <ref> content is fully wikitext-parsed. */
describe("parse - references (Extension:Cite)", () => {
  test("a simple ref", async () => {
    expect(await build("Sentence.<ref>A citation.</ref>")).toBe(
      "Sentence.<ref>A citation.</ref>"
    );
  });

  test("a ref with a name", async () => {
    expect(await build('Sentence.<ref name="test">A citation.</ref>')).toBe(
      'Sentence.<ref name="test">A citation.</ref>'
    );
  });

  test("a ref with a name and group", async () => {
    expect(
      await build('Sentence.<ref name="test" group="note">A citation.</ref>')
    ).toBe('Sentence.<ref name="test" group="note">A citation.</ref>');
  });

  test("a self-closing ref reusing a named reference", async () => {
    expect(await build('Sentence.<ref name="test" />')).toBe(
      'Sentence.<ref name="test" />'
    );
  });

  test("wikitext inside a ref is parsed, not left opaque", async () => {
    expect(await build("<ref>See [[Some Page]] for more.</ref>")).toBe(
      "<ref>See [[Some Page]] for more.</ref>"
    );
  });

  test("<references/> is left as a generic self-closing tag", async () => {
    expect(await build("<references/>")).toBe("<references/>");
  });
});
