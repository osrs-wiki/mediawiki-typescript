/**
 * Generated from `action=paraminfo&modules=query+languageinfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+languageinfo` module (group: meta). */
export interface QueryLanguageinfoParams {
  prop?: ("autonym" | "bcp47" | "code" | "digitgroupingpattern" | "digittransforms" | "dir" | "fallbacks" | "minimumgroupingdigits" | "name" | "namespacealiases" | "namespacenames" | "variantnames" | "variants")[] | ("autonym" | "bcp47" | "code" | "digitgroupingpattern" | "digittransforms" | "dir" | "fallbacks" | "minimumgroupingdigits" | "name" | "namespacealiases" | "namespacenames" | "variantnames" | "variants"); /** Default: `"code"`. */
  code?: string[] | string; /** Default: `"*"`. */
  continue?: string;
}
