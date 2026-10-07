# @mediawiki-typescript/parser

A wikitext parser for TypeScript. Parses raw wikitext (string, file, stream, or URL) into
[`@mediawiki-typescript/builder`](../builder) `MediaWikiContents`, so it can be re-built,
inspected, or transformed programmatically.

Fidelity goal is **best-effort semantic equivalence**, not a byte-for-byte lossless round trip.

## Install

```sh
npm install @mediawiki-typescript/parser
```

## Quick start

```ts
import { parse } from "@mediawiki-typescript/parser";

const contents = await parse("== Overview ==\nSee '''[[Help:Sandbox|the sandbox help page]]'''.");

// Each item is a @mediawiki-typescript/builder MediaWikiContent, so it can be rebuilt...
const wikitext = contents.map((content) => content.build()).join("");

// ...or inspected/queried with MediaWikiContentList.
import { MediaWikiContentList } from "@mediawiki-typescript/builder";
const list = new MediaWikiContentList(contents);
const overview = list.findSection("Overview");
```

### Input sources

`parse()` accepts a `WikitextInput`, which can be:

- a raw `string`,
- `{ filePath: string }` — read from disk,
- a `NodeJS.ReadableStream` — read to completion, or
- a `URL` — fetched with a plain HTTP(S) GET (this does **not** know how to call the MediaWiki
  Action API by page title — construct an `action=raw` URL yourself if you need that).

```ts
import { parse } from "@mediawiki-typescript/parser";

await parse({ filePath: "./Sandbox.wikitext" });
await parse(new URL("https://oldschool.runescape.wiki/index.php?title=Sandbox&action=raw"));
```

## Pipeline

Parsing happens in two stages, mirroring MediaWiki's own parser architecture:

1. **Block stage** — a line-based pass splits wikitext into block-level constructs: headings,
   lists (ordered/unordered/definition), horizontal rules, tables, `#REDIRECT`, and the behavior
   switch magic words (`__TOC__`, `__NOTOC__`, `__FORCETOC__`, `__NOEDITSECTION__`,
   `__NOGALLERY__`, `__STATICREDIRECT__`, `__INDEX__`, `__NOINDEX__`, `__HIDDENCAT__`). Table
   blocks (`{| ... |}`) are further parsed into rows/cells, including header cells, attributes,
   and colspan/rowspan.
2. **Inline stage** — a [Chevrotain](https://chevrotain.io/)-based lexer and CST parser handle
   inline markup within each block's text: bold/italic, links (`[[...]]`, including `File:`/
   `Image:` and `Category:` targets, interwiki links, and a leading `:` escape), external links
   (`[https://... label]`), templates (`{{...}}`), parser functions (`{{#if:...}}`, etc.), and
   HTML tags (paired and self-closing). A visitor stage then converts the resulting CST into
   `@mediawiki-typescript/builder` content, additionally resolving ambiguous runs of `'''`/`''`
   apostrophes into bold/italic per MediaWiki's actual algorithm, and heuristically merging an
   adjacent `[[D Month]] [[YYYY]]` link pair back into a single `MediaWikiDate`.

Everything from both stages is combined by `parse()` into a single flat `MediaWikiContent[]`.

## Coverage

Parsing has been checked against the real `Help:*` pages on mediawiki.org, including
[Help:Formatting](https://www.mediawiki.org/wiki/Help:Formatting),
[Help:Images](https://www.mediawiki.org/wiki/Help:Images),
[Help:Tables](https://www.mediawiki.org/wiki/Help:Tables), and
[Help:Categories](https://www.mediawiki.org/wiki/Help:Categories), plus a round-trip test (parse
a builder content type's own `build()` output and assert equivalence) for every content type in
`@mediawiki-typescript/builder`.

## Known, deliberate gaps

- No nested table support (`{|`/`|}` inside a cell).
- `MediaWikiBreak` and `MediaWikiText.styling.underline` don't round-trip to their exact original
  type.
- Space-indented "preformatted text" blocks (Help:Formatting) have no corresponding builder type
  and are not parsed as such; literal `<pre>` tags are supported as opaque HTML instead.
- Signatures (`~~~`, `~~~~`, `~~~~~`) are left as plain literal text.
