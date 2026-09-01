/**
 * Generated from `action=paraminfo&modules=query+globalblocks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+globalblocks` module (group: list). */
export interface QueryGlobalblocksParams {
  start?: string;
  end?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  ids?: number[] | number;
  addresses?: string[] | string;
  targets?: string[] | string;
  ip?: string;
  limit?: number; /** Default: `10`. */
  prop?: ("by" | "expiry" | "id" | "range" | "reason" | "target" | "timestamp" | "address")[] | ("by" | "expiry" | "id" | "range" | "reason" | "target" | "timestamp" | "address"); /** Default: `"id|target|by|timestamp|expiry|reason"`. */
}
