/**
 * Generated from `action=paraminfo&modules=query+blocks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+blocks` module (group: list). */
export interface QueryBlocksParams {
  start?: string;
  end?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  ids?: number[] | number;
  users?: string[] | string;
  ip?: string;
  limit?: number; /** Default: `10`. */
  prop?: ("by" | "byid" | "expiry" | "flags" | "id" | "parsedreason" | "range" | "reason" | "restrictions" | "timestamp" | "user" | "userid")[] | ("by" | "byid" | "expiry" | "flags" | "id" | "parsedreason" | "range" | "reason" | "restrictions" | "timestamp" | "user" | "userid"); /** Default: `"id|user|by|timestamp|expiry|reason|flags"`. */
  show?: ("!account" | "!ip" | "!range" | "!temp" | "account" | "ip" | "range" | "temp")[] | ("!account" | "!ip" | "!range" | "!temp" | "account" | "ip" | "range" | "temp");
  continue?: string;
}
