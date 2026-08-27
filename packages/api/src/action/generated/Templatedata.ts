/**
 * Generated from `action=paraminfo&modules=templatedata`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `templatedata` module (group: action). */
export interface TemplatedataParams {
  includeMissingTitles?: boolean;
  doNotIgnoreMissingTitles?: boolean;
  lang?: string;
  titles?: string[] | string;
  pageids?: number[] | number;
  revids?: number[] | number;
  generator?: string;
  redirects?: boolean;
  converttitles?: boolean;
}
