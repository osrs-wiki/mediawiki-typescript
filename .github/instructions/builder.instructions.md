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
- `src/builder/content/MediaWikiContent.utils.ts` — generic, non-recursive-into-subclasses content-tree helpers: `buildContents`, `flattenContents`, `isContentEmpty`, `contentStartsWith`, `findFirstStringContent`.
- `src/builder/content/contentTraversal.ts` — content-tree helpers that need to reference *concrete* content classes (`MediaWikiBreak`, `MediaWikiText`): `trimBreaks`, `trimContentEdge`/`trimContentEdges`, `getNextMeaningfulContent`. Kept in a separate file from `MediaWikiContent.utils.ts` deliberately — see "Circular import gotcha" below.
- `src/builder/content/list/` — helpers for querying/mutating a `MediaWikiContents` value: `queries.ts` (`findSection`, `getSectionContents`, `findAll`, `findTemplate`, `findHeadings`, `mapContent`/`forEachContent`/`countContent`), `mutations.ts` (`insertAtIndex`/`insertAfter`/`insertBefore`/`insertInSection`, `replaceContent`, `removeContent`/`removeAtIndex`/`removeSection`), and `MediaWikiContentList.ts` — a chainable wrapper exposing **every** list AND traversal helper as a method (callers never need to import standalone functions or know which module implements a given operation). See "Working with `MediaWikiContents` (the `list/` helpers)" below.
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

## Circular import gotcha: `MediaWikiContent.utils.ts` must not import concrete content classes

`MediaWikiContent.ts` (the abstract base class) imports `buildContents` from `MediaWikiContent.utils.ts`. If `MediaWikiContent.utils.ts` in turn imports a concrete subclass (e.g. `MediaWikiBreak`, `MediaWikiText`) — which itself imports `MediaWikiContent.ts` — you get a circular import that fails at runtime with `TypeError: Class extends value undefined is not a constructor or null` (TypeScript's `tsc --noEmit` won't catch this; it only surfaces when the modules actually execute, e.g. under Jest). Any new helper that needs `instanceof MediaWikiText`/`MediaWikiBreak`/etc. checks belongs in `contentTraversal.ts` (or a similarly separate file), not `MediaWikiContent.utils.ts` — keep helpers that only touch the generic `MediaWikiContent` base (no concrete subclass imports) in `MediaWikiContent.utils.ts`.

## Testing

- Use Jest; test files are co-located as `MediaWikiX.test.ts`.
- Prefer explicit `.toBe(...)`/`.toContain(...)` assertions per option/branch over one large snapshot, especially when adding many small option variants (see `MediaWikiFile.test.ts`, `MediaWikiTable.test.ts` for the pattern) — this makes a broken option immediately obvious from the test name instead of requiring a snapshot diff.
- Snapshot tests (`toMatchSnapshot()`) are acceptable for a single "everything combined" composite case, not for every individual option.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm test` in `packages/builder` after any change here, then rebuild (`npm run build`) before touching `packages/parser`, since it consumes builder's compiled `dist/` output, not its TypeScript source.

## Working with `MediaWikiContents` (the `list/` helpers)

`src/builder/content/list/` provides read (`queries.ts`) and write (`mutations.ts`) helpers for a
flat top-level `MediaWikiContent[]` (e.g. a parsed page), plus a chainable `MediaWikiContentList`
wrapper. Conventions specific to this area:

- **`MediaWikiContentList` is the single public surface for consumers.** It re-exposes every `queries.ts`/`mutations.ts` helper *and* the tree-traversal helpers from `MediaWikiContent.utils.ts`/`contentTraversal.ts` (`isEmpty`, `startsWith`, `findFirstStringContent`, `trimBreaks`, `trimEdges`, `getNextMeaningfulContent`) as methods on one object. The `@mediawiki-typescript/api` content bridge returns a `MediaWikiContentList` for `responseFormat: "contents"` (e.g. `result.source.findSection(...)`, `result.source.trimBreaks()`) specifically so callers never need to import standalone helpers or care whether an operation is "list" or "traversal" shaped. When adding a new standalone helper to any of those modules, also add a corresponding method here.
- **Immutable.** Every function in `mutations.ts` returns a *new* array; none mutate their input. `MediaWikiContentList`'s mutation-shaped methods likewise always return a new `MediaWikiContentList` instance.
- **Top-level only.** These helpers never recurse into a content item's own nested `.children` (e.g. table cells, template params) — a "section" is a top-level concept bounded by top-level headings. Don't extend them to search nested content without discussing the scope change first.
- **Sections span to the next same-or-shallower heading.** A `== Foo ==` section includes any `=== Bar ===` subheadings until the next `==` (or shallower) heading — see `findSection`.
- **Target matching** (`insertAfter`/`insertBefore`/`replaceContent`/`removeContent`) accepts either an exact `MediaWikiContent` reference (matched by `===`/`indexOf`) or a predicate `(content, index) => boolean` (matched by `findIndex`).
- **Not-found always throws** a descriptive `Error` — these helpers never silently no-op, so a typo'd heading/target fails loudly instead of quietly doing nothing.
- **Duplicate heading text** is only resolved via an optional `level` filter; otherwise the first match wins — this is a documented, deliberate limitation, not a bug to fix without discussion.

## Known, deliberate gaps (do not "fix" without discussion)

- `MediaWikiBreak.build()` returns a bare `"\n"` — this is a pre-existing quirk from the original `mediawiki-builder` port, not something introduced by parser work.
- No support for nested tables, `<col>`/`<colgroup>`/`<thead>`/`<tbody>`/`<tfoot>` (MediaWiki's own table syntax doesn't support these either), or deprecated HTML4 table attributes (`cellpadding`, `cellspacing`, `border=`, `width=` — use `style` instead, per Help:Tables itself).
- Signatures (`~~~`/`~~~~`/`~~~~~`) have no static "build" representation and are not modeled as a content type.

See `docs/plans/builder-parser/plan.md` for the full history and rationale behind these decisions.
