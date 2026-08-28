/**
 * Generated from `action=paraminfo&modules=query+categorymembers`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+categorymembers` module (group: list). */
export interface QueryCategorymembersParams {
  title?: string;
  pageid?: number;
  prop?: ("ids" | "sortkey" | "sortkeyprefix" | "timestamp" | "title" | "type")[] | ("ids" | "sortkey" | "sortkeyprefix" | "timestamp" | "title" | "type"); /** Default: `"ids|title"`. */
  namespace?: number[] | number;
  type?: ("file" | "page" | "subcat")[] | ("file" | "page" | "subcat"); /** Default: `"page|subcat|file"`. */
  continue?: string;
  limit?: number; /** Default: `10`. */
  sort?: "sortkey" | "timestamp"; /** Default: `"sortkey"`. */
  dir?: "asc" | "ascending" | "desc" | "descending" | "newer" | "older"; /** Default: `"ascending"`. */
  start?: string;
  end?: string;
  starthexsortkey?: string;
  endhexsortkey?: string;
  startsortkeyprefix?: string;
  endsortkeyprefix?: string;
  startsortkey?: string;
  endsortkey?: string;
}
