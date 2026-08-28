/**
 * Generated from `action=paraminfo&modules=query+search`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+search` module (group: list). */
export interface QuerySearchParams {
  search: string;
  namespace?: number[] | number; /** Default: `0`. */
  limit?: number; /** Default: `10`. */
  offset?: number; /** Default: `0`. */
  qiprofile?: "classic" | "classic_noboostlinks" | "empty" | "engine_autoselect" | "popular_inclinks" | "popular_inclinks_pv" | "wsum_inclinks" | "wsum_inclinks_pv"; /** Default: `"engine_autoselect"`. */
  qdprofile?: "default" | "engine_autoselect" | "perfield_builder" | "perfield_builder_relaxed" | "perfield_builder_title_filter"; /** Default: `"engine_autoselect"`. */
  what?: "nearmatch" | "text" | "title";
  info?: ("rewrittenquery" | "suggestion" | "totalhits")[] | ("rewrittenquery" | "suggestion" | "totalhits"); /** Default: `"totalhits|suggestion|rewrittenquery"`. */
  prop?: ("categorysnippet" | "extensiondata" | "isfilematch" | "redirectsnippet" | "redirecttitle" | "sectionsnippet" | "sectiontitle" | "size" | "snippet" | "timestamp" | "titlesnippet" | "wordcount" | "hasrelated" | "score")[] | ("categorysnippet" | "extensiondata" | "isfilematch" | "redirectsnippet" | "redirecttitle" | "sectionsnippet" | "sectiontitle" | "size" | "snippet" | "timestamp" | "titlesnippet" | "wordcount" | "hasrelated" | "score"); /** Default: `"size|wordcount|timestamp|snippet"`. */
  interwiki?: boolean;
  enablerewrites?: boolean;
  sort?: "create_timestamp_asc" | "create_timestamp_desc" | "incoming_links_asc" | "incoming_links_desc" | "just_match" | "last_edit_asc" | "last_edit_desc" | "none" | "random" | "relevance" | "title_natural_asc" | "title_natural_desc" | "user_random"; /** Default: `"relevance"`. */
}
