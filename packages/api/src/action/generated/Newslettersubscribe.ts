/**
 * Generated from `action=paraminfo&modules=newslettersubscribe`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `newslettersubscribe` module (group: action). */
export interface NewslettersubscribeParams {
  id: number;
  do: "subscribe" | "unsubscribe";
  token: string;
}
