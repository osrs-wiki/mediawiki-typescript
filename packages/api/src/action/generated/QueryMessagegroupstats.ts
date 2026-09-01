/**
 * Generated from `action=paraminfo&modules=query+messagegroupstats`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+messagegroupstats` module (group: meta). */
export interface QueryMessagegroupstatsParams {
  offset?: string; /** Default: `"0"`. */
  group: string;
  suppresscomplete?: boolean;
  suppressempty?: boolean;
}
