---
"@mediawiki-typescript/api": minor
---

Add the foundational scaffolding for `@mediawiki-typescript/api`, a typed axios-based client for the MediaWiki Action API and REST API:

- `MediaWikiClient` (one wiki connection per instance) + `MediaWikiClientRegistry` (named multi-wiki convenience wrapper with a "current wiki" pointer)
- Pluggable `AuthStrategy`: `BotPasswordAuth` (cookie session + CSRF tokens) and `OAuthAuth` (OAuth 1.0a owner-only consumer)
- Runtime version/capability detection via `meta=siteinfo` (`MediaWikiClient.getCapabilities()`)
- A shared content bridge integrating `@mediawiki-typescript/builder`/`@mediawiki-typescript/parser`: content-bearing calls accept `source` as wikitext or `MediaWikiContents`
