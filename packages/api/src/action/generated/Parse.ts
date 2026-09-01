/**
 * Generated from `action=paraminfo&modules=parse`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `parse` module (group: action). */
export interface ParseParams {
  title?: string;
  text?: string;
  revid?: number;
  summary?: string;
  page?: string;
  pageid?: number;
  redirects?: boolean;
  oldid?: number;
  prop?: ("categories" | "categorieshtml" | "displaytitle" | "encodedjsconfigvars" | "externallinks" | "headhtml" | "images" | "indicators" | "iwlinks" | "jsconfigvars" | "langlinks" | "limitreportdata" | "limitreporthtml" | "links" | "modules" | "parseroutput" | "parsetree" | "parsewarnings" | "parsewarningshtml" | "properties" | "revid" | "subtitle" | "templates" | "text" | "tocdata" | "wikitext" | "headitems" | "sections")[] | ("categories" | "categorieshtml" | "displaytitle" | "encodedjsconfigvars" | "externallinks" | "headhtml" | "images" | "indicators" | "iwlinks" | "jsconfigvars" | "langlinks" | "limitreportdata" | "limitreporthtml" | "links" | "modules" | "parseroutput" | "parsetree" | "parsewarnings" | "parsewarningshtml" | "properties" | "revid" | "subtitle" | "templates" | "text" | "tocdata" | "wikitext" | "headitems" | "sections"); /** Default: `"text|langlinks|categories|links|templates|images|externallinks|sections|tocdata|revid|displaytitle|iwlinks|properties|parsewarnings"`. */
  wrapoutputclass?: string; /** Default: `"mw-parser-output"`. */
  usearticle?: boolean;
  parsoid?: boolean;
  parser?: "default" | "legacy" | "parsoid"; /** Default: `"default"`. */
  pst?: boolean;
  onlypst?: boolean;
  effectivelanglinks?: boolean;
  section?: string;
  sectiontitle?: string;
  disablepp?: boolean;
  disablelimitreport?: boolean;
  disableeditsection?: boolean;
  disablestylededuplication?: boolean;
  showstrategykeys?: boolean;
  generatexml?: boolean;
  preview?: boolean;
  sectionpreview?: boolean;
  disabletoc?: boolean;
  useskin?: "apioutput" | "authentication-popup" | "cologneblue" | "fallback" | "json" | "minerva" | "modern" | "monobook" | "timeless" | "vector" | "vector-2022";
  contentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
  contentmodel?: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  mobileformat?: boolean;
  templatesandboxprefix?: string[] | string;
  templatesandboxtitle?: string;
  templatesandboxtext?: string;
  templatesandboxcontentmodel?: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  templatesandboxcontentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
}
