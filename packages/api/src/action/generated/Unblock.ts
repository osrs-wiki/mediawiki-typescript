/**
 * Generated from `action=paraminfo&modules=unblock`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `unblock` module (group: action). */
export interface UnblockParams {
  id?: number;
  user?: string;
  userid?: number;
  reason?: string; /** Default: `""`. */
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  watchuser?: boolean;
  watchlistexpiry?: string;
  token: string;
}
