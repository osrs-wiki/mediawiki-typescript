import type { MediaWikiClient } from "../client/MediaWikiClient";

/** Result of {@link detectCapabilities} — what a target wiki is running and has installed. */
export type WikiCapabilities = {
  /** Raw `generator` string from siteinfo, e.g. "MediaWiki 1.43.0". */
  generator: string;
  /** Names of installed extensions, as reported by `siprop=extensions`. */
  extensions: string[];
};

/** Shape of the `meta=siteinfo&siprop=general|extensions` response. */
type SiteInfoResponse = {
  query?: {
    general?: { generator?: string };
    extensions?: Array<{ name?: string }>;
  };
};

/**
 * Detects the target wiki's MediaWiki version and installed extensions via `meta=siteinfo`.
 * @param client The client whose wiki to inspect.
 * @returns The detected {@link WikiCapabilities}.
 */
export const detectCapabilities = async (client: MediaWikiClient): Promise<WikiCapabilities> => {
  const response = (await client.call(
    "query",
    { meta: "siteinfo", siprop: "general|extensions" },
    { method: "GET", skipAuth: true }
  )) as SiteInfoResponse;

  return {
    generator: response.query?.general?.generator ?? "unknown",
    extensions: (response.query?.extensions ?? [])
      .map((extension) => extension.name)
      .filter((name): name is string => Boolean(name)),
  };
};
