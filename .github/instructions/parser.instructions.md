---
applyTo: "packages/parser/**"
---

# `@mediawiki-typescript/parser` instructions

Parses raw wikitext (string/file/stream/URL) into `@mediawiki-typescript/builder` `MediaWikiContents`.
Fidelity goal is **best-effort semantic equivalence**, not a byte-for-byte lossless round trip — see `docs/plans/builder-parser/plan.md` for the documented exceptions.

## Pipeline / package layout

Two-stage design, matching MediaWiki's own parser architecture:

1. **Block stage** (`src/blocks/`) — a line-based pass (`splitBlocks.ts`) that splits raw wikitext into block-level constructs: headings, lists, horizontal rules, tables, `__TOC__`/`__HIDDENCAT__` magic words, `#REDIRECT`, and paragraphs. `parseTable.ts` further parses `{| ... |}` table blocks into a structured intermediate form (`ParsedTable`/`ParsedTableRow`/`ParsedTableCell`).
2. **Inline stage** (`src/lexer/`, `src/parser/`, `src/visitor/`) — a Chevrotain lexer + CST parser (`WikitextLexer`, `wikitextParser`) for inline markup (bold/italic, links, templates, parser functions, tags, external links), visited by `WikitextToBuilderVisitor` to produce builder content instances.
3. `src/index.ts` — `parse()` ties both stages together: `splitBlocks` → `blockToContent` (per-block-type dispatch) → `parseInlineText` (invokes the lexer/parser/visitor for each block's inline text) → flat `MediaWikiContent[]`.

Other key files:
- `src/attributes.ts` — `parseAttributes()`, a generic `key="value"`/`key=value` HTML-attribute-fragment parser shared by tables, cells, files, etc.
- `src/visitor/parseFileOptions.ts` — parses `[[File:...|opt|opt|...]]` pipe segments into `MediaWikiFileOptions`, independent of segment order.
- `src/visitor/mergeDates.ts` — heuristic that merges an adjacent `[[D Month]] [[YYYY]]` link pair back into a single `MediaWikiDate`.
- `src/visitor/resolveQuotes.ts` — resolves ambiguous runs of `'''`/`''` apostrophes into bold/italic per MediaWiki's actual algorithm.
- `src/input/resolveInput.ts` — normalizes `WikitextInput` (string, file path, stream, or URL) into a plain string.

## Conventions when extending parsing support

- New block-level syntax (magic words, new block markers) → add a pattern + block type in `src/blocks/splitBlocks.ts`, then a `case` in `blockToContent` in `src/index.ts`. Follow the existing `__TOC__`/`__HIDDENCAT__` pattern for simple magic words.
- New inline syntax → add/extend a grammar rule in `src/parser/WikitextParser.ts` and a matching visitor method in `src/visitor/WikitextToBuilderVisitor.ts`.
- When a single wikitext construct maps to more than one builder content type depending on its target/prefix (e.g. `[[File:...]]` → `MediaWikiFile`, `[[Category:...]]` → `MediaWikiCategory`, everything else → `MediaWikiLink`), branch on a case-insensitive prefix regex inside the shared `link()` visitor method rather than adding new grammar rules — this keeps the pipe-segment-splitting logic (`ctx.segments`) shared across all link-like targets.
- A leading `:` on a link target (e.g. `[[:Category:Help]]`) always means "plain link, no special behavior" — check for this exclusion before applying any target-prefix special-casing.
- Attribute/option parsing (table cells, file options) should be **order-independent**: classify each pipe/space-separated segment independently by matching against known keywords/patterns, falling through to "this is the caption/content" only when nothing else matches. Don't rely on positional indexing.
- Always cross-check new/changed syntax against the real `Help:*` page on mediawiki.org (Help:Formatting, Help:Images, Help:Tables, Help:Categories, etc.) — several real bugs in this package were only caught by testing the literal examples from those pages (e.g. the Help:Tables "noresize" cell-attributes-on-next-line example).
- Prefer fixing a genuine parsing bug over "documenting around it" — but if a limitation matches a **real, documented MediaWiki quirk or caveat** (e.g. Help:Tables' `|-6` negative-number caveat), replicate that behavior and add a test asserting it, rather than treating it as a bug to fix.
- The builder package is consumed via its **compiled `dist/` output** (`@mediawiki-typescript/builder`), not TypeScript source — after any change to `packages/builder`, run `npm run build` there before testing changes here, or new/changed types won't be visible.

## Testing

- Test files live in `src/__tests__/*.test.ts`, generally one file per `Help:*` topic (`fileOptions.test.ts`, `tables.test.ts`, `categories.test.ts`, `formatting.test.ts`) plus dedicated unit-test files for individual modules (`resolveInput.test.ts`, `attributes.test.ts`, `splitTopLevel.test.ts`).
- The standard test shape is parse-then-rebuild-and-compare: `(await parse(text)).map(c => c.build()).join("")` should reproduce the input (or a documented, equivalent normalization of it).
- `src/__tests__/roundTrip.test.ts` has one test per existing builder content type: construct `new MediaWikiX(...)`, parse its `.build()` output, and assert the result matches the original (deep `toEqual` where the representation is unambiguous, `.build()`-output equality where the builder's `MediaWikiContents` union allows more than one valid internal representation). **Add every new builder content type here.**
- Run `npx tsc --noEmit`, `npx eslint src`, and `npx jest --coverage --collectCoverageFrom='src/**/*.ts' --coverageReporters=text` in `packages/parser` after any change; this package targets ~99% statement coverage — investigate any meaningful drop rather than accepting it.
- After parser changes, run the full monorepo `npm run build && npm run lint && npm run test` from the repo root to confirm no cross-package regressions (turbo runs all packages).

## Known, deliberate gaps (do not "fix" without discussion)

- No nested table support (`{|`/`|}` inside a cell) in `parseTable.ts`.
- `MediaWikiBreak` and `MediaWikiText.styling.underline` don't round-trip to their exact original type (see `docs/plans/builder-parser/plan.md` for why).
- Space-indented "preformatted text" blocks (Help:Formatting) have no corresponding builder type and are not parsed as such; literal `<pre>` tags are already supported as opaque HTML.
- Signatures (`~~~`, `~~~~`, `~~~~~`) are left as plain literal text.

See `docs/plans/builder-parser/plan.md` for the full history, rationale, and the complete list of out-of-scope items.
