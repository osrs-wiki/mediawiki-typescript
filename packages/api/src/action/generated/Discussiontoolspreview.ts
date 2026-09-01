/**
 * Generated from `action=paraminfo&modules=discussiontoolspreview`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `discussiontoolspreview` module (group: action). */
export interface DiscussiontoolspreviewParams {
  type: "reply" | "topic";
  page: string;
  wikitext: string;
  sectiontitle?: string;
  useskin?: "apioutput" | "authentication-popup" | "cologneblue" | "fallback" | "json" | "minerva" | "modern" | "monobook" | "timeless" | "vector" | "vector-2022";
  mobileformat?: boolean;
}
