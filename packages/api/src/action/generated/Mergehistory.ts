/**
 * Generated from `action=paraminfo&modules=mergehistory`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `mergehistory` module (group: action). */
export interface MergehistoryParams {
  from?: string;
  fromid?: number;
  to?: string;
  toid?: number;
  timestamp?: string;
  reason?: string; /** Default: `""`. */
  starttimestamp?: string;
  token: string;
}
