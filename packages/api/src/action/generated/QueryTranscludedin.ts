/**
 * Generated from `action=paraminfo&modules=query+transcludedin`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+transcludedin` module (group: prop). */
export interface QueryTranscludedinParams {
  prop?: ("pageid" | "redirect" | "title")[] | ("pageid" | "redirect" | "title"); /** Default: `"pageid|title|redirect"`. */
  namespace?: number[] | number;
  show?: ("!redirect" | "redirect")[] | ("!redirect" | "redirect");
  limit?: number; /** Default: `10`. */
  continue?: string;
}
