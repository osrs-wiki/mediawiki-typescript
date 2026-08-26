const ATTRIBUTE_PATTERN =
  /([a-zA-Z][\w-]*)\s*=\s*"([^"]*)"|([a-zA-Z][\w-]*)\s*=\s*'([^']*)'/g;

/**
 * Parses a raw MediaWiki attribute fragment (e.g. `class="wikitable" style="width:100%"`,
 * or a full open-tag image like `<div class="x">`) into a plain key/value map.
 */
export const parseAttributes = (raw: string): { [key: string]: string } | undefined => {
  const attributes: { [key: string]: string } = {};
  let match: RegExpExecArray | null;
  ATTRIBUTE_PATTERN.lastIndex = 0;
  while ((match = ATTRIBUTE_PATTERN.exec(raw))) {
    const key = match[1] ?? match[3];
    const value = match[2] ?? match[4];
    attributes[key] = value;
  }
  return Object.keys(attributes).length > 0 ? attributes : undefined;
};
