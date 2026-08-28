# Plan: `@mediawiki-typescript/api` package

## Context
- Repo: mediawiki-typescript (npm workspaces + turbo). `packages/builder`/`packages/parser` are fully built (tsup + jest). `packages/api` started as a stub (plain `tsc` build, no deps).
- `packages/parser`'s `src/input/resolveInput.ts` explicitly flags future `@mediawiki-typescript/api` integration as out of scope for parser — this package is the intended fulfillment.
- No axios/mwn/other HTTP client existed anywhere in this monorepo before this work.

## Decisions (confirmed with user)
1. **Coverage strategy**: codegen from `action=paraminfo` gives 100% typed **request** coverage across all ~150+ Action API modules (incl. all `query` prop/list/meta/generator submodules). `paraminfo` does not describe response shapes, so generated modules use a generic/passthrough response type; a curated core set of high-value modules (query info/revisions/categories/links/images/extracts/langlinks; allpages/search/categorymembers/backlinks lists; generators; login/clientlogin; edit; upload; delete; move; parse; compare; opensearch; siteinfo) get hand-authored precise response types layered on top. This is the practical ceiling of "100% coverage" and is an intentional, documented scope boundary — not an oversight.
2. **REST API**: included in this plan as Phase 3 (sequential, after Action API core).
3. **Auth**: both Bot Password (`action=clientlogin` + cookie jar + CSRF token) and OAuth 1.0a (owner-only consumer, via `oauth-1.0a` signing), behind a pluggable `AuthStrategy` interface.
4. **Versioning**: runtime `siteinfo`-based capability detection + a static per-module version-override table populated incrementally (not pre-generating every historical MediaWiki version).
5. **Multi-wiki "set current wiki"**: `MediaWikiClient` instance = one wiki (core primitive); `MediaWikiClientRegistry` is an optional convenience layer with `register()`/`setWiki()`/`use()`/`current` for consumers (e.g. mw-cli) that want a single mutable "current wiki" pointer.
6. **Builder/Parser integration**: content-sending calls accept `string | MediaWikiContent | MediaWikiContent[]` (builder's `MediaWikiContents` type), normalized via builder's own `buildContents()`. Content-returning calls accept a `responseFormat?: "string" | "json" | "contents"` option — `"contents"` runs the wikitext through parser's `parse()`. Implemented once as a shared **Content Bridge** (`src/content/`) reused by both the Action API and REST API clients.

## Completion Checklist

### Phase 0 — Package scaffolding
- [x] `package.json` converted to tsup/jest tooling; deps: axios, tough-cookie, axios-cookiejar-support, oauth-1.0a, `@mediawiki-typescript/builder`, `@mediawiki-typescript/parser`; devDeps: nock, tsx (for codegen script), ts-jest, tsup.
- [x] `tsconfig.json` — added `jest` to `types`, excluded `codegen/`.
- [x] `tsup.config.ts`, `jest.config.js` added (mirrors builder/parser).
- [x] `.github/instructions/api.instructions.md` added.
- [x] `docs/plans/api/plan.md` created (this file).

### Phase 1 — Core client + auth + versioning
- [x] `src/errors/MediaWikiApiError.ts`, `MediaWikiAuthError.ts`.
- [x] `src/client/MediaWikiClient.ts` — axios instance, format=json&formatversion=2 defaults, maxlag retry, error normalization (`call()`), token cache (`getToken()`), capability cache (`getCapabilities()`).
- [x] `src/client/MediaWikiClientRegistry.ts` — `register()`/`setWiki()`/`use()`/`get()`/`current`.
- [x] `src/auth/AuthStrategy.ts` interface + `BotPasswordAuth.ts` (clientlogin + cookie jar) + `OAuthAuth.ts` (OAuth1.0a signing via `oauth-1.0a`).
- [x] `src/versioning/detectCapabilities.ts` (siteinfo) + `moduleRegistry.ts` (override table, currently empty by design).
- [x] Unit tests: `MediaWikiClient.test.ts` (nock: request shape, error normalization, maxlag retry, token caching), `MediaWikiClientRegistry.test.ts`.
- [ ] Unit tests for `BotPasswordAuth`/`OAuthAuth` request signing (not yet written — do before Phase 2 write-path modules depend on them for anything beyond manual smoke testing).

### Phase 2 — Action API: codegen + core modules + Content Bridge
- [x] Content Bridge: `src/content/resolveContentInput.ts` (delegates to builder's `buildContents`), `src/content/resolveContentOutput.ts` (string/json/contents via parser's `parse()`), `src/content/content.types.ts` (`ContentReturnFormat`, `ResolvedContent<Format>`), with tests.
- [x] Codegen tool `packages/api/codegen/` (`generate.ts`, `paraminfo.types.ts`, `naming.ts`, `mapParamType.ts`, `emitModule.ts`) — crawls `action=paraminfo` (main module's `action` values + `query`'s prop/list/meta/generator submodules, deduped since some modules like `categories`/`revisions` are usable as both a prop/list AND a generator) and emits one typed `*Params` file per module plus `manifest.ts`. Run via `npm run codegen -- --wiki <url> --out src/action/generated` (requires a `User-Agent` header — Wikimedia wikis reject anonymous requests per their robot policy).
- [x] `src/action/generated/**` — generated against `https://www.mediawiki.org` (270 unique modules after dedup). Committed to the repo.
- [x] `src/action/manifest.test.ts` — coverage guardrail (module count lower bound, curated core-module names all present, exportName uniqueness).
- [x] `src/action/core/*` hand-authored modules: `edit`, `parsePage` (named to avoid colliding with parser's `parse`), `deletePage`, `movePage`, `compare`, `opensearch`, `upload` (multipart via global `FormData`/`Blob`, bypassing `client.call`), `tokens`/`siteinfo` (thin re-exports of existing `MediaWikiClient` methods for discoverability), and `query/` (`query()` generic prop-merge helper, `queryRevisionContent()` using the Content Bridge, and `lists.ts` — `queryAllPages`/`querySearch`/`queryCategoryMembers`/`queryBacklinks`, each prefixing its own params per the submodule's paraminfo `prefix`). All content-bearing ones (`edit`, `parsePage`, `queryRevisionContent`) go through the Content Bridge. Precise response types are hand-modeled for common fields only (not every possible field variant) — documented scope boundary, not an oversight.
- [x] `src/action/ActionApiClient.ts` facade (`new ActionApiClient(client)` → `.edit()`, `.parsePage()`, `.deletePage()`, `.movePage()`, `.compare()`, `.opensearch()`, `.upload()`, `.getToken()`, `.siteinfo()`, `.query.*`). Not (yet) hung directly off `MediaWikiClient` itself as `client.action` — currently a separate class consumers instantiate explicitly; revisit in Phase 4 if `client.action` ergonomics are preferred.
- [x] Unit tests (nock) for every `action/core` module + the facade (12 suites / 32 tests total in the package).
- [ ] Opt-in, env-gated integration tests against a public test wiki (read-only, no credentials).

### Phase 3 — REST API
- [x] `src/rest/restRequest.ts` — shared low-level `/rest.php/v1` request helper (reuses the Action API client's axios instance/auth, normalizes REST error bodies to `MediaWikiApiError`) + `encodeTitle()`.
- [x] `src/rest/pages.ts` — `getPageSource`/`getPageBare`/`getPageHtml`/`getPageWithHtml`/`getPageLanguages`/`getPageFiles`/`createPage`/`updatePage`. Content-bearing ones use the Content Bridge; `createPage`/`updatePage` attach a CSRF token only when `MediaWikiClient.needsCsrfToken()` is true (new public method, delegates to the configured `AuthStrategy.requiresCsrfToken()`).
- [x] `src/rest/search.ts` — `searchPages`/`searchTitles`.
- [x] `src/rest/media.ts` — `getFile`.
- [x] `src/rest/history.ts` — `getPageHistory`/`getPageHistoryCounts`/`getRevision`/`getRevisionSource` (Content Bridge)/`getRevisionHtml`/`getRevisionWithHtml`/`compareRevisions`.
- [x] `src/rest/transform.ts` — `wikitextToHtml`/`htmlToWikitext` (Content Bridge)/`wikitextToLint`.
- [x] `src/rest/RestApiClient.ts` facade (`new RestApiClient(client)` → `.page.*`, `.revision.*`, `.searchPages()`, `.searchTitles()`, `.getFile()`, `.getPageHistory()`, `.getPageHistoryCounts()`, `.wikitextToHtml()`, `.htmlToWikitext()`, `.wikitextToLint()`). Same "standalone class, not hung off `MediaWikiClient`" pattern as `ActionApiClient`.
- [x] Unit tests (nock) per endpoint group + facade smoke tests — 17 suites / 48 tests total in the package.

### Phase 4 — Polish & release readiness
- [ ] README with usage examples (instantiate client, registry `setWiki`, action + rest calls, both auth strategies).
- [ ] Wire `apps/mw-cli` to a real command using the client (proves end-to-end usage + registry).
- [ ] Changeset for `@mediawiki-typescript/api`.
- [ ] Full root `turbo run build && turbo run lint && turbo run test`.

## Architecture (reference)

- `client/MediaWikiClient.ts` — one instance per wiki; `call(action, params, { method, skipAuth })` is the single low-level entry point every generated/core Action API module will call through.
- `client/MediaWikiClientRegistry.ts` — named registry + current pointer, layered on top of plain `MediaWikiClient` instances.
- `auth/AuthStrategy` — `attach(axiosInstance)`, `requiresCsrfToken()`, optional `login(client)`. `BotPasswordAuth` uses `axios-cookiejar-support` + `tough-cookie`; `OAuthAuth` signs requests via `oauth-1.0a` (HMAC-SHA1).
- `versioning/detectCapabilities.ts` — `meta=siteinfo&siprop=general|extensions` → `{ generator, extensions[] }`, cached on the client via `getCapabilities()`.
- `versioning/moduleRegistry.ts` — `getModuleOverride(moduleName)` — empty table today; populate only when a real older-wiki incompatibility is hit.
- `content/` — `resolveContentInput(source: MediaWikiContents): string` (thin wrapper over builder's `buildContents`) and `resolveContentOutput(wikitext, rawResponse, format): Promise<string | unknown | MediaWikiContent[]>`.
- `codegen/` — dev-only paraminfo crawler: `discoverModulePaths()` (main action list + query prop/list/meta/generator submodules, deduped) → `fetchParamInfo()` (batched, 50 modules/request) → `emitModuleFile()` (one `*Params` type per module; no-param modules emit `Record<string, never>` instead of an empty interface to satisfy `no-empty-object-type`) → `manifest.ts`.
- `action/generated/` — codegen output, one file per module (270 as of the `www.mediawiki.org` run), typed params + generic response. Query submodules are params-only (no call wrapper) since composing prop/list/meta/generator params into one `action=query` call needs the module's `prefix` and combination rules — that's `action/core`'s job.
- `action/core/` — hand-authored precise response types for the curated module list: `edit.ts`, `parsePage.ts`, `deletePage.ts`, `movePage.ts`, `compare.ts`, `opensearch.ts`, `upload.ts`, `tokens.ts`, `siteinfo.ts`, `query/query.ts` (generic `prop=` merge via `QueryPropResultMap`), `query/lists.ts` (`allpages`/`search`/`categorymembers`/`backlinks`, each auto-prefixing params per the submodule's paraminfo `prefix`, e.g. `ap`/`sr`/`cm`/`bl`).
- `action/ActionApiClient.ts` — facade binding every `action/core` function to one `MediaWikiClient` instance, so callers write `actionApi.edit(options)` instead of `edit(client, options)`.
- `rest/restRequest.ts` — shared low-level REST request helper, reusing the same axios instance/auth as the Action API client but pointed at `{baseUrl}/w/rest.php/v1`; normalizes REST errors to `MediaWikiApiError` the same as `MediaWikiClient.call()` does for Action API errors.
- `rest/pages.ts`, `rest/search.ts`, `rest/media.ts`, `rest/history.ts`, `rest/transform.ts` — typed wrappers for every documented REST endpoint (see `API:REST_API/Reference`), reusing the Content Bridge for content-bearing endpoints.
- `rest/RestApiClient.ts` — facade over the `rest/*` modules, same binding pattern as `ActionApiClient`.
- `MediaWikiClient.needsCsrfToken()` — new public method (`this.auth?.requiresCsrfToken() ?? false`), used by both `action/core`'s write modules (via the token they already fetch unconditionally) and `rest/pages.ts`'s `createPage`/`updatePage` (which only attach a token when this is true, since OAuth doesn't need one).

## Relevant files
- [packages/api/package.json](../../../packages/api/package.json)
- [packages/api/tsconfig.json](../../../packages/api/tsconfig.json)
- [packages/api/tsconfig.codegen.json](../../../packages/api/tsconfig.codegen.json)
- [packages/api/tsup.config.ts](../../../packages/api/tsup.config.ts)
- [packages/api/jest.config.js](../../../packages/api/jest.config.js)
- [packages/api/src/index.ts](../../../packages/api/src/index.ts)
- [packages/api/src/client/MediaWikiClient.ts](../../../packages/api/src/client/MediaWikiClient.ts)
- [packages/api/src/client/MediaWikiClientRegistry.ts](../../../packages/api/src/client/MediaWikiClientRegistry.ts)
- [packages/api/src/auth/](../../../packages/api/src/auth)
- [packages/api/src/versioning/](../../../packages/api/src/versioning)
- [packages/api/src/content/](../../../packages/api/src/content)
- [packages/api/src/errors/](../../../packages/api/src/errors)
- [packages/api/codegen/](../../../packages/api/codegen)
- [packages/api/src/action/generated/](../../../packages/api/src/action/generated)
- [packages/api/src/action/manifest.test.ts](../../../packages/api/src/action/manifest.test.ts)
- [.github/instructions/api.instructions.md](../../../.github/instructions/api.instructions.md)

## Verification
1. `npm install` at repo root resolves new deps (axios, tough-cookie, axios-cookiejar-support, oauth-1.0a, nock, tsx) without conflicts.
2. `npm run build` (turbo, root) — packages/api builds cjs+esm+dts cleanly.
3. `npm run test` (turbo, root) — new jest suites (client, registry, content bridge) pass; builder/parser suites unaffected.
4. `npm run lint` (turbo, root) — no new eslint violations.
5. (Later phases) codegen manifest coverage guardrail; live smoke test of `MediaWikiClientRegistry` + a real Action/REST call.

## Further Considerations
1. Response-type completeness beyond the curated core module list is intentionally out of scope long-term, not just for v1 — flagged explicitly to the user as the practical ceiling of "100% coverage". Within the curated core set itself, only commonly-used fields are modeled (not every possible field permutation each module can return).
2. Reference wiki for codegen: chose `www.mediawiki.org` for the initial run (always-latest core). Revisit whether the OSRS Wiki's own instance should be used instead/also once Phase 4 mw-cli wiring clarifies real usage patterns — not yet decided either way.
3. `BotPasswordAuth`/`OAuthAuth` have no dedicated unit tests yet (tracked above) — add before relying on them for real write-path testing.
4. Wikimedia wikis require a `User-Agent` header on Action API requests (reject anonymous requests per their robot policy, T400119) — the codegen tool sets one; if `action/core`/`rest` modules ever call Wikimedia wikis directly in tests/integration, they'll need the same.
5. `ActionApiClient` is a standalone class a consumer instantiates (`new ActionApiClient(client)`), not currently attached to `MediaWikiClient` itself as a `client.action` property — same pattern used for `RestApiClient`. Revisit in Phase 4 based on how `mw-cli` wiring feels; wiring either directly onto the client would create a circular import between `client/` and `action/`/`rest/` that's currently avoided by keeping them decoupled.
6. `upload()` bypasses `MediaWikiClient.call()`'s URL/form-encoding entirely (multipart via global `FormData`/`Blob`) and manually replicates its auth/error-handling — if `call()`'s error/auth logic changes, `upload()` needs a matching update since it doesn't go through the same code path.
7. REST API error response shapes aren't fully standardized across all endpoints (some are RFC 7807-ish, some are ad hoc) — `restRequest.ts`'s error normalization reads a best-effort set of fields (`message`/`title`/`httpReason`) rather than a single canonical shape; revisit if real REST error responses don't map cleanly.
