/**
 * Generated from `action=paraminfo&modules=globalpreferenceoverrides`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `globalpreferenceoverrides` module (group: action). */
export interface GlobalpreferenceoverridesParams {
  reset?: boolean;
  resetkinds?: ("all" | "local-exception" | "registered" | "registered-checkmatrix" | "registered-multiselect" | "special" | "unused" | "userjs")[] | ("all" | "local-exception" | "registered" | "registered-checkmatrix" | "registered-multiselect" | "special" | "unused" | "userjs"); /** Default: `"all"`. */
  change?: string[] | string;
  optionname?: string;
  optionvalue?: string;
  token: string;
}
