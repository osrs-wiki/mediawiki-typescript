/**
 * Splits `text` on `separator`, ignoring occurrences nested inside `{{ }}`/`[[ ]]`, so a `|`
 * belonging to a template/link isn't mistaken for a table cell/attribute separator.
 */
export const splitTopLevel = (text: string, separator: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  let i = 0;
  while (i < text.length) {
    const two = text.slice(i, i + 2);
    if (two === "{{" || two === "[[") {
      depth += 1;
      current += two;
      i += 2;
      continue;
    }
    if (two === "}}" || two === "]]") {
      depth = Math.max(0, depth - 1);
      current += two;
      i += 2;
      continue;
    }
    if (depth === 0 && text.slice(i, i + separator.length) === separator) {
      parts.push(current);
      current = "";
      i += separator.length;
      continue;
    }
    current += text[i];
    i += 1;
  }
  parts.push(current);
  return parts;
};

/**
 * Splits a table/row/cell markup fragment into an optional leading attribute string and the
 * remaining content, on the first top-level `|` (MediaWiki's `attrs | content` convention).
 */
export const splitAttributesAndContent = (
  fragment: string
): { attributes?: string; content: string } => {
  const parts = splitTopLevel(fragment, "|");
  if (parts.length < 2) {
    return { content: fragment.trim() };
  }
  return {
    attributes: parts[0].trim() || undefined,
    content: parts.slice(1).join("|").trim(),
  };
};
