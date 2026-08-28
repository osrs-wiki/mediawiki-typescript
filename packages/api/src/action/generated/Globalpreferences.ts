/**
 * Generated from `action=paraminfo&modules=globalpreferences`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `globalpreferences` module (group: action). */
export interface GlobalpreferencesParams {
  reset?: boolean;
  resetkinds?: ("all" | "local-exception" | "registered" | "registered-checkmatrix" | "registered-multiselect" | "special" | "unused" | "userjs")[] | ("all" | "local-exception" | "registered" | "registered-checkmatrix" | "registered-multiselect" | "special" | "unused" | "userjs"); /** Default: `"all"`. */
  change?: string[] | string;
  optionname?: string;
  optionvalue?: string;
  token: string;
}
