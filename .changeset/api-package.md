---
"@mediawiki-typescript/api": minor
---

Introduce `@mediawiki-typescript/api`, a typed axios-based client for the MediaWiki Action API and REST API.

- `MediaWikiClient` (one wiki connection per instance) + `MediaWikiClientRegistry` (named multi-wiki convenience wrapper with a "current wiki" pointer)
- Pluggable `AuthStrategy`: `BotPasswordAuth` (cookie session + CSRF tokens) and `OAuthAuth` (OAuth 1.0a owner-only consumer)
- Runtime version/capability detection via `meta=siteinfo` (`MediaWikiClient.getCapabilities()`)
- Action API: 100% typed request coverage for all 270+ modules via a `paraminfo`-driven codegen tool (`packages/api/codegen/`), plus hand-authored precise response types + an `ActionApiClient` facade for a curated high-value module set (`edit`, `query` info/revisions/categories/links/images/extracts/langlinks, `allpages`/`search`/`categorymembers`/`backlinks`, `delete`, `move`, `upload`, `parse`, `compare`, `opensearch`)
- REST API: full `/rest.php/v1` coverage (search, pages, media files, history/revisions, transform) via a `RestApiClient` facade
- A shared content bridge integrating `@mediawiki-typescript/builder`/`@mediawiki-typescript/parser`: content-bearing calls accept `source` as wikitext or `MediaWikiContents`, and content-returning calls support a `responseFormat` of `"string"`, `"json"`, or `"contents"` — `"contents"` resolves to a `MediaWikiContentList`, exposing every query/mutation/traversal helper directly via dot notation (e.g. `result.source.findSection(...)`, `result.source.insertInSection(...)`, `result.source.trimBreaks()`)
