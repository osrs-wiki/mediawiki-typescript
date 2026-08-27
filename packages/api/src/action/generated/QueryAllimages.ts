/**
 * Generated from `action=paraminfo&modules=query+allimages`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+allimages` module (group: list). */
export interface QueryAllimagesParams {
  sort?: "name" | "timestamp"; /** Default: `"name"`. */
  dir?: "ascending" | "descending" | "newer" | "older"; /** Default: `"ascending"`. */
  from?: string;
  to?: string;
  continue?: string;
  start?: string;
  end?: string;
  prop?: ("badfile" | "bitdepth" | "canonicaltitle" | "comment" | "commonmetadata" | "dimensions" | "extmetadata" | "mediatype" | "metadata" | "mime" | "parsedcomment" | "sha1" | "size" | "thumburls" | "timestamp" | "url" | "user" | "userid")[] | ("badfile" | "bitdepth" | "canonicaltitle" | "comment" | "commonmetadata" | "dimensions" | "extmetadata" | "mediatype" | "metadata" | "mime" | "parsedcomment" | "sha1" | "size" | "thumburls" | "timestamp" | "url" | "user" | "userid"); /** Default: `"timestamp|url"`. */
  prefix?: string;
  minsize?: number;
  maxsize?: number;
  sha1?: string;
  sha1base36?: string;
  user?: string;
  filterbots?: "all" | "bots" | "nobots"; /** Default: `"all"`. */
  mime?: string[] | string;
  limit?: number; /** Default: `10`. */
}
