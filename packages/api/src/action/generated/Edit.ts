/**
 * Generated from `action=paraminfo&modules=edit`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `edit` module (group: action). */
export interface EditParams {
  title?: string;
  pageid?: number;
  section?: string;
  sectiontitle?: string;
  text?: string;
  summary?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  minor?: boolean;
  notminor?: boolean;
  bot?: boolean;
  baserevid?: number;
  basetimestamp?: string;
  starttimestamp?: string;
  recreate?: boolean;
  createonly?: boolean;
  nocreate?: boolean;
  watch?: boolean;
  unwatch?: boolean;
  watchlist?: "nochange" | "preferences" | "unwatch" | "watch"; /** Default: `"preferences"`. */
  watchlistexpiry?: string;
  md5?: string;
  prependtext?: string;
  appendtext?: string;
  undo?: number;
  undoafter?: number;
  redirect?: boolean;
  contentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
  contentmodel?: "GadgetDefinition" | "Graph.JsonConfig" | "Json.JsonConfig" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "flow-board" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "unknown" | "vue" | "wikitext" | "worklist";
  token: string;
  returnto?: string;
  returntoquery?: string; /** Default: `""`. */
  returntoanchor?: string; /** Default: `""`. */
  captchaword?: string;
  captchaid?: string;
  wgConfirmEditForceShowCaptcha?: boolean;
  editorinterface?: string;
  discussiontoolsautosubscribe?: "no" | "preferences" | "yes"; /** Default: `"preferences"`. */
}
