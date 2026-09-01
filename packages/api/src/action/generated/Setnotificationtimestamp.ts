/**
 * Generated from `action=paraminfo&modules=setnotificationtimestamp`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `setnotificationtimestamp` module (group: action). */
export interface SetnotificationtimestampParams {
  entirewatchlist?: boolean;
  timestamp?: string;
  torevid?: number;
  newerthanrevid?: number;
  continue?: string;
  titles?: string[] | string;
  pageids?: number[] | number;
  revids?: number[] | number;
  generator?: string;
  redirects?: boolean;
  converttitles?: boolean;
  token: string;
}
