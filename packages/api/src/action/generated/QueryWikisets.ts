/**
 * Generated from `action=paraminfo&modules=query+wikisets`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+wikisets` module (group: list). */
export interface QueryWikisetsParams {
  from?: string;
  prop?: ("type" | "wikisincluded" | "wikisnotincluded")[] | ("type" | "wikisincluded" | "wikisnotincluded");
  limit?: number; /** Default: `10`. */
  orderbyname?: boolean;
}
