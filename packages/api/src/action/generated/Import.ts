/**
 * Generated from `action=paraminfo&modules=import`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `import` module (group: action). */
export interface ImportParams {
  summary?: string;
  xml?: Blob;
  interwikiprefix?: string;
  interwikisource?: "meta" | "usability" | "w:en" | "wikitech";
  interwikipage?: string;
  fullhistory?: boolean;
  templates?: boolean;
  namespace?: number;
  assignknownusers?: boolean;
  rootpage?: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  token: string;
}
