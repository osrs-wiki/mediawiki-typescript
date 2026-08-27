/**
 * Generated from `action=paraminfo&modules=query+tags`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+tags` module (group: list). */
export interface QueryTagsParams {
  continue?: string;
  limit?: number; /** Default: `10`. */
  prop?: ("active" | "defined" | "description" | "displayname" | "hitcount" | "source")[] | ("active" | "defined" | "description" | "displayname" | "hitcount" | "source"); /** Default: `""`. */
}
