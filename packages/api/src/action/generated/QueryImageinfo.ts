/**
 * Generated from `action=paraminfo&modules=query+imageinfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+imageinfo` module (group: prop). */
export interface QueryImageinfoParams {
  prop?: ("archivename" | "badfile" | "bitdepth" | "canonicaltitle" | "comment" | "commonmetadata" | "dimensions" | "extmetadata" | "mediatype" | "metadata" | "mime" | "parsedcomment" | "sha1" | "size" | "thumbmime" | "thumburls" | "timestamp" | "uploadwarning" | "url" | "user" | "userid")[] | ("archivename" | "badfile" | "bitdepth" | "canonicaltitle" | "comment" | "commonmetadata" | "dimensions" | "extmetadata" | "mediatype" | "metadata" | "mime" | "parsedcomment" | "sha1" | "size" | "thumbmime" | "thumburls" | "timestamp" | "uploadwarning" | "url" | "user" | "userid"); /** Default: `"timestamp|user"`. */
  limit?: number; /** Default: `1`. */
  start?: string;
  end?: string;
  urlwidth?: number; /** Default: `-1`. */
  urlheight?: number; /** Default: `-1`. */
  metadataversion?: string; /** Default: `"1"`. */
  extmetadatalanguage?: string; /** Default: `"en"`. */
  extmetadatamultilang?: boolean;
  extmetadatafilter?: string[] | string;
  urlparam?: string; /** Default: `""`. */
  badfilecontexttitle?: string;
  continue?: string;
  localonly?: boolean;
}
