/**
 * Generated from `action=paraminfo&modules=query+revisions`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+revisions` module (group: prop). */
export interface QueryRevisionsParams {
  prop?: ("comment" | "content" | "contentmodel" | "flags" | "ids" | "parsedcomment" | "roles" | "sha1" | "size" | "slotsha1" | "slotsize" | "tags" | "timestamp" | "user" | "userid" | "parsetree")[] | ("comment" | "content" | "contentmodel" | "flags" | "ids" | "parsedcomment" | "roles" | "sha1" | "size" | "slotsha1" | "slotsize" | "tags" | "timestamp" | "user" | "userid" | "parsetree"); /** Default: `"ids|timestamp|flags|comment|user"`. */
  slots?: "main"[] | "main";
  limit?: number;
  expandtemplates?: boolean;
  generatexml?: boolean;
  parse?: boolean;
  section?: string;
  diffto?: string;
  difftotext?: string;
  difftotextpst?: boolean;
  contentformat?: "application/json" | "application/octet-stream" | "application/unknown" | "application/vue+xml" | "application/x-binary" | "text/css" | "text/javascript" | "text/plain" | "text/unknown" | "text/x-wiki" | "unknown/unknown";
  startid?: number;
  endid?: number;
  start?: string;
  end?: string;
  dir?: "newer" | "older"; /** Default: `"older"`. */
  user?: string;
  excludeuser?: string;
  tag?: string;
  continue?: string;
}
