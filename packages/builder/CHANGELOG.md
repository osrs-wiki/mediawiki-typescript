# @mediawiki-typescript/builder

## 0.1.0

### Minor Changes

- [#12](https://github.com/osrs-wiki/mediawiki-typescript/pull/12) [`ad2cbba`](https://github.com/osrs-wiki/mediawiki-typescript/commit/ad2cbbad583a10aa3c8b0cf92151147ea2c4463d) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Add helpers for querying and mutating a `MediaWikiContents` value (`src/builder/content/list/`):
  
  - Read helpers (`queries.ts`): `findHeadings`, `findSection`, `getSectionContents`, `findAll`, `findTemplate`, `mapContent`, `forEachContent`, `countContent`
  - Write helpers (`mutations.ts`, all immutable — return a new array): `insertAtIndex`, `insertAfter`, `insertBefore`, `insertInSection`, `replaceContent`, `removeContent`, `removeAtIndex`, `removeSection`
  - A chainable `MediaWikiContentList` wrapper delegating to both, e.g. `new MediaWikiContentList(contents).insertInSection("Changes", template).build()`
  - New `flattenContents` utility normalizing `string | MediaWikiContent | MediaWikiContent[]` into a filtered `MediaWikiContent[]` (also used internally by the existing `buildContents`)
  
  Also add recursive content-tree utilities (immutable, ported from real-world usage in `osrs-web-scraper`):
  
  - `MediaWikiContent.utils.ts`: `isContentEmpty`, `contentStartsWith`, `findFirstStringContent`
  - `contentTraversal.ts`: `trimBreaks`, `trimContentEdge`/`trimContentEdges`, `getNextMeaningfulContent`
  
  `MediaWikiContentList` now also exposes the tree-traversal helpers above as methods (`isEmpty`, `startsWith`, `findFirstStringContent`, `trimBreaks`, `trimEdges`, `getNextMeaningfulContent`), so it is a single unified object for every query/mutation/traversal operation — callers no longer need to import standalone functions or care whether a given operation is "list" or "traversal" shaped.

- [#4](https://github.com/osrs-wiki/mediawiki-typescript/pull/4) [`73dfe40`](https://github.com/osrs-wiki/mediawiki-typescript/commit/73dfe4057b716fdb98b4bbb4600f26dc24487e1c) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Add exhaustive ParserFunctions/Variables support and full Help:Formatting/Help:Images/Help:Tables/Help:Categories/Help:Transclusion/Help:Magic_words content-type coverage:
  
  - `MediaWikiParserFunction` (generic) plus dedicated classes for every parser function/variable: `#if`, `#ifeq`, `#ifexpr`, `#iferror`, `#ifexist`, `#switch`, `#expr`, `#time`/`#timel`/`#timef`/`#timefl`, `#titleparts`, `#rel2abs`, `#len`, `#pos`/`#rpos`, `#sub`, `#count`, `#replace`, `#explode`, `#urlencode`/`#urldecode`, `#var`/`#vardefine`/`#vardefineecho`, and the `lc:`/`uc:`/`lcfirst:`/`ucfirst:`/`urlencode:`/`anchorencode:` bare parser functions
  - `MediaWikiRedirect` (`#REDIRECT [[target]]`)
  - `MediaWikiListItem` gains `definitionType?: "term" | "definition"` for `;`/`:` definition-list markers
  - `MediaWikiFile` expanded to the full Help:Images option grammar (`border`, `format` aliases, `resizing.upright`, `alt`, `page`, `thumbtime`, `start`, `muted`, `loop`, `lossy`, `class`, `lang`, corrected height-only resizing output, `link` now distinguishes "no option" from "explicit no-link"); `FileVerticalAlignment` gains `"middle"`
  - `MediaWikiTable` gains `captionOptions` (`|+ style="..." | caption`) and cell `scope` (Help:Tables#Accessibility)
  - `MediaWikiTemplate` gains a `subst` option, rendering `{{subst:Name|...}}`
  - `MediaWikiCategory` (`[[Category:Name]]` / `[[Category:Name|SortKey]]`) and `MediaWikiHiddenCategory` (`__HIDDENCAT__`)
  - `MediaWikiNoInclude`, `MediaWikiIncludeOnly`, `MediaWikiOnlyInclude` (`<noinclude>`/`<includeonly>`/`<onlyinclude>`)
  - `MediaWikiDefaultSort` (`{{DEFAULTSORT:key}}`) and the remaining behavior switches `MediaWikiNoTOC`, `MediaWikiForceTOC`, `MediaWikiNoEditSection`, `MediaWikiNoGallery`, `MediaWikiStaticRedirect`, `MediaWikiIndex`, `MediaWikiNoIndex`
  - `MediaWikiGallery` (`<gallery>`) and `MediaWikiReference` (`<ref>...</ref>` / self-closing `<ref name="..." />`)
  - Removed `MediaWikiVideo` (OSRS-wiki-specific, not a general MediaWiki construct)
