/**
 * Generated from `action=paraminfo&modules=query+querypage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+querypage` module (group: list). */
export interface QueryQuerypageParams {
  page: "Ancientpages" | "BrokenRedirects" | "Deadendpages" | "DisambiguationPageLinks" | "DisambiguationPages" | "DoubleRedirects" | "Fewestrevisions" | "GadgetUsage" | "GloballyWantedFiles" | "LintTemplateErrors" | "ListDuplicatedFiles" | "Listredirects" | "Lonelypages" | "Longpages" | "MediaStatistics" | "MostGloballyLinkedFiles" | "Mostcategories" | "Mostimages" | "Mostinterwikis" | "Mostlinked" | "Mostlinkedcategories" | "Mostlinkedtemplates" | "Mostrevisions" | "OrphanedTimedText" | "Shortpages" | "Uncategorizedcategories" | "Uncategorizedimages" | "Uncategorizedpages" | "Uncategorizedtemplates" | "UnconnectedPages" | "Unusedcategories" | "Unusedimages" | "Unusedtemplates" | "Unwatchedpages" | "Wantedcategories" | "Wantedfiles" | "Wantedpages" | "Wantedtemplates" | "Withoutinterwiki";
  offset?: number; /** Default: `0`. */
  limit?: number; /** Default: `10`. */
}
