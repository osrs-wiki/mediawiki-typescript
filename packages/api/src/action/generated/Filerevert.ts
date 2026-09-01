/**
 * Generated from `action=paraminfo&modules=filerevert`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `filerevert` module (group: action). */
export interface FilerevertParams {
  filename: string;
  comment?: string; /** Default: `""`. */
  archivename: string;
  token: string;
}
