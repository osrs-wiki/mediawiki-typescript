import { MediaWikiHeader, MediaWikiTemplate, MediaWikiText } from "../contents";
import {
  insertAfter,
  insertAtIndex,
  insertBefore,
  insertInSection,
  removeAtIndex,
  removeContent,
  removeSection,
  replaceContent,
} from "./mutations";

describe("insertAtIndex", () => {
  test("inserts at the start", () => {
    const first = new MediaWikiText("first");
    const inserted = new MediaWikiText("inserted");
    expect(insertAtIndex([first], 0, inserted)).toEqual([inserted, first]);
  });

  test("inserts at the end", () => {
    const first = new MediaWikiText("first");
    const inserted = new MediaWikiText("inserted");
    expect(insertAtIndex([first], 1, inserted)).toEqual([first, inserted]);
  });

  test("does not mutate the original array", () => {
    const original = [new MediaWikiText("first")];
    const result = insertAtIndex(original, 0, new MediaWikiText("inserted"));
    expect(result).not.toBe(original);
    expect(original).toHaveLength(1);
  });
});

describe("insertAfter / insertBefore", () => {
  test("insertAfter inserts right after the matched target", () => {
    const first = new MediaWikiText("first");
    const second = new MediaWikiText("second");
    const inserted = new MediaWikiText("inserted");

    expect(insertAfter([first, second], first, inserted)).toEqual([first, inserted, second]);
  });

  test("insertBefore inserts right before the matched target", () => {
    const first = new MediaWikiText("first");
    const second = new MediaWikiText("second");
    const inserted = new MediaWikiText("inserted");

    expect(insertBefore([first, second], second, inserted)).toEqual([first, inserted, second]);
  });

  test("supports a predicate target", () => {
    const template = new MediaWikiTemplate("Infobox");
    const text = new MediaWikiText("text");
    const inserted = new MediaWikiText("inserted");

    expect(insertAfter([template, text], (content) => content instanceof MediaWikiTemplate, inserted)).toEqual([
      template,
      inserted,
      text,
    ]);
  });

  test("throws when the target isn't found", () => {
    const missing = new MediaWikiText("missing");
    expect(() => insertAfter([new MediaWikiText("a")], missing, new MediaWikiText("b"))).toThrow();
  });
});

describe("insertInSection", () => {
  const build = () => {
    const changes = new MediaWikiHeader("Changes", 2);
    const body = new MediaWikiText("changelog text");
    const next = new MediaWikiHeader("References", 2);
    return { changes, body, next, contents: [changes, body, next] };
  };

  test("defaults to inserting at the end of the section", () => {
    const { changes, body, next, contents } = build();
    const template = new MediaWikiTemplate("Subject changes");

    expect(insertInSection(contents, "Changes", template)).toEqual([changes, body, template, next]);
  });

  test("inserts at the start of the section when requested", () => {
    const { changes, body, next, contents } = build();
    const template = new MediaWikiTemplate("Subject changes");

    expect(insertInSection(contents, "Changes", template, { position: "start" })).toEqual([
      changes,
      template,
      body,
      next,
    ]);
  });

  test("throws when the section isn't found", () => {
    expect(() => insertInSection([new MediaWikiText("text")], "Changes", new MediaWikiText("x"))).toThrow(
      /No section found for heading "Changes"/
    );
  });
});

describe("replaceContent / removeContent / removeAtIndex", () => {
  test("replaceContent swaps the matched target", () => {
    const original = new MediaWikiText("original");
    const replacement = new MediaWikiText("replacement");
    expect(replaceContent([original], original, replacement)).toEqual([replacement]);
  });

  test("removeContent removes the matched target", () => {
    const first = new MediaWikiText("first");
    const second = new MediaWikiText("second");
    expect(removeContent([first, second], first)).toEqual([second]);
  });

  test("removeAtIndex removes a range starting at index", () => {
    const first = new MediaWikiText("first");
    const second = new MediaWikiText("second");
    const third = new MediaWikiText("third");
    expect(removeAtIndex([first, second, third], 1, 2)).toEqual([first]);
  });

  test("removeAtIndex defaults to removing a single item", () => {
    const first = new MediaWikiText("first");
    const second = new MediaWikiText("second");
    expect(removeAtIndex([first, second], 0)).toEqual([second]);
  });

  test("removeContent throws when the target isn't found", () => {
    expect(() => removeContent([new MediaWikiText("a")], new MediaWikiText("b"))).toThrow();
  });
});

describe("removeSection", () => {
  test("removes the heading and its full body", () => {
    const intro = new MediaWikiText("intro");
    const changes = new MediaWikiHeader("Changes", 2);
    const body = new MediaWikiText("changelog text");
    const next = new MediaWikiHeader("References", 2);

    expect(removeSection([intro, changes, body, next], "Changes")).toEqual([intro, next]);
  });

  test("throws when the section isn't found", () => {
    expect(() => removeSection([new MediaWikiText("text")], "Changes")).toThrow(/No section found for heading "Changes"/);
  });
});
