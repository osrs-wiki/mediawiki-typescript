/**
 * Generated from `action=paraminfo&modules=options`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `options` module (group: action). */
export interface OptionsParams {
  reset?: boolean;
  resetkinds?: ("all" | "local-exception" | "registered" | "registered-checkmatrix" | "registered-multiselect" | "special" | "unused" | "userjs")[] | ("all" | "local-exception" | "registered" | "registered-checkmatrix" | "registered-multiselect" | "special" | "unused" | "userjs"); /** Default: `"all"`. */
  change?: string[] | string;
  optionname?: string;
  optionvalue?: string;
  global?: "create" | "ignore" | "override" | "update"; /** Default: `"ignore"`. */
  token: string;
}
