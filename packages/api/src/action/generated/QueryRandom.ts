/**
 * Generated from `action=paraminfo&modules=query+random`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+random` module (group: list). */
export interface QueryRandomParams {
  namespace?: number[] | number;
  filterredir?: "all" | "nonredirects" | "redirects"; /** Default: `"nonredirects"`. */
  minsize?: number;
  maxsize?: number;
  contentmodel?: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  redirect?: boolean;
  limit?: number; /** Default: `1`. */
  continue?: string;
}
