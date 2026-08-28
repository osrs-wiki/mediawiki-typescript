/**
 * Generated from `action=paraminfo&modules=translationentitysearch`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `translationentitysearch` module (group: action). */
export interface TranslationentitysearchParams {
  entitytype?: ("groups" | "messages")[] | ("groups" | "messages"); /** Default: `"groups|messages"`. */
  query?: string; /** Default: `""`. */
  limit?: number; /** Default: `10`. */
  grouptypes?: ("aggregate-groups" | "message-bundles" | "translatable-pages")[] | ("aggregate-groups" | "message-bundles" | "translatable-pages"); /** Default: `[]`. */
}
