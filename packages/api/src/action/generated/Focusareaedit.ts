/**
 * Generated from `action=paraminfo&modules=focusareaedit`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `focusareaedit` module (group: action). */
export interface FocusareaeditParams {
  focusarea?: string;
  status: "community-opportunity" | "declined" | "done" | "in-progress" | "long-term-opportunity" | "near-term-opportunity" | "prioritized" | "under-review";
  title: string;
  description: string;
  shortdescription?: string;
  owners?: string;
  volunteers?: string;
  created: string;
  baselang: string;
  baserevid?: number;
  token: string;
}
