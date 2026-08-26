# Plan: Port mediawiki-builder, add npm publishing, ParserFunctions support, and a new `parser` package

This document tracks a multi-part effort in the `mediawiki-typescript` monorepo:

- **Part 1** (DONE): Port the standalone `mediawiki-builder` repo into `packages/builder`, and add npm publishing infrastructure (Changesets + GitHub Actions) for the monorepo.
- **Part 2** (IN PROGRESS): Add exhaustive ParserFunctions/Variables support to `packages/builder`, and scaffold a new `packages/parser` library that parses wikitext (string/file/stream/URL) into `MediaWikiContents`.

Use the **Completion Checklist** at the top to track progress across sessions. Detailed context, decisions, and rationale for each part follow below.

---

## Completion Checklist

### Part 1 — Port builder + publishing infra
- [x] Port `mediawiki-builder/src/builder/**` + `src/utils/**` into `packages/builder/src/**`
- [x] Replace `packages/builder/src/index.ts` placeholder with real export chain
- [x] Copy all `*.test.ts` + `__snapshots__/` alongside ported source
- [x] Update `packages/builder/package.json` (deps, scripts, `publishConfig`, `files`, license)
- [x] Add `packages/builder/tsup.config.ts`
- [x] Add `packages/builder/jest.config.js`
- [x] Fix `packages/builder/tsconfig.json` (`types: ["node", "jest"]`, `ignoreDeprecations`)
- [x] Add `packages/builder/README.md`
- [x] Fix TS6/ESLint10 fallout (`Object.keys` generic constraint issues in `InfoboxTemplate`/`objects.ts` — later removed, see Part 2 note)
- [x] Add root `.changeset/config.json` + `.changeset/README.md`
- [x] Add root scripts: `changeset`, `version`, `release`
- [x] Make `packages/builder` + `apps/mw-cli` publish-ready (`publishConfig.access: public`, `files`, `license`, un-privatize `mw-cli`)
- [x] Add root `LICENSE` (GPL-3.0)
- [x] Add `.github/workflows/action-lint-build-test.yml`, `pull-request.yml`, `push-main.yml`
- [x] Document release process in root `README.md`
- [x] Full monorepo `build`/`lint`/`test` green
- [x] `npm pack --dry-run` verified for `packages/builder` and `apps/mw-cli`
- [x] Prune `templates/` folder to only genuinely "default" MediaWiki templates (removed OSRS-wiki-specific ones: `ClueInfoTemplate`, `CollapedSectionTemplate`, `InfoboxTemplate`, `LetterTemplate`, `ListenTemplate`, `NewsPollTemplate`, `PollTemplate`, `PollNoticeTemplate`, `PollWrapperTemplate`, `UpdateTemplate`)
- [x] Add `ReflistTemplate` (full `Template:Reflist` param support: columns, colwidth, liststyle, group, refs) with JSDoc `@see` link

### Part 2A — ParserFunctions in `packages/builder` (DONE)
- [x] Phase 1: Generic `MediaWikiParserFunction` content type + test + export
- [x] Phase 2 batch 1: Conditional/logic functions (`#if`, `#ifeq`, `#iferror`, `#ifexpr`, `#ifexist`, `#switch`)
- [x] Phase 2 batch 2: `#expr`
- [x] Phase 2 batch 3: Time functions (`#time`, `#timel`, `#timef`, `#timefl`)
- [x] Phase 2 batch 4: String/path functions (`#titleparts`, `#rel2abs`, `#len`, `#pos`, `#rpos`, `#sub`, `#count`, `#replace`, `#explode`, `#urldecode`)
- [x] Phase 2 batch 5: Extension:Variables functions (`#var`, `#vardefine`, `#vardefineecho`)
- [x] Phase 2 batch 6: "Other parser functions" (`lc:`, `uc:`, `lcfirst:`, `ucfirst:`, `urlencode:`, `anchorencode:`)
- [x] Update `parserFunctions/index.ts` to export everything
- [x] Full monorepo `build`/`lint`/`test` green after each batch (47 suites / 120 tests / 80 snapshots passing)

