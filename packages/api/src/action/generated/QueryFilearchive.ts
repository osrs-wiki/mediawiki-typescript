/**
 * Generated from `action=paraminfo&modules=query+filearchive`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+filearchive` module (group: list). */
export interface QueryFilearchiveParams {
  from?: string;
  to?: string;
  prefix?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  sha1?: string;
  sha1base36?: string;
  prop?: ("archivename" | "bitdepth" | "description" | "dimensions" | "mediatype" | "metadata" | "mime" | "parseddescription" | "sha1" | "size" | "timestamp" | "user")[] | ("archivename" | "bitdepth" | "description" | "dimensions" | "mediatype" | "metadata" | "mime" | "parseddescription" | "sha1" | "size" | "timestamp" | "user"); /** Default: `"timestamp"`. */
  limit?: number; /** Default: `10`. */
  continue?: string;
}
