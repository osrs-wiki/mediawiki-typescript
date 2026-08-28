/**
 * Generated from `action=paraminfo&modules=query+stashimageinfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+stashimageinfo` module (group: prop). */
export interface QueryStashimageinfoParams {
  filekey?: string[] | string;
  sessionkey?: string[] | string;
  prop?: ("badfile" | "bitdepth" | "canonicaltitle" | "commonmetadata" | "dimensions" | "extmetadata" | "metadata" | "mime" | "sha1" | "size" | "thumbmime" | "thumburls" | "timestamp" | "url")[] | ("badfile" | "bitdepth" | "canonicaltitle" | "commonmetadata" | "dimensions" | "extmetadata" | "metadata" | "mime" | "sha1" | "size" | "thumbmime" | "thumburls" | "timestamp" | "url"); /** Default: `"timestamp|url"`. */
  urlwidth?: number; /** Default: `-1`. */
  urlheight?: number; /** Default: `-1`. */
  urlparam?: string; /** Default: `""`. */
}
