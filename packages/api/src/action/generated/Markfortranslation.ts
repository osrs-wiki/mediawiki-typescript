/**
 * Generated from `action=paraminfo&modules=markfortranslation`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `markfortranslation` module (group: action). */
export interface MarkfortranslationParams {
  title?: string;
  pageid?: number;
  revid?: number;
  translatetitle?: "no" | "yes";
  prioritylanguages?: string[] | string;
  forcepriority?: boolean;
  priorityreason?: string;
  nofuzzyunits?: string[] | string;
  fuzzyunits?: string[] | string;
  forcelatestsyntaxversion?: boolean;
  transclusion?: "no" | "yes";
  token: string;
}
