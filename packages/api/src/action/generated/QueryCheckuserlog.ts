/**
 * Generated from `action=paraminfo&modules=query+checkuserlog`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+checkuserlog` module (group: list). */
export interface QueryCheckuserlogParams {
  user?: string;
  target?: string;
  reason?: string;
  limit?: number; /** Default: `10`. */
  dir?: "newer" | "older"; /** Default: `"older"`. */
  from?: string;
  to?: string;
  continue?: string;
}
