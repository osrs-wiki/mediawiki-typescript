# End-to-end tests

Opt-in integration tests that make real, read-only HTTP calls against `https://en.wikipedia.org`
(a stable public wiki — using the same well-known example pages MediaWiki's own docs use, e.g.
"Jupiter" and "Earth" — rather than `test.wikipedia.org`, whose content is periodically wiped).

These are **not** run by `npm test`/the root `turbo run test` pipeline — they require network
access and hit a real Wikimedia wiki, so they're kept in this separate directory with a dedicated
Jest config, run only via an explicit script. No credentials/write access are exercised.

## Running

```sh
npm run test:e2e
```

## Test files

- `actionApi.e2e.ts` — Action API: capability detection (`meta=siteinfo`), `query` info/revisions
  for a known page, `opensearch`.
- `restApi.e2e.ts` — REST API: `search/page`, `page/{title}` (bare + source).
