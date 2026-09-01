/**
 * Generated from `action=paraminfo&modules=query+globalusage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+globalusage` module (group: prop). */
export interface QueryGlobalusageParams {
  prop?: ("namespace" | "pageid" | "url")[] | ("namespace" | "pageid" | "url"); /** Default: `"url"`. */
  limit?: number; /** Default: `10`. */
  namespace?: number[] | number; /** Default: `"*"`. */
  site?: (string)[] | (string);
  continue?: string;
  filterlocal?: boolean;
}
