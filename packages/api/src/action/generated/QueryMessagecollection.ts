/**
 * Generated from `action=paraminfo&modules=query+messagecollection`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+messagecollection` module (group: list). */
export interface QueryMessagecollectionParams {
  group: string;
  language?: string; /** Default: `"en"`. */
  limit?: number; /** Default: `500`. */
  offset?: string; /** Default: `""`. */
  filter?: string[] | string; /** Default: `"!optional|!ignored"`. */
  prop?: ("definition" | "properties" | "tags" | "translation")[] | ("definition" | "properties" | "tags" | "translation"); /** Default: `"definition|translation"`. */
}
