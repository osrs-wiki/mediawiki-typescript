/**
 * Generated from `action=paraminfo&modules=query+cirrusbuilddoc`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+cirrusbuilddoc` module (group: prop). */
export interface QueryCirrusbuilddocParams {
  builders?: ("content" | "links")[] | ("content" | "links"); /** Default: `["content","links"]`. */
  limiterprofile?: string;
}
