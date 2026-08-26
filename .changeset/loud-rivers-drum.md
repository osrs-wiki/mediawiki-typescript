---
"@mediawiki-typescript/builder": minor
---

Add exhaustive ParserFunctions/Variables support and full Help:Formatting/Help:Images/Help:Tables/Help:Categories/Help:Transclusion/Help:Magic_words content-type coverage:

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
