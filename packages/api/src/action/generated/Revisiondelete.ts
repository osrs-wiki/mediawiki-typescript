/**
 * Generated from `action=paraminfo&modules=revisiondelete`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `revisiondelete` module (group: action). */
export interface RevisiondeleteParams {
  type: "archive" | "filearchive" | "logging" | "oldimage" | "revision";
  target?: string;
  ids: string[] | string;
  hide?: ("comment" | "content" | "user")[] | ("comment" | "content" | "user");
  show?: ("comment" | "content" | "user")[] | ("comment" | "content" | "user");
  suppress?: "no" | "nochange" | "yes"; /** Default: `"nochange"`. */
  reason?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  token: string;
}
