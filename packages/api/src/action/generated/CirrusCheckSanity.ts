/**
 * Generated from `action=paraminfo&modules=cirrus-check-sanity`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `cirrus-check-sanity` module (group: action). */
export interface CirrusCheckSanityParams {
  cluster: "cloudelastic" | "codfw" | "eqiad";
  from: number;
  limit?: number; /** Default: `100`. */
  sequenceid?: number;
  rerenderfrequency?: number; /** Default: `16`. */
}
