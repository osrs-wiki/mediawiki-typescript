/**
 * Generated from `action=paraminfo&modules=block`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `block` module (group: action). */
export interface BlockParams {
  id?: number;
  user?: string;
  userid?: number;
  expiry?: string; /** Default: `"never"`. */
  reason?: string; /** Default: `""`. */
  anononly?: boolean;
  nocreate?: boolean;
  autoblock?: boolean;
  noemail?: boolean;
  hidename?: boolean;
  allowusertalk?: boolean;
  reblock?: boolean;
  newblock?: boolean;
  watchuser?: boolean;
  watchlistexpiry?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  partial?: boolean;
  pagerestrictions?: string[] | string;
  namespacerestrictions?: number[] | number;
  actionrestrictions?: ("create" | "move" | "thanks" | "upload")[] | ("create" | "move" | "thanks" | "upload");
  token: string;
}
