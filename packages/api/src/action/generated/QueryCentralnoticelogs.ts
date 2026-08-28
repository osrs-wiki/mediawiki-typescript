/**
 * Generated from `action=paraminfo&modules=query+centralnoticelogs`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+centralnoticelogs` module (group: list). */
export interface QueryCentralnoticelogsParams {
  campaign?: string;
  user?: string;
  limit?: number; /** Default: `50`. */
  offset?: number; /** Default: `0`. */
  start?: string;
  end?: string;
}
