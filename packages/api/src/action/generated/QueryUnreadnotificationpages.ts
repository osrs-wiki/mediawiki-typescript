/**
 * Generated from `action=paraminfo&modules=query+unreadnotificationpages`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+unreadnotificationpages` module (group: meta). */
export interface QueryUnreadnotificationpagesParams {
  wikis?: (string)[] | (string); /** Default: `"mediawikiwiki"`. */
  grouppages?: boolean;
  limit?: number; /** Default: `10`. */
}
