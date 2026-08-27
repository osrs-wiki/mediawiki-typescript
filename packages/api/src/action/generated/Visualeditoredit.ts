/**
 * Generated from `action=paraminfo&modules=visualeditoredit`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `visualeditoredit` module (group: action). */
export interface VisualeditoreditParams {
  paction: "diff" | "save" | "serialize" | "serializeforcache";
  page: string;
  token: string;
  wikitext?: string;
  section?: string;
  sectiontitle?: string;
  basetimestamp?: string;
  starttimestamp?: string;
  oldid?: number;
  minor?: string;
  watchlist?: string;
  html?: string;
  etag?: string;
  summary?: string;
  captchaid?: string;
  captchaword?: string;
  cachekey?: string;
  nocontent?: boolean;
  returnto?: string;
  returntoquery?: string; /** Default: `""`. */
  returntoanchor?: string; /** Default: `""`. */
  useskin?: "apioutput" | "authentication-popup" | "cologneblue" | "fallback" | "json" | "minerva" | "modern" | "monobook" | "timeless" | "vector" | "vector-2022";
  tags?: string[] | string;
  plugins?: string[] | string;
  wgConfirmEditForceShowCaptcha?: boolean;
  mobileformat?: boolean;
}
