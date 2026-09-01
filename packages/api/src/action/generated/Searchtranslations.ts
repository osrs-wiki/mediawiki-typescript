/**
 * Generated from `action=paraminfo&modules=searchtranslations`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `searchtranslations` module (group: action). */
export interface SearchtranslationsParams {
  service?: "codfw-k8s" | "default" | "eqiad-k8s"; /** Default: `"default"`. */
  query: string;
  sourcelanguage?: string; /** Default: `"en"`. */
  language?: string; /** Default: `""`. */
  group?: string; /** Default: `""`. */
  filter?: "" | "fuzzy" | "translated" | "untranslated"; /** Default: `""`. */
  match?: string; /** Default: `""`. */
  case?: string; /** Default: `"0"`. */
  offset?: number; /** Default: `0`. */
  limit?: number; /** Default: `25`. */
}
