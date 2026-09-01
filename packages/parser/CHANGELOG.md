# @mediawiki-typescript/parser

## 0.1.0

### Minor Changes

- [#4](https://github.com/osrs-wiki/mediawiki-typescript/pull/4) [`73dfe40`](https://github.com/osrs-wiki/mediawiki-typescript/commit/73dfe4057b716fdb98b4bbb4600f26dc24487e1c) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Introduce `@mediawiki-typescript/parser`, built from the ground up: parses raw wikitext (string, file, stream, or URL) into `@mediawiki-typescript/builder` `MediaWikiContents`, with a best-effort semantic-equivalence (not strictly byte-for-byte) round-trip fidelity goal.
  
  - Two-stage pipeline mirroring MediaWiki's own parser: a line-based block splitter (headings, lists, horizontal rules, tables, `<gallery>`, magic words, `#REDIRECT`, paragraphs), plus a Chevrotain lexer/CST parser/visitor for inline markup (bold/italic, links, templates, parser functions, tags, external links)
  - Full Help:Formatting coverage: bold/italic (including MediaWiki's real apostrophe-counting algorithm), headings, lists (including definition lists), horizontal rules, `__TOC__`, `#REDIRECT`, dates, comments
  - Full Help:Images coverage: `[[File:...]]`/`[[Image:...]]` with every option (format, resizing incl. `upright`, alignment, `alt`, `page`, `thumbtime`, `start`, `muted`, `loop`, `lossy`, `class`, `lang`, `link`), order-independent
  - Full Help:Tables coverage: captions (with/without attributes), headers, `colspan`/`rowspan`, cell `scope`, same-line `||`/`!!` cells, multi-line cells, and MediaWiki's documented negative-number caveat
  - Full Help:Categories coverage: category tags (with sort keys) and `__HIDDENCAT__`
  - Full Help:Transclusion coverage: template/parser-function calls and all target-page forms, `subst:`, and `<noinclude>`/`<includeonly>`/`<onlyinclude>`
  - Remaining Help:Magic_words, `<gallery>` (including blank lines inside the body), and `<ref>...</ref>` (content is recursively wikitext-parsed, not treated as opaque)
  - Exhaustive ParserFunctions/Variables support matching the builder's parser-function classes
  - 99%+ statement coverage across the package

### Patch Changes

- [#4](https://github.com/osrs-wiki/mediawiki-typescript/pull/4) [`73dfe40`](https://github.com/osrs-wiki/mediawiki-typescript/commit/73dfe4057b716fdb98b4bbb4600f26dc24487e1c) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Fix several parser bugs found via real-world round-trip testing and code review:
  
  - Multi-line template parameters containing list markup (e.g. `{{Template|change=...\n* item\n}}`) no longer crash the parser
  - Tables built from bare/templated rows with no explicit `|`/`!` markers no longer silently drop content
  - `|-{{...}}` row markers followed by a template call no longer swallow that template into the unused row-attributes field
  - `parseAttributes()` now also recognizes unquoted attribute values (e.g. `rowspan=2`), not just quoted ones
  - Positional template/parser-function parameters no longer have intentional leading/trailing whitespace stripped
  - `<gallery>` `widths`/`heights`/`perrow` and table cell `colspan`/`rowspan` no longer emit `NaN` for non-numeric attribute values
- Updated dependencies [[`ad2cbba`](https://github.com/osrs-wiki/mediawiki-typescript/commit/ad2cbbad583a10aa3c8b0cf92151147ea2c4463d), [`73dfe40`](https://github.com/osrs-wiki/mediawiki-typescript/commit/73dfe4057b716fdb98b4bbb4600f26dc24487e1c)]:
  - @mediawiki-typescript/builder@0.1.0
