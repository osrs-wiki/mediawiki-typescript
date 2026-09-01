/**
 * Generated from `action=paraminfo&modules=cirrus-config-dump`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `cirrus-config-dump` module (group: action). */
export interface CirrusConfigDumpParams {
  prop?: ("expectedindices" | "globals" | "namespacemap" | "profiles" | "replicagroup" | "usertesting")[] | ("expectedindices" | "globals" | "namespacemap" | "profiles" | "replicagroup" | "usertesting"); /** Default: `"globals|namespacemap|profiles|replicagroup"`. */
}
