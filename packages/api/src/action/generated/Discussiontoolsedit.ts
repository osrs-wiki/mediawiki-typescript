/**
 * Generated from `action=paraminfo&modules=discussiontoolsedit`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `discussiontoolsedit` module (group: action). */
export interface DiscussiontoolseditParams {
  paction: "addcomment" | "addtopic";
  page: string;
  token: string;
  formtoken?: string;
  commentname?: string;
  commentid?: string;
  wikitext?: string;
  html?: string;
  summary?: string;
  sectiontitle?: string;
  allownosectiontitle?: boolean;
  useskin?: "apioutput" | "authentication-popup" | "cologneblue" | "fallback" | "json" | "minerva" | "modern" | "monobook" | "timeless" | "vector" | "vector-2022";
  watchlist?: string;
  captchaid?: string;
  captchaword?: string;
  nocontent?: string;
  tags?: string[] | string;
  returnto?: string;
  returntoquery?: string; /** Default: `""`. */
  returntoanchor?: string; /** Default: `""`. */
  mobileformat?: boolean;
}
