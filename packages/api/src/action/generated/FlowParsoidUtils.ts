/**
 * Generated from `action=paraminfo&modules=flow-parsoid-utils`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `flow-parsoid-utils` module (group: action). */
export interface FlowParsoidUtilsParams {
  from: "html" | "wikitext";
  to: "html" | "wikitext";
  content: string;
  title?: string;
  pageid?: number;
}
