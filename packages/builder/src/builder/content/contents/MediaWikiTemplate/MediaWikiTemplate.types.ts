export type MediaWikiTemplateParam = { key: string; value: string };

export type MediaWikiTemplateOptions = {
  collapsed?: boolean;
  /** Renders as `{{subst:Name|...}}` — substituted with the template's expansion on save. */
  subst?: boolean;
};
