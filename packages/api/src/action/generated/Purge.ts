/**
 * Generated from `action=paraminfo&modules=purge`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `purge` module (group: action). */
export interface PurgeParams {
  forcelinkupdate?: boolean;
  forcerecursivelinkupdate?: boolean;
  continue?: string;
  titles?: string[] | string;
  pageids?: number[] | number;
  revids?: number[] | number;
  generator?: string;
  redirects?: boolean;
  converttitles?: boolean;
}
