---
"@mediawiki-typescript/builder": minor
---

Add helpers for querying and mutating a `MediaWikiContents` value (`src/builder/content/list/`):

- Read helpers (`queries.ts`): `findHeadings`, `findSection`, `getSectionContents`, `findAll`, `findTemplate`, `mapContent`, `forEachContent`, `countContent`
- Write helpers (`mutations.ts`, all immutable — return a new array): `insertAtIndex`, `insertAfter`, `insertBefore`, `insertInSection`, `replaceContent`, `removeContent`, `removeAtIndex`, `removeSection`
- A chainable `MediaWikiContentList` wrapper delegating to both, e.g. `new MediaWikiContentList(contents).insertInSection("Changes", template).build()`
- New `flattenContents` utility normalizing `string | MediaWikiContent | MediaWikiContent[]` into a filtered `MediaWikiContent[]` (also used internally by the existing `buildContents`)

Also add recursive content-tree utilities (immutable, ported from real-world usage in `osrs-web-scraper`):

- `MediaWikiContent.utils.ts`: `isContentEmpty`, `contentStartsWith`, `findFirstStringContent`
- `contentTraversal.ts`: `trimBreaks`, `trimContentEdge`/`trimContentEdges`, `getNextMeaningfulContent`

`MediaWikiContentList` now also exposes the tree-traversal helpers above as methods (`isEmpty`, `startsWith`, `findFirstStringContent`, `trimBreaks`, `trimEdges`, `getNextMeaningfulContent`), so it is a single unified object for every query/mutation/traversal operation — callers no longer need to import standalone functions or care whether a given operation is "list" or "traversal" shaped.
