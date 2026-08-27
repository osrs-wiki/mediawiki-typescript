/**
 * Generated from `action=paraminfo&modules=query+threads`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+threads` module (group: list). */
export interface QueryThreadsParams {
  startid?: number;
  endid?: number;
  dir?: "newer" | "older"; /** Default: `"newer"`. */
  showdeleted?: boolean;
  limit?: number; /** Default: `10`. */
  prop?: ("ancestor" | "author" | "created" | "id" | "modified" | "page" | "parent" | "reactions" | "replies" | "rootid" | "signature" | "subject" | "summaryid" | "type")[] | ("ancestor" | "author" | "created" | "id" | "modified" | "page" | "parent" | "reactions" | "replies" | "rootid" | "signature" | "subject" | "summaryid" | "type"); /** Default: `"id|subject|page|parent|author"`. */
  page?: string[] | string;
  author?: string[] | string;
  root?: string[] | string;
  summary?: string[] | string;
  id?: string[] | string;
  render?: boolean;
  renderlevel?: number; /** Default: `0`. */
  renderthreadpos?: number; /** Default: `1`. */
  renderthreadcount?: number; /** Default: `1`. */
  rendermaxthreadcount?: string;
  rendermaxdepth?: string;
  renderstartrepliesat?: string;
}
