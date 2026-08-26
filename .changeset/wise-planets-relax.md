---
"@mediawiki-typescript/parser": patch
---

Fix several parser bugs found via real-world round-trip testing and code review:

- Multi-line template parameters containing list markup (e.g. `{{Template|change=...\n* item\n}}`) no longer crash the parser
- Tables built from bare/templated rows with no explicit `|`/`!` markers no longer silently drop content
- `|-{{...}}` row markers followed by a template call no longer swallow that template into the unused row-attributes field
- `parseAttributes()` now also recognizes unquoted attribute values (e.g. `rowspan=2`), not just quoted ones
- Positional template/parser-function parameters no longer have intentional leading/trailing whitespace stripped
- `<gallery>` `widths`/`heights`/`perrow` and table cell `colspan`/`rowspan` no longer emit `NaN` for non-numeric attribute values
