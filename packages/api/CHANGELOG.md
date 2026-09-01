# @mediawiki-typescript/api

## 0.1.0

### Minor Changes

- [#9](https://github.com/osrs-wiki/mediawiki-typescript/pull/9) [`02fef37`](https://github.com/osrs-wiki/mediawiki-typescript/commit/02fef37007cb9772b0095bf7e7da435406889a2f) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Add hand-authored precise response types and an `ActionApiClient` facade for a curated high-value Action API module set (`edit`, `query` info/revisions/categories/links/images/extracts/langlinks, `allpages`/`search`/`categorymembers`/`backlinks`, `delete`, `move`, `upload`, `parse`, `compare`, `opensearch`).

- [#8](https://github.com/osrs-wiki/mediawiki-typescript/pull/8) [`af45673`](https://github.com/osrs-wiki/mediawiki-typescript/commit/af456738fdb585817692244a1b2f78f7c1160069) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Add a `paraminfo`-driven codegen tool (`packages/api/codegen/`) and 100% typed request coverage for all 270+ MediaWiki Action API modules (`packages/api/src/action/generated/`).

- [#13](https://github.com/osrs-wiki/mediawiki-typescript/pull/13) [`23d86cc`](https://github.com/osrs-wiki/mediawiki-typescript/commit/23d86cc6dcc39398acc96b1f41170db981a7a255) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Resolve the `"contents"` `responseFormat` to a `MediaWikiContentList`, exposing every query/mutation/traversal helper directly via dot notation (e.g. `result.source.findSection(...)`, `result.source.insertInSection(...)`, `result.source.trimBreaks()`).

- [#7](https://github.com/osrs-wiki/mediawiki-typescript/pull/7) [`8ae5c31`](https://github.com/osrs-wiki/mediawiki-typescript/commit/8ae5c31d82a3f6ad2a1c85b66d1fc2601e7fc486) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Add the foundational scaffolding for `@mediawiki-typescript/api`, a typed axios-based client for the MediaWiki Action API and REST API:
  
  - `MediaWikiClient` (one wiki connection per instance) + `MediaWikiClientRegistry` (named multi-wiki convenience wrapper with a "current wiki" pointer)
  - Pluggable `AuthStrategy`: `BotPasswordAuth` (cookie session + CSRF tokens) and `OAuthAuth` (OAuth 1.0a owner-only consumer)
  - Runtime version/capability detection via `meta=siteinfo` (`MediaWikiClient.getCapabilities()`)
  - A shared content bridge integrating `@mediawiki-typescript/builder`/`@mediawiki-typescript/parser`: content-bearing calls accept `source` as wikitext or `MediaWikiContents`

- [#11](https://github.com/osrs-wiki/mediawiki-typescript/pull/11) [`3abc5de`](https://github.com/osrs-wiki/mediawiki-typescript/commit/3abc5de0f6cc1f286128b527c8a2945902703e93) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Wire `@mediawiki-typescript/api` into `mw-cli`, add opt-in end-to-end tests that exercise the Action and REST API clients against a live wiki, and finish package documentation.

- [#10](https://github.com/osrs-wiki/mediawiki-typescript/pull/10) [`42e9e38`](https://github.com/osrs-wiki/mediawiki-typescript/commit/42e9e3879e80e815d31d16d33efc49dea3e8dfed) Thanks [@allenkinzalow](https://github.com/allenkinzalow)! - Add a `RestApiClient` facade with full `/rest.php/v1` coverage (search, pages, media files, history/revisions, transform).

### Patch Changes

- Updated dependencies [[`73dfe40`](https://github.com/osrs-wiki/mediawiki-typescript/commit/73dfe4057b716fdb98b4bbb4600f26dc24487e1c), [`ad2cbba`](https://github.com/osrs-wiki/mediawiki-typescript/commit/ad2cbbad583a10aa3c8b0cf92151147ea2c4463d), [`73dfe40`](https://github.com/osrs-wiki/mediawiki-typescript/commit/73dfe4057b716fdb98b4bbb4600f26dc24487e1c), [`73dfe40`](https://github.com/osrs-wiki/mediawiki-typescript/commit/73dfe4057b716fdb98b4bbb4600f26dc24487e1c)]:
  - @mediawiki-typescript/parser@0.1.0
  - @mediawiki-typescript/builder@0.1.0
