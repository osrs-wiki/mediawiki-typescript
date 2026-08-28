/**
 * Generated from `action=paraminfo&modules=compare`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `compare` module (group: action). */
export interface CompareParams {
  fromtitle?: string;
  fromid?: number;
  fromrev?: number;
  fromslots?: "main"[] | "main";
  frompst?: boolean;
  fromtext?: string;
  fromcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
  fromcontentmodel?: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  fromsection?: string;
  totitle?: string;
  toid?: number;
  torev?: number;
  torelative?: "cur" | "next" | "prev";
  toslots?: "main"[] | "main";
  topst?: boolean;
  totext?: string;
  tocontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
  tocontentmodel?: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  tosection?: string;
  prop?: ("comment" | "diff" | "diffsize" | "ids" | "parsedcomment" | "rel" | "size" | "timestamp" | "title" | "user")[] | ("comment" | "diff" | "diffsize" | "ids" | "parsedcomment" | "rel" | "size" | "timestamp" | "title" | "user"); /** Default: `"diff|ids|title"`. */
  slots?: "main"[] | "main";
  difftype?: "inline" | "table" | "unified"; /** Default: `"table"`. */
}
