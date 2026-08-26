---
applyTo: "packages/builder/**"
---

# `@mediawiki-typescript/builder` instructions

A fluent builder library that produces MediaWiki wikitext strings from typed TypeScript objects.
Every public content type is a class extending the abstract `MediaWikiContent` (`src/builder/content/MediaWikiContent.ts`), implementing a single `build(): string` method.

## Package layout

- `src/builder/MediaWikiBuilder.ts` — top-level fluent builder: `addContent`/`addContents`, `addTransformer`, `build()`.
- `src/builder/content/contents/MediaWikiX/` — one directory per content type, containing:
  - `MediaWikiX.ts` — the class implementation.
  - `MediaWikiX.types.ts` — its params/options types (only when non-trivial; simple types can live inline in the class file).
  - `MediaWikiX.test.ts` — unit tests, co-located.
  - `index.ts` — `export * from "./MediaWikiX"` (and `./MediaWikiX.types` if present).
- `src/builder/content/contents/index.ts` — re-exports every content type; **always add new types here alphabetically**.
- `src/builder/transformer/` — post-processing transformers (`MediaWikiTransformer` subclasses) applied to a content array before building.
- `src/utils/objects.ts`, `src/utils/strings.ts` — shared helpers, notably `toKeyValueString<T>()` for rendering HTML-attribute-style option objects (`class="..." style="..."`).

## Conventions when adding or editing a content type

- Constructor takes the "primary" value(s) first (e.g. `fileName`, `name`, `link`), then a single `options`/`params` object for everything else.
- `build()` must be a pure function of the instance's fields — no side effects, no external state.
- Prefer explicit typed fields (`class?: string; style?: string; colspan?: number`) over a generic `Record<string, string>` bag, to keep the public API self-documenting and to match how the rest of the package already models attributes (see `MediaWikiTableCellOptions`, `MediaWikiFileOptions`).
- When a class supports optional HTML-attribute-style options, render them with `toKeyValueString<T>(options)` for consistency (produces `key="value"` pairs separated by spaces).
- When two states must be distinguishable in the output (e.g. "no link option" vs. "explicit empty link"), model that with `undefined` vs. `""` on the field and branch on `!== undefined`, not on truthiness — a truthy check silently collapses both cases into one. `MediaWikiFile.options.link` is the reference example.
- If a feature has multiple valid textual aliases (e.g. `frame`/`framed`, `thumb`/`thumbnail`), model them as a union type and let the caller pick, rather than normalizing to one canonical form — the parser package is responsible for round-tripping whichever alias was originally written.
- Every new content type needs a matching entry in `src/builder/content/contents/index.ts`.
- Mirror real MediaWiki markup precisely — consult the relevant `Help:*` page on mediawiki.org (Help:Formatting, Help:Images, Help:Tables, Help:Categories, Help:Magic words, etc.) rather than guessing at syntax, especially for option ordering, default values, and edge cases (e.g. height-only file resizing is `xNpx`, not `Npx`).

## Testing

- Use Jest; test files are co-located as `MediaWikiX.test.ts`.
- Prefer explicit `.toBe(...)`/`.toContain(...)` assertions per option/branch over one large snapshot, especially when adding many small option variants (see `MediaWikiFile.test.ts`, `MediaWikiTable.test.ts` for the pattern) — this makes a broken option immediately obvious from the test name instead of requiring a snapshot diff.
- Snapshot tests (`toMatchSnapshot()`) are acceptable for a single "everything combined" composite case, not for every individual option.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm test` in `packages/builder` after any change here, then rebuild (`npm run build`) before touching `packages/parser`, since it consumes builder's compiled `dist/` output, not its TypeScript source.

## Known, deliberate gaps (do not "fix" without discussion)

- `MediaWikiBreak.build()` returns a bare `"\n"` — this is a pre-existing quirk from the original `mediawiki-builder` port, not something introduced by parser work.
- No support for nested tables, `<col>`/`<colgroup>`/`<thead>`/`<tbody>`/`<tfoot>` (MediaWiki's own table syntax doesn't support these either), or deprecated HTML4 table attributes (`cellpadding`, `cellspacing`, `border=`, `width=` — use `style` instead, per Help:Tables itself).
- Signatures (`~~~`/`~~~~`/`~~~~~`) have no static "build" representation and are not modeled as a content type.

See `docs/plans/builder-parser/plan.md` for the full history and rationale behind these decisions.
