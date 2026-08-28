/**
 * Generated from `action=paraminfo&modules=echomarkread`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `echomarkread` module (group: action). */
export interface EchomarkreadParams {
  wikis?: (string)[] | (string); /** Default: `"mediawikiwiki"`. */
  list?: string[] | string;
  unreadlist?: string[] | string;
  all?: boolean;
  sections?: ("alert" | "message")[] | ("alert" | "message");
  token: string;
}
