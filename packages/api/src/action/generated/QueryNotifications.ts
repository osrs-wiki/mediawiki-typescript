/**
 * Generated from `action=paraminfo&modules=query+notifications`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+notifications` module (group: meta). */
export interface QueryNotificationsParams {
  wikis?: (string)[] | (string); /** Default: `"mediawikiwiki"`. */
  filter?: ("!read" | "read")[] | ("!read" | "read"); /** Default: `"read|!read"`. */
  prop?: ("count" | "list" | "seenTime")[] | ("count" | "list" | "seenTime"); /** Default: `"list"`. */
  sections?: ("alert" | "message")[] | ("alert" | "message"); /** Default: `"alert|message"`. */
  groupbysection?: boolean;
  format?: "flyout" | "html" | "model" | "special";
  limit?: number; /** Default: `20`. */
  continue?: string;
  unreadfirst?: boolean;
  titles?: string[] | string;
  bundle?: boolean;
  notifiertypes?: ("email" | "web")[] | ("email" | "web"); /** Default: `"web"`. */
  alertcontinue?: string;
  alertunreadfirst?: boolean;
  messagecontinue?: string;
  messageunreadfirst?: boolean;
  crosswikisummary?: boolean;
}
