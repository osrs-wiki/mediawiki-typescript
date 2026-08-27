import { buildContents, MediaWikiContents } from "@mediawiki-typescript/builder";

/**
 * Normalizes anything a caller may pass as page content — raw wikitext, a single
 * `MediaWikiContent`, or a `MediaWikiContent[]` — down to the wikitext string the Action/REST
 * APIs expect on the wire. Reuses builder's own `buildContents` so behavior stays identical to
 * calling `new MediaWikiBuilder().addContents(...).build()`.
 *
 * @param source The content to send, in any form accepted by `MediaWikiContents`.
 * @returns The built wikitext string.
 */
export const resolveContentInput = (source: MediaWikiContents): string => buildContents(source);
