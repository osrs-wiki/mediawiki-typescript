# REST API client

Typed wrapper for `/rest.php/v1`, covering every endpoint documented at
`API:REST_API/Reference`: `pages.ts` (get/create/update/get-html/get-source/get-languages/get-files),
`search.ts` (search page/title), `media.ts` (get file), `history.ts` (page history, history
counts, get/compare revisions), `transform.ts` (wikitext↔html, wikitext→lint).
`restRequest.ts` is the shared low-level request helper every module above calls through — it
reuses the same axios instance/auth as the Action API client, just pointed at `rest.php/v1`.

`RestApiClient.ts` is a facade binding every module above to one `MediaWikiClient`
(`new RestApiClient(client)` → `restApi.page.getSource(...)`, `restApi.searchPages(...)`, etc.),
mirroring `action/ActionApiClient.ts`'s pattern.

Content-bearing endpoints (`page.getSource`, `revision.getSource`, `htmlToWikitext`) go through
the `../content` bridge, same as the Action API's content-bearing modules.
