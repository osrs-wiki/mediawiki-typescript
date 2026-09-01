---
"@mediawiki-typescript/api": minor
---

Resolve the `"contents"` `responseFormat` to a `MediaWikiContentList`, exposing every query/mutation/traversal helper directly via dot notation (e.g. `result.source.findSection(...)`, `result.source.insertInSection(...)`, `result.source.trimBreaks()`).
