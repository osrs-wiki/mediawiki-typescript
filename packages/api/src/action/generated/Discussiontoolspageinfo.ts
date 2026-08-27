/**
 * Generated from `action=paraminfo&modules=discussiontoolspageinfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `discussiontoolspageinfo` module (group: action). */
export interface DiscussiontoolspageinfoParams {
  page?: string;
  oldid?: number;
  prop?: ("threaditemshtml" | "transcludedfrom")[] | ("threaditemshtml" | "transcludedfrom"); /** Default: `"transcludedfrom"`. */
  threaditemsflags?: ("activity" | "excludesignatures" | "noreplies")[] | ("activity" | "excludesignatures" | "noreplies");
  excludesignatures?: string;
}
