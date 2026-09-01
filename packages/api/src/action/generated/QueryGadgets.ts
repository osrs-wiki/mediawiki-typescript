/**
 * Generated from `action=paraminfo&modules=query+gadgets`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+gadgets` module (group: list). */
export interface QueryGadgetsParams {
  prop?: ("desc" | "id" | "metadata")[] | ("desc" | "id" | "metadata"); /** Default: `"id|metadata"`. */
  categories?: string[] | string;
  ids?: string[] | string;
  allowedonly?: boolean;
  enabledonly?: boolean;
}
