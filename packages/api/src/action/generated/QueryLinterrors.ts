/**
 * Generated from `action=paraminfo&modules=query+linterrors`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+linterrors` module (group: list). */
export interface QueryLinterrorsParams {
  categories?: ("bogus-image-options" | "deletable-table-tag" | "duplicate-ids" | "empty-heading" | "fostered" | "fostered-transparent" | "html5-misnesting" | "large-tables" | "misc-tidy-replacement-issues" | "misnested-tag" | "missing-end-tag" | "missing-end-tag-in-heading" | "multi-colon-escape" | "multiline-html-table-in-list" | "multiple-unclosed-formatting-tags" | "night-mode-unaware-background-color" | "obsolete-tag" | "pre-expansion" | "pwrap-bug-workaround" | "self-closed-tag" | "stripped-tag" | "template-arg-in-extension-tag" | "tidy-font-bug" | "tidy-whitespace-bug" | "unclosed-quotes-in-heading" | "wikilink-in-extlink")[] | ("bogus-image-options" | "deletable-table-tag" | "duplicate-ids" | "empty-heading" | "fostered" | "fostered-transparent" | "html5-misnesting" | "large-tables" | "misc-tidy-replacement-issues" | "misnested-tag" | "missing-end-tag" | "missing-end-tag-in-heading" | "multi-colon-escape" | "multiline-html-table-in-list" | "multiple-unclosed-formatting-tags" | "night-mode-unaware-background-color" | "obsolete-tag" | "pre-expansion" | "pwrap-bug-workaround" | "self-closed-tag" | "stripped-tag" | "template-arg-in-extension-tag" | "tidy-font-bug" | "tidy-whitespace-bug" | "unclosed-quotes-in-heading" | "wikilink-in-extlink"); /** Default: `"deletable-table-tag|duplicate-ids|html5-misnesting|misc-tidy-replacement-issues|multiline-html-table-in-list|multiple-unclosed-formatting-tags|pwrap-bug-workaround|self-closed-tag|template-arg-in-extension-tag|tidy-font-bug|tidy-whitespace-bug|unclosed-quotes-in-heading|bogus-image-options|fostered|misnested-tag|multi-colon-escape|wikilink-in-extlink|empty-heading|missing-end-tag|missing-end-tag-in-heading|night-mode-unaware-background-color|obsolete-tag|pre-expansion|stripped-tag"`. */
  limit?: number; /** Default: `10`. */
  namespace?: number[] | number;
  pageid?: number[] | number;
  title?: string;
  from?: number;
}
