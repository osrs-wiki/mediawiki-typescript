/**
 * Generated from `action=paraminfo&modules=stashedit`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `stashedit` module (group: action). */
export interface StasheditParams {
  title: string;
  section?: string;
  sectiontitle?: string;
  text?: string;
  stashedtexthash?: string;
  summary?: string; /** Default: `""`. */
  contentmodel: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  contentformat: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
  baserevid: number;
  token: string;
}
