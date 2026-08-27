/**
 * Generated from `action=paraminfo&modules=echomarkseen`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `echomarkseen` module (group: action). */
export interface EchomarkseenParams {
  type: "alert" | "all" | "message";
  timestampFormat?: "ISO_8601" | "MW"; /** Default: `"MW"`. */
}
