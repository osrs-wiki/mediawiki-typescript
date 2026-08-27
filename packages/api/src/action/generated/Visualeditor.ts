/**
 * Generated from `action=paraminfo&modules=visualeditor`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `visualeditor` module (group: action). */
export interface VisualeditorParams {
  page: string;
  badetag?: string;
  format?: "json" | "jsonfm"; /** Default: `"jsonfm"`. */
  paction: "metadata" | "parse" | "parsefragment" | "templatesused" | "wikitext";
  wikitext?: string;
  section?: string;
  stash?: boolean;
  oldid?: number;
  editintro?: string;
  pst?: boolean;
  preload?: string;
  preloadparams?: string[] | string;
}
