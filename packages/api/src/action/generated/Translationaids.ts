/**
 * Generated from `action=paraminfo&modules=translationaids`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `translationaids` module (group: action). */
export interface TranslationaidsParams {
  title: string;
  group?: string;
  prop?: ("definition" | "definitiondiff" | "documentation" | "editsummaries" | "gettext" | "groups" | "inotherlanguages" | "insertables" | "mt" | "support" | "translation" | "ttmserver")[] | ("definition" | "definitiondiff" | "documentation" | "editsummaries" | "gettext" | "groups" | "inotherlanguages" | "insertables" | "mt" | "support" | "translation" | "ttmserver"); /** Default: `"groups|definition|translation|inotherlanguages|documentation|mt|definitiondiff|ttmserver|support|gettext|insertables|editsummaries"`. */
}
