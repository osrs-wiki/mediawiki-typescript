/**
 * Converts a paraminfo module path (e.g. "query+info", "abusefiltercheckmatch") into a
 * PascalCase TypeScript identifier suitable for a file name / exported type name.
 * @param path A paraminfo module `path` value.
 */
export const toPascalCase = (path: string): string =>
  path
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