### Part 2B — New `packages/parser` library
- [x] Phase 3: Package scaffolding (`package.json`, `tsup.config.ts`, `jest.config.js`, `tsconfig.json` types fix)
- [x] Phase 4: Lexer (Chevrotain tokens)
- [x] Phase 5: CST Parser (Chevrotain grammar rules)
- [x] Phase 6: CST → `MediaWikiContents` Visitor
- [x] Phase 7: Input-source abstraction (string/file/stream/URL) + `parse()` entrypoint
- [x] Phase 8: Tests (per-construct unit tests + integration tests using the user's example strings)
- [x] Table parsing (`{| |}` → `MediaWikiTable`, including captions/attributes/colspan/rowspan/header cells)
- [x] chevrotain kept at latest major (13.x, not downgraded) — resolved CJS/ESM interop via tsup `noExternal` + jest `moduleNameMapper`/`transformIgnorePatterns`
- [x] JSDoc blocks moved above `class`/`type` declarations (not file-top) across all ParserFunction files
- [x] Full monorepo `build`/`lint`/`test` green (22/22 parser tests, 9/9 turbo tasks)
- [ ] `npm pack --dry-run` verified for `packages/parser`
- [ ] CST/AST snapshot tests for grammar-regression coverage (not yet added)

### Part 2C — Full Help:Formatting/Cheatsheet + content-type round-trip coverage (DONE)
- [x] Remove `MediaWikiVideo` (OSRS-wiki-specific, not general MediaWiki) from `packages/builder`
- [x] Add `MediaWikiRedirect` content type (`#REDIRECT [[target]]`) — closes a Cheatsheet gap with no prior builder equivalent
- [x] Extend `MediaWikiListItem` with `definitionType?: "term" | "definition"` (`;`/`:` markers) — Help:Formatting definition lists had no builder representation before
- [x] Parser: multi-segment `link` grammar (was single-optional-label, now `MANY` pipe segments like templates) to support `[[File:x|opt1|opt2|...]]`
- [x] Parser: `File:`/`Image:` link targets → `MediaWikiFile` (new `parseFileOptions.ts`: format/resizing/horizontal+vertical alignment/caption/`link=`, order-independent)
- [x] Parser: `__TOC__` magic word → `MediaWikiTOC`, `#REDIRECT [[...]]` → `MediaWikiRedirect`, definition list markers → `MediaWikiListItem` (all via `splitBlocks.ts`/`src/index.ts`)
- [x] Parser: `MediaWikiDate` heuristic merge (`visitor/mergeDates.ts`) — recognizes the exact adjacent `[[D Month]] [[YYYY]]` link pair `MediaWikiDate.build()` produces and merges it back; day-only/year-only intentionally NOT merged (too ambiguous with an ordinary link)
- [x] Bug fixes found via round-trip testing: list-block content wasn't stripping the marker-separator space (`\n; Term` parsed back with a leading space); `pairedTag` visitor always attached `{collapsed:true}` HTML options even for self-closing tags with no children; `parseTableBlock` mis-handled a table with no closing `|}` (treated the last real content line as the closing line and dropped it)
- [x] `packages/parser/src/__tests__/roundTrip.test.ts` — one test per existing builder content type constructing `new MediaWikiX(...)`, parsing its `.build()` output, and asserting equivalence (deep `toEqual` where the representation is unambiguous; `.build()`-output equality where the builder's `MediaWikiContents` union type makes more than one valid internal representation possible — see the file's own doc comment for which types use which and why)
- [x] Expanded `formatting.test.ts` with definition lists, TOC, redirect, category links, interwiki links, mailto external links, file images (with alignment/vertical-alignment/`link=`/both-dimension resizing), 4-and-6-apostrophe edge cases, unterminated comment/triple-brace/table inputs, stray pipe/closing-tag literal-text handling, and a negative date-merge case
- [x] New `resolveInput.test.ts`, `attributes.test.ts`, `splitTopLevel.test.ts` unit test files to close coverage gaps in previously indirectly-tested modules
- [x] Full monorepo `build`/`lint`/`test` green (80/80 parser tests, 9/9 turbo tasks); parser package statement coverage 98.63%, line coverage 99.08% (remaining gaps are defensive/unreachable-in-practice branches, e.g. the "parser produced CST errors" throw path, which the grammar's catch-all alternatives make effectively unreachable)

### Part 2D — Full Help:Images coverage (builder + parser) (DONE)
- [x] `MediaWikiFile.types.ts`/`MediaWikiFile.ts` (builder) expanded to the complete Help:Images option grammar: `border` (combinable with `frameless`), `format` now includes `framed`/`thumbnail` aliases, `resizing.upright` (bare or `=N`), fixed a pre-existing bug where height-only resizing rendered as bare `Npx` (ambiguous with width) instead of the correct `xNpx` form, added `alt`, `page`, `thumbtime`, `start`, `muted`, `loop`, `lossy`, `class`, `lang`; `link` now distinguishes `undefined` (no option) from `""` (explicit no-link) since the old `if (link)` check treated both the same
- [x] `FileVerticalAlignment` was missing `"middle"` (the actual default value per Help:Images) — added
- [x] Parser `parseFileOptions.ts` rewritten to recognize every option above, order-independently, matching the corrected builder semantics (including the `xNpx` height fix)
- [x] `packages/builder/.../MediaWikiFile.test.ts` — one test per option (36 tests) plus a combined multi-option case
- [x] `packages/parser/src/__tests__/fileOptions.test.ts` — full parse+rebuild round trip per option (36 tests), incl. `Image:` namespace alias and an all-options-combined case
- [x] Full monorepo `build`/`lint`/`test` green; parser package coverage 99.03% statements / 99.48% lines (116/116 tests)

### Part 2E — Full Help:Tables coverage (builder + parser) (DONE)
- [x] `MediaWikiTable.types.ts`/`MediaWikiTable.ts` (builder): added `captionOptions?: {class?, style?}` — the builder previously had no way to produce `|+ style="..." | caption` at all (only the bare `|+caption` form); added `scope?: "row" | "col"` to `MediaWikiTableCellOptions` for header-cell accessibility (Help:Tables#Accessibility of table header cells)
- [x] Parser: wired `captionOptions`/`scope` end-to-end (`parseTable.ts` already captured `captionAttributes`, now actually consumed by `src/index.ts`)
- [x] Parser bug fix: a cell started by a bare marker alone on its own line (e.g. a lone `|`) followed by an "attrs | content" line — the exact pattern in Help:Tables' own "noresize" example (`|` then `rowspan="2" |Areally...`) — was previously swallowed as literal text instead of being split into attributes+content. Fixed via a `cellAwaitingFirstLine` flag in `parseTable.ts` that applies `splitAttributesAndContent` to exactly the first continuation line after a bare marker, while later continuation lines still append as plain multi-line content (no regression to the existing multi-line-cell test)
- [x] Verified (and added a test asserting) MediaWiki's own documented "negative number" caveat: a bare `|-6` cell is parsed as a row separator (`|-`) + stray `6`, not as content — this is real MediaWiki's actual documented behavior, correctly replicated rather than "fixed"
- [x] Confirmed out of scope, matching upstream MediaWiki itself: `<col>`/`<colgroup>`/`<thead>`/`<tbody>`/`<tfoot>` have no wikitext table syntax at all per Help:Tables ("Common attributes for columns, column groups and row groups"); legacy HTML4 table attributes (`cellpadding`, `cellspacing`, `border=`, `width=`) are called out by the page itself as "invalid in HTML5" — covered via the already-fully-supported `style` string instead of adding first-class fields for deprecated attributes
- [x] `packages/builder/.../MediaWikiTable.test.ts` — added caption-with-attributes, caption-without-attributes, and cell-`scope` tests
- [x] `packages/parser/src/__tests__/tables.test.ts` — 17 new tests covering minimal syntax, `||`/`!!` same-line cells, headers, captions (with/without attributes), `class="wikitable"`, `colspan`/`rowspan`, cell/row/header attributes (incl. on one line with `||`), `scope`, the noresize-style attrs-on-next-line pattern, plain multi-line cells, column width via cell `style`, the negative-number caveat, and an all-combined case
- [x] Full monorepo `build`/`lint`/`test` green; parser package coverage 99.36% statements / 99.49% lines (133/133 tests)

### Part 2F — Full Help:Categories coverage (builder + parser) (DONE)
- [x] New builder content type `MediaWikiCategory` (`name`, optional `sortKey`) — `[[Category:Name]]`/`[[Category:Name|SortKey]]`; there was previously no dedicated category-tag type (a category tag would have round-tripped as a generic `MediaWikiLink`, losing its distinct semantic identity, mirroring why `MediaWikiFile` exists separately from `MediaWikiLink`)
- [x] New builder content type `MediaWikiHiddenCategory` — `__HIDDENCAT__` magic word (Help:Categories#Hidden categories), mirroring the existing `MediaWikiTOC` pattern for `__TOC__`
- [x] Parser: `link()` visitor now detects a bare `Category:` target (not `:Category:`, which is a plain link per Help:Categories and correctly falls through unchanged) and constructs `MediaWikiCategory` instead of `MediaWikiLink`, using the (single) extra pipe segment as the sort key
- [x] Parser: `__HIDDENCAT__` recognized as its own block type in `splitBlocks.ts`/`src/index.ts`, same pattern as `__TOC__`/`#REDIRECT`
- [x] `packages/builder/.../MediaWikiCategory.test.ts` and `.../MediaWikiHiddenCategory.test.ts` — new
- [x] `packages/parser/src/__tests__/categories.test.ts` — 6 new tests: plain category tag, sort key, colon-prefixed category link (both with and without custom link text), multiple category tags on one page, hidden category magic word
- [x] Added `MediaWikiCategory`/`MediaWikiHiddenCategory` to `roundTrip.test.ts`
- [x] Full monorepo `build`/`lint`/`test` green; parser package coverage 99.37% statements / 99.5% lines (142/142 tests)

### Part 2G — Full Help:Transclusion / Transclusion coverage (builder + parser) (DONE)
- [x] Confirmed `{{PageName}}`/`{{:MainNamespaceArticle}}`/`{{User:Example}}`/`{{/subpage}}`/`{{Special:Page|params}}` transclusion targets and their parameters already round-trip correctly through the existing generic `MediaWikiTemplate` — no builder changes needed for target-page syntax, since a colon or slash prefix is just an arbitrary character in `name`
- [x] Builder: added `subst?: boolean` to `MediaWikiTemplateOptions`, rendering `{{subst:Name|...}}` when set, for the substitution alternative to transclusion mentioned on the Transclusion page
- [x] Builder: new content types `MediaWikiNoInclude`, `MediaWikiIncludeOnly`, `MediaWikiOnlyInclude` (`<noinclude>`/`<includeonly>`/`<onlyinclude>`) — these are preprocessor directives, not real HTML elements, so they get dedicated types instead of falling into the generic `MediaWikiHTML`
- [x] Parser: `templateOrParserFunction()` now detects a `subst:` prefix before the existing parser-function-name check and builds a `MediaWikiTemplate` with `{ subst: true }`, stripping the prefix from `name` (previously this coincidentally round-tripped only because the whole `"subst:Foo"` string was kept as an opaque `name`)
- [x] Parser: `pairedTag()` now dispatches `noinclude`/`includeonly`/`onlyinclude` (case-insensitively) to the new dedicated content types instead of `MediaWikiHTML`; their content is still fully wikitext-parsed (unlike the `OPAQUE_TAG_NAMES` list), since these tags only gate visibility, not markup
- [x] `packages/builder/.../MediaWikiTemplate.test.ts`, `MediaWikiNoInclude.test.ts`, `MediaWikiIncludeOnly.test.ts`, `MediaWikiOnlyInclude.test.ts` — new/updated
- [x] `packages/parser/src/__tests__/transclusion.test.ts` — new: target-page syntax (template/namespaced/main-namespace/subpage/special-page-with-params), `subst:` (plain and with parameters), and source-page syntax (`noinclude`/`includeonly`/`onlyinclude`, including nesting and wikitext parsed inside them)
- [x] Added `MediaWikiTemplate` (subst), `MediaWikiNoInclude`, `MediaWikiIncludeOnly`, `MediaWikiOnlyInclude` to `roundTrip.test.ts`
- [x] Full monorepo `build`/`lint`/`test` green; parser package coverage 99.38% statements / 99.5% lines (159/159 tests)

### Part 2H — DEFAULTSORT, remaining behavior switches, `<gallery>`, and `<ref>` (DONE)
- [x] Builder: new `MediaWikiDefaultSort` (`{{DEFAULTSORT:key}}`) — previously fell through to a generic `MediaWikiTemplate`, unlike the already-dedicated `MediaWikiCategory`/`MediaWikiHiddenCategory` for the same Help:Categories/Help:Magic_words neighborhood
- [x] Builder: new one-class-per-word behavior switch types — `MediaWikiNoTOC`, `MediaWikiForceTOC`, `MediaWikiNoEditSection`, `MediaWikiNoGallery`, `MediaWikiStaticRedirect`, `MediaWikiIndex`, `MediaWikiNoIndex` — mirroring the existing `MediaWikiTOC`/`MediaWikiHiddenCategory` pattern (Help:Magic_words#Behavior_switches)
- [x] Builder: new `MediaWikiGallery` (`<gallery>` / Help:Images#Gallery_syntax) — typed `mode`/`widths`/`heights`/`perrow`/`caption`/`class`/`showfilename` options plus an `items: {file, caption?}[]` body, one `file|caption` pair per line
- [x] Builder: new `MediaWikiReference` (`<ref>...</ref>` / self-closing `<ref name="..." />`, Extension:Cite) — `name`/`group` options, `children === undefined` distinguishes a self-closing named-reference reuse from an empty-but-paired `<ref></ref>`
- [x] Parser: `templateOrParserFunction()` now also detects a `defaultsort:` prefix (same branch as the existing `subst:` check) and builds a `MediaWikiDefaultSort`
- [x] Parser: `splitBlocks.ts` recognizes the 7 new `__WORD__` behavior switches via a single shared `BEHAVIOR_SWITCH_WORDS`-driven regex/block type, dispatched through a `Record<BehaviorSwitchWord, ...>` lookup in `blockToContent()` (avoids 7 near-identical dedicated regexes/cases)
- [x] Parser: `<gallery>` gets **both** a block-level pass (`GALLERY_START_PATTERN`/`GALLERY_END_PATTERN` in `splitBlocks.ts`, mirroring the existing `{|`/`|}` table handling) **and** an inline `opaqueTag()` fallback for the rare non-start-of-line case — the block-level pass was required because blank lines are valid inside a gallery body (Help:Images), and the paragraph-splitting pass that runs before any tokenizing would otherwise incorrectly split the gallery in two at the first blank line
- [x] Parser: new `src/visitor/parseGallery.ts` parses the raw `<gallery ...>...</gallery>` capture (attributes via the existing shared `parseAttributes()`, body via one `file[|caption]` line each, blank lines skipped); an unrecognized `mode` value is dropped rather than misrendered
- [x] Parser: removed `ref` from `OPAQUE_TAG_NAMES` — unlike `nowiki`/`pre`/`math`/etc., `<ref>` content is ordinary prose that commonly contains real wikitext (links, formatting), so it's now recursively parsed like any other paired tag; `pairedTag()` dispatches `ref` (case-insensitively) to `MediaWikiReference` using its existing `name`/`group` attribute parsing and `selfClosing` detection. `<references/>` itself is intentionally left as a generic `MediaWikiHTML` self-closing tag (no distinct semantics of its own beyond attributes already handled)
- [x] `packages/builder/.../MediaWikiDefaultSort.test.ts`, `MediaWikiNoTOC.test.ts`, `MediaWikiForceTOC.test.ts`, `MediaWikiNoEditSection.test.ts`, `MediaWikiNoGallery.test.ts`, `MediaWikiStaticRedirect.test.ts`, `MediaWikiIndex.test.ts`, `MediaWikiNoIndex.test.ts`, `MediaWikiGallery.test.ts`, `MediaWikiReference.test.ts` — all new
- [x] `packages/parser/src/__tests__/magicWords.test.ts` (DEFAULTSORT + all 7 behavior switches, plus a negative case confirming an arbitrary `__NOTREALLY__` stays a plain paragraph), `gallery.test.ts` (minimal/captioned/mixed/attributes/blank-lines/unrecognized-mode/inline-mid-paragraph), `references.test.ts` (plain/name/name+group/self-closing/wikitext-inside/`<references/>`) — all new
- [x] Added `MediaWikiDefaultSort`, all 7 behavior switch types, `MediaWikiGallery`, and `MediaWikiReference` (both paired and self-closing) to `roundTrip.test.ts`
- [x] Full monorepo `build`/`lint`/`test` green; parser package coverage 99.44% statements / 99.55% lines (192/192 tests)

### Part 2I — Real-world round-trip validation against a live OSRS Wiki article (DONE)
- [x] Fixture-driven end-to-end validation using the actual `Worlds` OSRS Wiki article (citation templates, `<onlyinclude>`, multi-line templates, `{{#switch}}`/`{{#var}}` parser functions, and a large templated wikitable) surfaced two real bugs, both fixed:
- [x] **Bug fix — `splitBlocks.ts` crashed on multi-line template params containing list markup:** a `|param = ...` value spanning multiple lines where one of those lines starts with `*`/`#`/`;`/`:` (e.g. `{{Subject changes|change=Added worlds:\n* Japan\n* Singapore\n}}`) was mis-split into a separate list block, leaving the template's braces unbalanced and causing a hard parse failure. Fixed by tracking `{{`/`}}` brace depth across lines: while depth > 0, every line is treated as template continuation text, bypassing all other block-marker checks, regardless of its leading characters.
- [x] **Bug fix — `parseTable.ts` silently dropped bare/templated table content:** wikitables whose rows are built entirely from template calls with no explicit `|`/`!` cell markers (e.g. `{{WorldLine|301|...}}` one call per physical line, relying on the template's own transclusion to emit real `|-`/`|` markup, which this pass doesn't expand) had those lines discarded outright whenever there was no "current cell" to append to — losing 436 of 453 `{{WorldLine}}` invocations in the fixture. Also, a `|-{{#switch:...}}` row marker (used for weekly PvP-world rotations) swallowed its embedded template call into the unused row-`attributes` field. Both now preserve the content: an orphan line with no active cell becomes its own new cell, and a `|-` line whose trailing text starts with `{{` is treated as row content rather than HTML attributes.
- [x] New `packages/parser/src/__tests__/realWorldPage.test.ts` + `fixtures/worlds.wikitext.txt` — a genuine (non-synthetic) real-world regression fixture, distinct from the rest of the suite's topic-scoped synthetic examples. Doesn't assert byte-for-byte equality (per this package's documented fidelity goal); instead asserts parse-then-rebuild doesn't throw, every `{{WorldLine|<id>|...}}` invocation's id survives, and all major section headings/closing templates survive.
- [x] Full monorepo `build`/`lint`/`test` green; parser package coverage 99.32% statements / 99.42% lines (195/195 tests)

### Documented, intentionally out-of-scope gaps (see file for full rationale)
- `MediaWikiBreak` (`build()` = bare `"\n"`) cannot be round-tripped — indistinguishable from ordinary whitespace once parsed back; real MediaWiki itself requires `<br/>` for a manual line break (Help:Formatting), so this is treated as a pre-existing quirk of the ported class, not something to silently "fix" without explicit approval.
- `MediaWikiText.styling.underline` (`<u>...</u>`) round-trips to an equivalent `MediaWikiHTML("u", ...)` node instead of the exact original `MediaWikiText` type, since a generic `<u>` tag is indistinguishable from one MediaWiki's own class would produce.
- Space-indented "preformatted text" blocks (Help:Formatting) have no corresponding builder content type, so parsing support was not added; the literal `<pre>` HTML tag (which does have a clear mapping) is already supported as an opaque tag.
- Nested tables (a `{|`/`|}` inside a cell) are not supported by `parseTable.ts` (documented in its own doc comment).
- `<col>`/`<colgroup>`/`<thead>`/`<tbody>`/`<tfoot>` and legacy HTML4 table attributes (`cellpadding`, `cellspacing`, `border=`, `width=`) — not modeled, matching either MediaWiki's own lack of support (former) or the page's own "invalid in HTML5" guidance to use `style` instead (latter).
- Signatures (`~~~`/`~~~~`/`~~~~~`) are dynamic magic words with no meaningful static "build" representation; left as plain literal text, not modeled as a content type.
- Category redirects, category trees (`<categorytree>`, `Extension:CategoryTree`), and tracking categories (Help:Categories) are extension/administrative features with no wikitext construct of their own beyond the plain `MediaWikiRedirect`/`MediaWikiCategory` tags already supported — nothing further to model.
- `safesubst:`/`msgnw:` (Help:Substitution, a separate page not covered by this task) are not modeled as distinct `MediaWikiTemplate` options — only the plain `subst:` prefix mentioned on the Transclusion page was added; both are trivial to add later following the same pattern if that page is tackled.
- Extension-based transclusion alternatives (Labeled Section Transclusion, Scribunto/Module transclusion, Semantic MediaWiki inline queries) have no wikitext syntax of their own beyond a plain `{{...}}`/`{{#invoke:...}}` call, which already round-trips through the generic `MediaWikiTemplate`/`MediaWikiParserFunction` mechanism — nothing further to model.
- Other Help:Magic_words#Variables (`{{PAGENAME}}`, `{{FULLPAGENAME}}`, `{{NAMESPACE}}`, `{{SITENAME}}`, `{{CURRENTDATE}}`, `{{REVISIONID}}`, `{{DISPLAYTITLE:...}}`, etc.) are not modeled as dedicated types — they already round-trip correctly through the generic `MediaWikiTemplate` (no colon, or a colon that isn't `subst`/`defaultsort`, so nothing misfires), same as ordinary transclusion targets; lower priority since there's no bug, just an unclaimed abstraction opportunity.
- `<references/>` is left as a generic self-closing `MediaWikiHTML` rather than a dedicated type, since (unlike `<ref>`) it has no content of its own to recursively parse — only an optional `group` attribute, already handled generically.

---

## Part 1: Port mediawiki-builder into monorepo + add npm publishing (DONE)

### Decisions (confirmed with user)
- npm scope: keep `@mediawiki-typescript/*` (no rename to `@osrs-wiki`)
- Relationship to mediawiki-builder repo: eventual replacement (old repo archived later; consumers migrate later, out of scope for this change)
- Build tool for publishable packages: `tsup` (replaces TSDX; produces CJS+ESM+d.ts)
- License: GPL-3.0 for published packages (repo previously had none)

### Repo state findings
- mediawiki-typescript: npm workspaces + Turborepo. Root: `package.json` (workspaces `apps/*`, `packages/*`), `turbo.json` (build/lint/dev/test tasks), `tsconfig.base.json` (commonjs/tsc, ES2020), `eslint.config.mjs` (flat config, ESLint 10). Originally no `.changeset/`, no `.github/workflows/`, no `LICENSE` anywhere. `packages/builder` was a placeholder (`src/index.ts` `greet()`). `apps/mw-cli` was `"private": true`, bin `mw-cli -> dist/index.js`, placeholder `console.log` entry.
- mediawiki-builder (source ported): 102 files under `src/builder/**` (`MediaWikiBuilder`, `MediaWikiContent` + 15 content types incl. nested `MediaWikiTemplate/templates/*` with 9 template classes + `InfoboxTemplate/infoboxes`, `MediaWikiTransformer`, `utils/objects.ts`, `utils/strings.ts`). Used TSDX build (rollup, cjs dev+prod min + esm + d.ts), jest+ts-jest (co-located `*.test.ts`, `__snapshots__`), ESLint 8 legacy config + prettier 2, Changesets (`@changesets/cli` + `@changesets/changelog-github`, `config.json` `access:public` `baseBranch main`), GitHub Actions: `action-lint-build-test.yml` (reusable, node 21, yarn), `pull-request.yml` (enforces `.changeset/*.md` present via `tj-actions/changed-files`, calls `lint_build_test`), `push-main.yml` (runs `lint_build_test` then `changesets/action@v1` with `publish: yarn release`, secrets `GITHUB_TOKEN=PUBLISH_PACKAGES`, `NPM_TOKEN=NPM_TOKEN`). `package.json`: name `@osrs-wiki/mediawiki-builder`, `main`/`module`/`typings` fields, `files: [README.md, dist]`, dependency `tslib`, license GPL-3.0, no `publishConfig` (relied on changesets config `access:public` + scoped name).

### Steps taken

**Phase 1: Port mediawiki-builder source into packages/builder**
1. Copied full `src/builder/**` tree (`MediaWikiBuilder.ts`, `content/`, `transformer/`) from mediawiki-builder into `packages/builder/src/builder/**`, preserving exact structure/paths. Also copied `src/utils/objects.ts` and `src/utils/strings.ts`.
2. Replaced `packages/builder/src/index.ts` placeholder with `export * from "./builder";`.
3. Copied all co-located `*.test.ts` files and `__snapshots__/` folders.
4. Updated `packages/builder/package.json`: `tslib` dependency; `jest`/`ts-jest`/`@types/jest`/`tsup` devDependencies; `"license": "GPL-3.0"`; `"files": ["README.md", "dist"]`; `main`/`module`/`types` fields for tsup output; `"publishConfig": { "access": "public" }`; scripts `build: tsup`, `dev: tsup --watch`, `lint: eslint src`, `test: jest`.
5. Added `packages/builder/tsup.config.ts` (entry `src/index.ts`, format `["cjs", "esm"]`, dts: true, sourcemap: true, clean: true).
6. Added `packages/builder/jest.config.js` (preset ts-jest, testEnvironment node).
7. Kept `packages/builder/tsconfig.json` minimal (no `dom`/`jsx` lib options needed); added `"types": ["node", "jest"]` (see gotcha below) and inherited `"ignoreDeprecations": "6.0"` from the base config (added during an earlier TypeScript 5→6 upgrade in this repo).
8. Added `packages/builder/README.md`.
9. Ran `npm install`, `npm run build`, `npm run lint`, `npm run test` scoped to builder package; fixed TS/ESLint errors surfaced by the newer toolchain (see Gotchas below).

**Phase 2: Changesets + publishing infrastructure (repo-wide)**
10. Added root `.changeset/config.json` (`access: "public"`, `baseBranch: "main"`, `changelog: ["@changesets/changelog-github", {repo}]`, `commit: false`, `updateInternalDependencies: "patch"`) and `.changeset/README.md`.
11. Added root scripts: `"changeset": "changeset"`, `"version": "changeset version"`, `"release": "turbo run build && changeset publish"`.
12. Publishability: `packages/builder` and `apps/mw-cli` made publish-ready (`publishConfig.access: public`, `files`, `license`, un-privatized `mw-cli`, pinned internal workspace deps to exact `0.0.0` instead of `"*"` since `"*"` doesn't resolve from the npm registry once published). `packages/api`/`parser`/`tanstack-query` intentionally left as-is (still `greet()` stubs, not yet publish-ready).
13. Added root `LICENSE` (GPL-3.0, copied from mediawiki-builder).
14. Added `.github/workflows/action-lint-build-test.yml` (reusable: checkout, setup-node 22, `npm ci`, `npm run lint`, `npm run build`, `npm run test`).
15. Added `.github/workflows/pull-request.yml` (changeset-file-presence check via `tj-actions/changed-files` + calls reusable workflow).
16. Added `.github/workflows/push-main.yml` (calls reusable workflow, then `changesets/action@v1` with `publish: npm run release`, `version: npm run version`, secrets `GITHUB_TOKEN: ${{ secrets.PUBLISH_PACKAGES }}`, `NPM_TOKEN: ${{ secrets.NPM_TOKEN }}`).
17. Documented the release process briefly in root `README.md`.

**Phase 3: Validation**
18. Ran `npx changeset status` (confirmed correctly detects builder as publishable — errors as expected when no changeset exists yet for a real diff).
19. Ran `npm pack --dry-run` in `packages/builder` and `apps/mw-cli` — confirmed expected tarball contents (`dist/`, `README.md`, `package.json` for builder; `dist/` + `package.json` + working `bin` for mw-cli).

### Gotchas hit & fixed during Part 1
- **TS 6 deprecation**: `moduleResolution: "node"` triggers `TS5107` deprecation warning under TypeScript 6 — fixed by adding `"ignoreDeprecations": "6.0"` to `tsconfig.base.json`.
- **Missing global types**: TS 6 + this repo's tsconfig setup stopped auto-including `@types/node` — fixed by adding explicit `"types": ["node"]` to `tsconfig.base.json` (and `["node", "jest"]` in `packages/builder/tsconfig.json` specifically, since jest globals also weren't picked up).
- **Generic `Object.keys` constraint**: TS 6 is stricter about `Object.keys(t)` where `t: T` is unconstrained generic — required `as object` casts in `InfoboxTemplate.ts` and `utils/objects.ts` (both later deleted anyway when `InfoboxTemplate` was pruned as OSRS-wiki-specific).
- **Jest 28→30 snapshot format differences**: old snapshots (ported verbatim from mediawiki-builder, which used Jest 28) failed on ~10 tests due to pretty-format serialization changes (e.g. `Object {` prefix dropped, string quote-escaping changed) — not real regressions; fixed via `npx jest -u` to regenerate snapshots.
- **`"*"` internal workspace dependency version**: `apps/mw-cli`'s dependencies on `@mediawiki-typescript/*` used `"*"` which resolves fine locally via npm workspaces but would fail to resolve from the real npm registry once published (no version literally named `"*"` exists) — changed to explicit `"0.0.0"` pins, which Changesets' `updateInternalDependencies: "patch"` will keep in sync on releases.

### Follow-up prune (still Part 1, done after initial port)
- Removed all OSRS-wiki-specific template classes from `templates/` (they're wiki content, not core MediaWiki), keeping only the generic abstract `Template` base class: deleted `ClueInfoTemplate`, `CollapedSectionTemplate`, `InfoboxTemplate` (+ `infoboxes/InfoboxItem`, `InfoboxNpc`), `LetterTemplate`, `ListenTemplate`, `NewsPollTemplate`, `PollTemplate`, `PollNoticeTemplate`, `PollWrapperTemplate`, `UpdateTemplate`.
- Added `ReflistTemplate` as the first genuinely "default" MediaWiki template (backed by the bundled Cite extension, used near-universally): full param support per [Template:Reflist](https://www.mediawiki.org/wiki/Template:Reflist) — `columns` (positional), `colwidth`, `liststyle` (all 6 valid CSS list-style-type values), `group`, `refs` — plus a JSDoc block with `@see` link to the official docs.

---

## Part 2: ParserFunctions support (builder) + new `parser` package (IN PROGRESS)

### Context gathered
- `builder` content-class pattern: every content type extends abstract `MediaWikiContent` (`build(): string`, optional `children`/`buildChildren()`). `MediaWikiTemplate` (in `packages/builder/src/builder/content/contents/MediaWikiTemplate/MediaWikiTemplate.ts`) models `{{Name|k=v}}` with `.add(key,value)` and a `templates/` subfolder of typed wrapper classes extending abstract `Template` (name + `build(): MediaWikiTemplate`). `ReflistTemplate` is the reference example of a typed wrapper (options type file, class, test, snapshot).
- ParserFunctions syntax is `{{#functionname: arg1 | arg2 | ... }}` — colon after name (not before first pipe like templates). Core ParserFunctions extension functions: `#expr`, `#if`, `#ifeq`, `#iferror`, `#ifexpr`, `#ifexist`, `#rel2abs`, `#switch`, `#time`/`#timel`/`#timef`/`#timefl`, `#titleparts`, plus optional string functions (`#len #pos #rpos #sub #count #replace #explode #urldecode`, disabled on WMF wikis by default but requested for exhaustive coverage). `#var`/`#vardefine`(`/#vardefineecho`) are from the separate **Extension:Variables** (common on Fandom/gaming wikis, NOT core ParserFunctions) — same `{{#name:...}}` call syntax though. "Other parser functions" (`lc:`, `uc:`, `lcfirst:`, `ucfirst:`, `urlencode:`, `anchorencode:`) use plain `{{name:arg}}` (no `#`) — same generic base applies.
- `#expr` full grammar (operators, precedence, trunc/round/mod/e-notation) is large (see Manual:Expr_parser_function_syntax) — per decision below, modeled as a raw string/`MediaWikiContents` argument, not a typed AST.
- No existing parsing library is installed anywhere in the repo (checked for peggy/nearley/chevrotain/pegjs/ohm/antlr/wtf_wikipedia/parsimmon — none found).
- Wikitext is not cleanly context-free (unbalanced braces become literal text, greedy nesting, `{{{param|default}}}` fallback, whitespace-sensitive `#switch`) — MediaWiki's own preprocessor, mwparserfromhell, and wtf_wikipedia are all hand-written for this reason, not grammar-generator output.
- Reference docs consulted: [Help:Extension:ParserFunctions](https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions) (full function list + syntax), [Manual:Expr_parser_function_syntax](https://www.mediawiki.org/wiki/Manual:Expr_parser_function_syntax) (operators/precedence), [Help:Formatting](https://www.mediawiki.org/wiki/Help:Formatting) + [Cheatsheet](https://www.mediawiki.org/wiki/Cheatsheet) (headings `==`, lists `*`/`#`/`;`/`:`, bold/italic `'''`/`''`, links `[[ ]]`/`[ ]`, tables `{| |}`, `<nowiki>`, HTML tags, horizontal rule `----`, comments `<!-- -->`), [Manual:Parser](https://www.mediawiki.org/wiki/Manual:Parser) (real MediaWiki parser architecture — see Refinements below).

### Decisions (confirmed with user)
- **ParserFunctions scope**: exhaustive — all functions listed on Help:Extension:ParserFunctions, plus Extension:Variables (`#var`, `#vardefine`, `#vardefineecho`), plus the plain `{{lc:}}`-style "other parser functions". Implemented in batches.
- **`#expr` modeling**: `ExprParserFunction` takes a raw `string | MediaWikiContents` expression (e.g. `"floor(x/7) mod 2"`), consistent with how `LetterTemplate`/`ReflistTemplate` accept freeform `MediaWikiContents`. No typed expression-builder AST.
- **Parser library architecture**: **Chevrotain**, used fully (not just as a lexer) — Chevrotain Lexer for tokens (`{{`, `}}`, `{{{`, `}}}`, `[[`, `]]`, `[`, `]`, `|`, `=`, list markers, heading markers, HTML tag open/close, comment open/close, bold/italic markers, plain text), Chevrotain's CST parser (`RULE`/`SUBRULE`/`OR`/`MANY`) to declaratively express the recursive/nested grammar (nested `{{ }}`, `[[ ]]`), then a generated **Visitor** class walks the CST and instantiates the actual `@mediawiki-typescript/builder` content classes (`MediaWikiTemplate`, `MediaWikiParserFunction`, `MediaWikiHeader`, `MediaWikiListItem`, `MediaWikiLink`, `MediaWikiExternalLink`, `MediaWikiTable`, `MediaWikiText`, `MediaWikiComment`, `MediaWikiHTML`, `MediaWikiSeparator`, etc.) — reusing `builder` as the parser's *output* type system rather than reinventing content nodes. Chevrotain chosen over pure hand-rolled (less manual index/backtracking bookkeeping, better error messages) and over Peggy/Ohm (declarative PEG grammars are a poor fit for wikitext's "unbalanced braces degrade to literal text" behavior; Chevrotain's imperative-ish CST rules make these fallbacks easier to express).
- **Parser input sources (v1)**: all four — `string`, fs file path (Node `fs.readFile`), Node `Readable` stream (buffered fully before parsing, not truly streaming), and `URL`/link (plain `fetch`/`http(s)` GET of raw text content — NOT a MediaWiki Action API integration; that's a future enhancement, possibly via `@mediawiki-typescript/api` later).
- **Fidelity goal**: best-effort semantic equivalence. Rebuilt output (`parse(x).map(c => c.build())`) is not required to be byte-identical to the original wikitext — whitespace/formatting normalization matching `MediaWikiBuilder`'s own conventions is acceptable. No lossless round-trip requirement.

### Part 2A: ParserFunctions in `packages/builder`

**Phase 1: Generic `MediaWikiParserFunction` content type**
1. New content type folder `packages/builder/src/builder/content/contents/MediaWikiParserFunction/` (sibling to `MediaWikiTemplate/`): `MediaWikiParserFunction.ts` extends `MediaWikiContent`, models `{{name:arg1|arg2|...}}` (colon-first, then pipe-joined; no colon/braces if zero args) via `add(value: string)` — simpler than `MediaWikiTemplate` (no multi-line "collapsed" expansion; parser functions always render inline).
2. `MediaWikiParserFunction.types.ts` (minimal — likely just re-exports/none needed beyond the class itself).
3. `MediaWikiParserFunction.test.ts` + snapshot, mirroring `MediaWikiTemplate.test.ts` conventions.
4. Export from `packages/builder/src/builder/content/contents/index.ts`.

**Phase 2: `parserFunctions/` typed wrapper subfolder (mirrors `templates/` pattern)**
5. Abstract `ParserFunction` base class in `parserFunctions/ParserFunction.ts` (name + abstract `build(): MediaWikiParserFunction`), analogous to `templates/Template.ts`.
6. **Conditional/logic functions** (own folder each, with `.ts`/`.types.ts` where options exist/`.test.ts`/snapshot, same structure as `ReflistTemplate`): `IfParserFunction` (#if: test|then|else), `IfEqParserFunction` (#ifeq: str1|str2|then|else), `IfErrorParserFunction` (#iferror: test|error?|correct?), `IfExprParserFunction` (#ifexpr: expr|then|else), `IfExistParserFunction` (#ifexist: page|exists|notexists), `SwitchParserFunction` (#switch: comparison + ordered case=result pairs incl. `#default`, with a typed `SwitchCase` options type).
7. **Math**: `ExprParserFunction` (#expr: raw expression string/`MediaWikiContents`, per decision above).
8. **Time functions**: `TimeParserFunction` (#time: format|datetime?|lang?|local?), `TimeLParserFunction` (#timel), `TimeFParserFunction` (#timef: datetime|formatType?|lang?), `TimeFLParserFunction` (#timefl) — share a common options type file.
9. **String/path functions**: `TitlePartsParserFunction` (#titleparts: pagename|numSegments?|startSegment?), `RelToAbsParserFunction` (#rel2abs: path|basePath?), and the optional string-function set (`LenParserFunction #len`, `PosParserFunction #pos`, `RPosParserFunction #rpos`, `SubParserFunction #sub`, `CountParserFunction #count`, `ReplaceParserFunction #replace`, `ExplodeParserFunction #explode`, `UrlDecodeParserFunction #urldecode`) — JSDoc note that these require `$wgPFEnableStringFunctions` and are disabled on WMF wikis by default.
10. **Extension:Variables functions**: `VarParserFunction` (#var: name), `VarDefineParserFunction` (#vardefine: name|value), `VarDefineEchoParserFunction` (#vardefineecho: name|value) — JSDoc `@see` links to Extension:Variables (mw.org) noting it's a separate extension, not core ParserFunctions.
11. **"Other parser functions" (magic-word-style, no `#`)**: `LowercaseParserFunction` (lc:), `UppercaseParserFunction` (uc:), `LowercaseFirstParserFunction` (lcfirst:), `UppercaseFirstParserFunction` (ucfirst:), `UrlEncodeParserFunction` (urlencode:), `AnchorEncodeParserFunction` (anchorencode:) — same generic base, just no leading `#` in `name`.
12. Update `packages/builder/src/builder/content/contents/MediaWikiParserFunction/parserFunctions/index.ts` to export all of the above (mirrors `templates/index.ts`, but this file legitimately stays large/exhaustive per user's explicit choice — unlike the earlier `templates/` cleanup, these ARE all "default"/spec-defined functions, not wiki-specific content).
13. Run full `npm run build && npm run lint && npm run test` after each sub-batch (steps 6, 7-8, 9-11 as natural checkpoints) to keep validation incremental rather than one giant untested diff.

### Part 2B: New `packages/parser` library

**Phase 3: Package scaffolding**
14. `packages/parser/package.json`: add `dependencies`: `@mediawiki-typescript/builder` (workspace), `chevrotain`; `devDependencies`: `jest`, `ts-jest`, `@types/jest`, `tsup` (mirrors `builder`'s publishable-package setup from Part 1); scripts `build: tsup`, `test: jest`; add `publishConfig.access: public`, `license: GPL-3.0`, `files`, `main`/`module`/`types` — same pattern as `packages/builder/package.json`.
15. Add `packages/parser/tsup.config.ts`, `packages/parser/jest.config.js` (copy from `packages/builder`).
16. Update `packages/parser/tsconfig.json` `types` array to include `"jest"` (same fix as needed for `builder` in Part 1).

**Phase 4: Lexer (tokenizer)**
17. `src/lexer/tokens.ts`: Chevrotain token definitions — `TemplateOpen` (`{{`), `TemplateClose` (`}}`), `TripleOpen` (`{{{`), `TripleClose` (`}}}`), `Pipe` (`|`), `Equals` (`=`), `LinkOpen`/`LinkClose` (`[[`/`]]`), `ExtLinkOpen`/`ExtLinkClose` (`[`/`]`), `HeadingMarker` (`={1,6}` at line start, longest match first), `ListMarker` (`[*#;:]+` at line start), `HorizontalRule` (`----+`), `TagOpen`/`TagClose` (regex matching `<tag ...>`/`</tag>`), `CommentOpen`/`CommentClose` (`<!--`/`-->`), `Bold` (`'''`), `Italic` (`''`), `Newline`, `Whitespace` (skipped/grouped per MediaWiki's whitespace rules), `PlainText` (catch-all, longest-match-last).
18. `src/lexer/Lexer.ts`: Chevrotain `Lexer` instance wiring the token vocabulary.

**Phase 5: CST Parser (grammar)**
19. `src/parser/WikitextParser.ts`: Chevrotain `CstParser` subclass with `RULE`s for `document` (sequence of `block`s), `block` (`heading | list | table | horizontalRule | paragraph`), `paragraph`/`inline` (sequence of `templateOrParserFunction | link | externalLink | tag | comment | boldItalicRun | plainText`), `templateOrParserFunction` (handles `{{`, peeks for `#`/known-function-name + `:` vs. template `|`/`=` syntax, recursively `SUBRULE`s itself for nested `{{`), `link`, `externalLink`, `tag`, `comment` — mirrors MediaWiki's own two-phase (brace-preprocessor + block-parser) design.
20. Handle the "unbalanced braces degrade to plain text" and other non-context-free fallback behaviors via Chevrotain's backtracking/gate mechanisms or explicit lookahead, documented inline with comments citing the relevant Help:Extension:ParserFunctions/Help:Formatting behavior being replicated.

**Phase 6: CST → `MediaWikiContents` Visitor**
21. `src/visitor/WikitextToBuilderVisitor.ts`: extends Chevrotain's generated base `CstVisitor`, implements a `visit` method per grammar rule that instantiates the corresponding `@mediawiki-typescript/builder` class: headings → `MediaWikiHeader`, lists → `MediaWikiListItem`, tables → `MediaWikiTable`, horizontal rule → `MediaWikiSeparator`, `[[...]]` → `MediaWikiLink`, `[url text]` → `MediaWikiExternalLink`, `<!-- -->` → `MediaWikiComment`, recognized tags → `MediaWikiHTML`, `{{Name|...}}` → `MediaWikiTemplate`, `{{#name:...}}`/`{{lc:...}}` → `MediaWikiParserFunction` (from Part 2A), plain runs → `MediaWikiText`.
22. Note known gaps to flag in code comments (not necessarily fixed in v1): `{{{param|default}}}` template-parameter placeholders have no corresponding `builder` content class yet (parsed as plain `MediaWikiText` passthrough for now); nested list/table edge cases per Help:Formatting's "mixture of list types" section may only get basic support initially.

**Phase 7: Input-source abstraction**
23. `src/input/resolveInput.ts`: `resolveInput(input: string | { filePath: string } | Readable | URL): Promise<string>` — string passthrough; file path via `fs.promises.readFile`; `Readable` buffered via stream-to-string; `URL` via a plain `fetch(url).then(r => r.text())` (no MediaWiki API semantics, just raw text fetch — document this limitation clearly in JSDoc/README).
24. `src/index.ts` (replacing the placeholder): `export async function parse(input: ...): Promise<MediaWikiContents>` — resolves input to a string, runs it through the Lexer → CstParser → Visitor pipeline, returns the resulting content array (usable directly with `MediaWikiBuilder.addContents()`).

**Phase 8: Testing**
25. `jest` + `ts-jest`, co-located `*.test.ts` files per lexer/parser/visitor module plus integration tests in `src/parse.test.ts` covering: each Help:Formatting construct (bold, italic, headings 2-6, bullet/numbered/definition lists, horizontal rule, tables, links, external links, nowiki, comments) individually; each implemented ParserFunction call form (drawing on the same example strings the user gave: `{{#switch:{{#var:weekly}}|0=LMS Competitive|1=}}` and the `#vardefine`/`#expr`/`#time` nested example) as fixtures; verify `parse(x)` → `.map(c => c.build())` produces semantically-equivalent wikitext (best-effort fidelity per decision, not byte-identical) via targeted assertions rather than blanket snapshot-diffing against the raw input.
26. Snapshot tests for the CST/AST shape on a few representative inputs (useful for catching accidental grammar regressions).

### Relevant files
- `packages/builder/src/builder/content/contents/MediaWikiParserFunction/**` — new content type + `parserFunctions/` typed subclasses
- `packages/builder/src/builder/content/contents/index.ts` — add new export
- `packages/parser/package.json`, `tsconfig.json`, `tsup.config.ts` (new), `jest.config.js` (new)
- `packages/parser/src/lexer/**`, `src/parser/**`, `src/visitor/**`, `src/input/**`, `src/index.ts` — all new
- Reference/reused: `packages/builder/src/builder/content/contents/MediaWikiTemplate/**`, `templates/Template.ts`, `templates/ReflistTemplate/**` as structural templates for the new ParserFunction classes

### Verification
1. `npm run build && npm run lint && npm run test` green across the whole monorepo (incl. new `parser` package) after each phase checkpoint.
2. `packages/builder` snapshot tests cover every new ParserFunction class's `.build()` output against the exact wikitext syntax documented on Help:Extension:ParserFunctions.
3. `packages/parser` integration tests successfully parse the two example strings from the user's request end-to-end and produce a `MediaWikiParserFunction`/`MediaWikiTemplate` tree whose `.build()` output is semantically equivalent.
4. `npm pack --dry-run` for `packages/parser` once publish-ready, matching the `builder`/`mw-cli` pattern from Part 1.

### Further Considerations
1. `{{{param|default}}}` template-parameter placeholders have no `builder` content-class representation yet — needed for full template-body parsing (e.g. parsing a `Template:Foo` page's own source, not just calls to templates). Propose adding a `MediaWikiTemplateParameter` content type as a fast-follow once the core parser lands, rather than blocking this plan.
2. URL/link input resolution is a plain HTTP GET of raw text (e.g. `?action=raw`-style URLs the caller constructs themselves) — it does NOT know how to call the MediaWiki Action API (`action=parse`/`action=query`) to fetch wikitext by page title. Deeper `@mediawiki-typescript/api` integration for "fetch wikitext by page title on wiki X" is a natural future enhancement but out of scope here.
3. Given the exhaustive ParserFunctions scope (~28 typed classes), consider whether to land Part 2A (builder) and Part 2B (parser package) as separate PRs/changesets rather than one large one, for reviewability.
4. Publishing `@mediawiki-typescript/*` for the first time requires the `@mediawiki-typescript` npm org/scope to exist and the `NPM_TOKEN` used in CI to have publish rights to it — this is an out-of-band manual step (npmjs.com org creation) the user must do; not something achievable from the workspace.
5. If `main` has branch protection, the default `GITHUB_TOKEN` may not be able to push the version-bump PR — mediawiki-builder uses a `PUBLISH_PACKAGES` secret (PAT) for this; recommend the same unless the default token is confirmed sufficient.
6. `api`/`parser`(pre-Part-2B)/`tanstack-query` are intentionally left un-published (still stubs) beyond what's built in Part 2B — confirm if `api`/`tanstack-query` should also get publish-ready config even without real implementations yet.

### Refinements from Manual:Parser (real MediaWiki parser architecture)
[Manual:Parser](https://www.mediawiki.org/wiki/Manual:Parser) describes the legacy MediaWiki parser's actual pipeline: **Preprocessor DOM generation** (brace/template structure → XML-like DOM, unrelated to HTML) → **Preprocessor expansion** (template/parser-function expansion, leaving strip-marker/heading-marker placeholders) → **Sanitizer::removeHTMLtags** (security pass, also strips HTML comments) → **markup transformation passes** (`doTableStuff`, `doDoubleUnderscore`, `doHeadings`, `replaceInternalLinks`, `doAllQuotes`, `replaceExternalLinks`, `doMagicLinks`, `formatHeadings`) → `internalParseHalfParsed` (`doBlockLevels`, link-holder replacement, language conversion, Tidy). This **validates** the plan's two-phase design (Chevrotain CST for brace/template preprocessing, then a block/line-level pass for headings/lists/tables/quotes/links) — no architecture change needed. Three refinements added as a result:
1. **Strip-marker / opaque-tag handling**: real MediaWiki protects extension-tag content (`<nowiki>`, `<pre>`, `<ref>`, `<math>`, `<syntaxhighlight>`, etc.) via strip markers *before* any block-level wikitext passes run — their inner content is never itself wikitext-parsed. Phase 5/6 (parser grammar + visitor) must treat these tags as opaque: consume raw text until the matching close tag, do not recurse into it as wikitext.
2. **Bold/italic (`doAllQuotes`) is not naive greedy matching**: MediaWiki resolves `''`/`'''` runs via a specific per-line apostrophe-counting algorithm (e.g. 5 consecutive apostrophes = bold+italic, 4 = leftover `'` + bold, etc.), not simple left-to-right `''`/`'''` token pairing. Phase 5 grammar / Phase 6 visitor must replicate this counting algorithm rather than a naive alternating-token approach, or bold/italic will misparse on ambiguous apostrophe runs.
3. **Explicitly out of scope** (confirmed by Manual:Parser's Output/Caching/Batching sections, which only matter for a live wiki rendering to HTML): ParserOutput metadata (categories, language links, ResourceLoader modules, TOC/section-edit-link generation), all caching layers (ParserCache, PPFrame volatile/empty-argument cache, VarCache, parse-time cache), link-colouring/batching, Tidy/HTML output. None of this applies since the `parser` package's job stops at producing a `MediaWikiContents` tree, not rendering a live wiki page.
4. **Performance note**: MediaWiki's real parser explicitly prioritizes worst-case-linear performance on inputs up to ~2MB over readability/simplicity. Not a stated goal for v1 (typical page-sized inputs expected); flagged as a future tuning consideration if ever used on very large inputs.

## Post-implementation review feedback (addressed)

1. **JSDoc placement**: 30 ParserFunction implementation files had their JSDoc block at the very top of the file (above imports) instead of directly above the `class`/`type`/`enum` declaration. Fixed via a script that moved each leading `/** ... */` block to sit immediately above the corresponding `export class` line, in all `packages/builder/src/builder/content/contents/MediaWikiParserFunction/parserFunctions/**` files.
2. **Table parsing gap**: the parser previously had no support for `{| ... |}` wikitext table syntax at all (only headings/lists/hr/paragraphs). Added:
   - `packages/parser/src/blocks/splitTopLevel.ts` — bracket-depth-aware string splitting (ignores `|`/`!!`/`||` occurrences nested inside `{{ }}`/`[[ ]]`), used both for table cell/attribute splitting and shared table content parsing.
   - `packages/parser/src/blocks/parseTable.ts` — a dedicated line-based table parser (`parseTableBlock`), mirroring MediaWiki's own `doTableStuff` (per Manual:Parser, described as "a simple line-based parser" distinct from the main preprocessor) — handles `{|` table attributes, `|+` captions, `|-` row separators/attributes, `!`/`|` header/data cells with `!!`/`||` same-line separators and `attrs|content` splitting, and multi-line cell content continuation. Known limitation: no nested-table support (documented in the function's own doc comment).
   - `splitBlocks.ts` extended with a `TableBlock` type and `{|`/`|}` line-range detection.
   - `src/index.ts` extended to convert a `ParsedTable` into a real `MediaWikiTable` (via `@mediawiki-typescript/builder`), including `class`/`style` table & row options and `class`/`style`/`colspan`/`rowspan`/`header` cell options (parsed via a new shared `src/attributes.ts` utility, extracted from what was a private helper inside `WikitextToBuilderVisitor.ts`).
   - Added table test coverage to `formatting.test.ts` (header+data rows with `!!`/`||` same-line cells, and `class`/caption/`colspan` attribute handling).
3. **chevrotain dependency version**: previously downgraded from 13.x to 10.5.0 to sidestep a CJS/ESM interop failure — reverted, chevrotain is now pinned at the current major (`^13.2.0`) with the actual interop issue fixed at its root instead of avoided:
   - **Shipped build**: `tsup.config.ts` now sets `noExternal: ["chevrotain"]`, so esbuild bundles/inlines chevrotain's ESM source directly into our own CJS *and* ESM output at build time — verified by running the built `dist/index.js` directly under plain Node `require()`.
   - **Test-time**: chevrotain 13's own internal `@chevrotain/*` subpackages (`utils`, `gast`, `regexp-to-ast`, `cst-dts-gen`) declare only an `"import"` condition in their `package.json` `"exports"` map (no `"require"`), which breaks plain Node/Jest CJS resolution even before any syntax-transform step runs. Fixed in `jest.config.js` via: (a) `transformIgnorePatterns` widened to let ts-jest transform `chevrotain`/`@chevrotain/*` source (normally skipped for all of `node_modules`), (b) `moduleNameMapper` entries that resolve each affected `@chevrotain/*` subpackage to its concrete `lib/src/api.js` file (computed dynamically via `require.resolve("chevrotain")` + relative path math, not hardcoded, so it isn't sensitive to hoisting location), bypassing the incomplete exports map entirely; (c) `tsconfig.json` `allowJs: true` so ts-jest can transpile those `.js` files too.
   - Net effect: chevrotain is no longer 3 major versions behind, with no functional or dependency-version compromise in either the shipped package or the test suite.

