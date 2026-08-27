/**
 * Generated from `action=paraminfo&modules=query+logevents`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+logevents` module (group: list). */
export interface QueryLogeventsParams {
  prop?: ("comment" | "details" | "ids" | "parsedcomment" | "tags" | "timestamp" | "title" | "type" | "user" | "userid")[] | ("comment" | "details" | "ids" | "parsedcomment" | "tags" | "timestamp" | "title" | "type" | "user" | "userid"); /** Default: `"ids|title|type|user|timestamp|comment|details"`. */
  type?: string;
  action?: string;
  start?: string;
  end?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  ids?: number[] | number;
  user?: string;
  title?: string;
  namespace?: number;
  prefix?: string;
  tag?: string;
  limit?: number; /** Default: `10`. */
  continue?: string;
}
