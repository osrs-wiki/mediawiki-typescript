/**
 * Generated from `action=paraminfo&modules=watch`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `watch` module (group: action). */
export interface WatchParams {
  title?: string;
  expiry?: string;
  labels?: number[] | number;
  unwatch?: boolean;
  continue?: string;
  titles?: string[] | string;
  pageids?: number[] | number;
  revids?: number[] | number;
  generator?: string;
  redirects?: boolean;
  converttitles?: boolean;
  token: string;
}
