/**
 * Generated from `action=paraminfo&modules=expandtemplates`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `expandtemplates` module (group: action). */
export interface ExpandtemplatesParams {
  title?: string;
  text: string;
  revid?: number;
  prop?: ("categories" | "encodedjsconfigvars" | "jsconfigvars" | "modules" | "parsetree" | "properties" | "ttl" | "volatile" | "wikitext")[] | ("categories" | "encodedjsconfigvars" | "jsconfigvars" | "modules" | "parsetree" | "properties" | "ttl" | "volatile" | "wikitext");
  includecomments?: boolean;
  showstrategykeys?: boolean;
  generatexml?: boolean;
  templatesandboxprefix?: string[] | string;
  templatesandboxtitle?: string;
  templatesandboxtext?: string;
  templatesandboxcontentmodel?: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  templatesandboxcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
}
