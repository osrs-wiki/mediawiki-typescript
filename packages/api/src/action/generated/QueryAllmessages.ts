/**
 * Generated from `action=paraminfo&modules=query+allmessages`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+allmessages` module (group: meta). */
export interface QueryAllmessagesParams {
  messages?: string[] | string; /** Default: `"*"`. */
  prop?: "default"[] | "default";
  enableparser?: boolean;
  nocontent?: boolean;
  includelocal?: boolean;
  args?: string[] | string;
  filter?: string;
  customised?: "all" | "modified" | "unmodified"; /** Default: `"all"`. */
  lang?: string;
  from?: string;
  to?: string;
  title?: string;
  prefix?: string;
}
