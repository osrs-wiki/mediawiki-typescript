/**
 * Generated from `action=paraminfo&modules=changecontentmodel`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `changecontentmodel` module (group: action). */
export interface ChangecontentmodelParams {
  title?: string;
  pageid?: number;
  summary?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  model: "GadgetDefinition" | "JsonSchema" | "MassMessageListContent" | "NewsletterContent" | "Scribunto" | "SecurePoll" | "css" | "javascript" | "json" | "sanitized-css" | "text" | "translate-messagebundle" | "vue" | "wikitext" | "worklist";
  bot?: boolean;
  token: string;
}
