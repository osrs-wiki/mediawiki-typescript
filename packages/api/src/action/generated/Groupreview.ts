/**
 * Generated from `action=paraminfo&modules=groupreview`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `groupreview` module (group: action). */
export interface GroupreviewParams {
  group: string;
  language?: string; /** Default: `"en"`. */
  state: string;
  token: string;
}
