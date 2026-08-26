---
"@mediawiki-typescript/parser": minor
---

Introduce `@mediawiki-typescript/parser`, built from the ground up: parses raw wikitext (string, file, stream, or URL) into `@mediawiki-typescript/builder` `MediaWikiContents`, with a best-effort semantic-equivalence (not strictly byte-for-byte) round-trip fidelity goal.

- Two-stage pipeline mirroring MediaWiki's own parser: a line-based block splitter (headings, lists, horizontal rules, tables, `<gallery>`, magic words, `#REDIRECT`, paragraphs), plus a Chevrotain lexer/CST parser/visitor for inline markup (bold/italic, links, templates, parser functions, tags, external links)
- Full Help:Formatting coverage: bold/italic (including MediaWiki's real apostrophe-counting algorithm), headings, lists (including definition lists), horizontal rules, `__TOC__`, `#REDIRECT`, dates, comments
- Full Help:Images coverage: `[[File:...]]`/`[[Image:...]]` with every option (format, resizing incl. `upright`, alignment, `alt`, `page`, `thumbtime`, `start`, `muted`, `loop`, `lossy`, `class`, `lang`, `link`), order-independent
- Full Help:Tables coverage: captions (with/without attributes), headers, `colspan`/`rowspan`, cell `scope`, same-line `||`/`!!` cells, multi-line cells, and MediaWiki's documented negative-number caveat
- Full Help:Categories coverage: category tags (with sort keys) and `__HIDDENCAT__`
- Full Help:Transclusion coverage: template/parser-function calls and all target-page forms, `subst:`, and `<noinclude>`/`<includeonly>`/`<onlyinclude>`
- Remaining Help:Magic_words, `<gallery>` (including blank lines inside the body), and `<ref>...</ref>` (content is recursively wikitext-parsed, not treated as opaque)
- Exhaustive ParserFunctions/Variables support matching the builder's parser-function classes
- 99%+ statement coverage across the package
