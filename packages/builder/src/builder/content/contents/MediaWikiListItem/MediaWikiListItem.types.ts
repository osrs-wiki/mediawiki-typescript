export type MediaWikiListItemOptions = {
  level: number;
  ordered?: boolean;
  /** Renders as a definition list term (`;`) or definition (`:`) instead of a bullet/numbered item. */
  definitionType?: "term" | "definition";
};
