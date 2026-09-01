import type { MediaWikiClient } from "../../client/MediaWikiClient";
import { detectCapabilities, WikiCapabilities } from "../../versioning/detectCapabilities";

/**
 * Re-exported for discoverability under `action.core.siteinfo`; delegates entirely to
 * {@link MediaWikiClient.getCapabilities}, which already fetches and caches `meta=siteinfo`
 * results as {@link WikiCapabilities}.
 *
 * Only the `general`/`extensions` fields commonly needed for version/capability detection are
 * modeled precisely here \u2014 `meta=siteinfo` supports dozens of other `siprop` values (namespaces,
 * statistics, rights, magic words, etc.) that are out of scope for this curated wrapper. Call
 * `client.call("query", { meta: "siteinfo", siprop: "..." })` directly for those.
 * @param client The client to inspect.
 */
export const siteinfo = (client: MediaWikiClient): Promise<WikiCapabilities> => client.getCapabilities();

export { detectCapabilities };
