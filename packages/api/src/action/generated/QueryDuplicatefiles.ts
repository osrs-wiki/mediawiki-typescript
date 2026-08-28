/**
 * Generated from `action=paraminfo&modules=query+duplicatefiles`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+duplicatefiles` module (group: prop). */
export interface QueryDuplicatefilesParams {
  limit?: number; /** Default: `10`. */
  continue?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  localonly?: boolean;
}
