# @mediawiki-typescript/api

A typed client for the MediaWiki [Action API](https://www.mediawiki.org/wiki/API:Action_API) and
[REST API](https://www.mediawiki.org/wiki/API:REST_API), built on [axios](https://axios-http.com/).
Integrates with [`@mediawiki-typescript/builder`](../builder) and
[`@mediawiki-typescript/parser`](../parser) so page content can be sent/received as either raw
wikitext or structured `MediaWikiContents`.

See [`docs/plans/api/plan.md`](../../docs/plans/api/plan.md) for the full design/implementation
plan and current status.

## Install

```sh
npm install @mediawiki-typescript/api
```

## Quick start

```ts
import { MediaWikiClient, ActionApiClient, RestApiClient } from "@mediawiki-typescript/api";

const client = new MediaWikiClient({ baseUrl: "https://oldschool.runescape.wiki" });
const actionApi = new ActionApiClient(client);
const restApi = new RestApiClient(client);

// Action API: query + edit
const { pages } = await actionApi.query.query({ titles: ["Sandbox"], prop: ["revisions"] as const });
await actionApi.edit({ title: "Sandbox", source: "Hello world", summary: "Testing" });

// REST API: get/update page source
const page = await restApi.page.getSource("Sandbox");
await restApi.page.update("Sandbox", { source: "Hello again", comment: "Testing", latestId: page.latest.id });
```

## Working with multiple wikis

`MediaWikiClient` is bound to one wiki per instance. Use `MediaWikiClientRegistry` for a single
mutable "current wiki" pointer instead of threading a specific client through your own code:

```ts
import { MediaWikiClient, MediaWikiClientRegistry, ActionApiClient } from "@mediawiki-typescript/api";

const registry = new MediaWikiClientRegistry();
registry.register("osrs", new MediaWikiClient({ baseUrl: "https://oldschool.runescape.wiki" }));
registry.register("test", new MediaWikiClient({ baseUrl: "https://test.wikipedia.org" }));

registry.setWiki("test");
const actionApi = new ActionApiClient(registry.current);
```

## Authentication

Two `AuthStrategy` implementations are provided; pass one to `MediaWikiClient`'s `auth` option.

```ts
import { MediaWikiClient, BotPasswordAuth, OAuthAuth } from "@mediawiki-typescript/api";

// Cookie session via Special:BotPasswords
const botClient = new MediaWikiClient({
  baseUrl: "https://oldschool.runescape.wiki",
  auth: new BotPasswordAuth({ username: "MyBot@my-bot-password", password: "..." }),
});

// OAuth 1.0a owner-only consumer
const oauthClient = new MediaWikiClient({
  baseUrl: "https://oldschool.runescape.wiki",
  auth: new OAuthAuth({ consumerKey: "...", consumerSecret: "...", accessToken: "...", accessSecret: "..." }),
});
```

## Content: wikitext, contents, or raw JSON

Every content-bearing call accepts `source` as a raw wikitext `string` **or** builder
`MediaWikiContents`, and every content-returning call accepts a `responseFormat` of `"string"`
(raw wikitext, the default), `"json"` (the untouched API response), or `"contents"`
(parsed into `MediaWikiContent[]` via `@mediawiki-typescript/parser`):

```ts
import { MediaWikiText } from "@mediawiki-typescript/builder";

await actionApi.edit({ title: "Sandbox", source: [new MediaWikiText("Hello world")], summary: "Testing" });

const { content } = await actionApi.parsePage({ page: "Sandbox", responseFormat: "contents" });
```

## Versioning

Every module under `action/generated/` is generated from `action=paraminfo` against the latest
MediaWiki core (see `packages/api/codegen/`); `client.getCapabilities()` detects the actual target
wiki's version/extensions at runtime via `meta=siteinfo`.

## Coverage

- **Action API**: 100% typed request coverage (270+ modules, via codegen) — see `action/generated/`.
  A curated set of high-value modules (`edit`, `query` info/revisions/categories/links/images/
  extracts/langlinks, `allpages`/`search`/`categorymembers`/`backlinks`, `delete`, `move`,
  `upload`, `parse`, `compare`, `opensearch`) also get precise, hand-authored response types — see
  `action/core/` and the `ActionApiClient` facade. For anything else, call
  `client.call(action, params)` directly using the matching generated `*Params` type.
- **REST API**: every documented `/rest.php/v1` endpoint (search, pages, media files, history/
  revisions, transform) — see `rest/` and the `RestApiClient` facade.
