/**
 * Generated from `action=paraminfo&modules=timedtext`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `timedtext` module (group: action). */
export interface TimedtextParams {
  title?: string;
  pageid?: number;
  trackformat: "srt" | "vtt";
  lang?: string;
}
