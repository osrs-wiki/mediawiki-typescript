/**
 * Generated from `action=paraminfo&modules=query+languagestats`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+languagestats` module (group: meta). */
export interface QueryLanguagestatsParams {
  offset?: string; /** Default: `"0"`. */
  language: string;
  group?: string;
}
