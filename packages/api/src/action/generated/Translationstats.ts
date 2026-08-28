/**
 * Generated from `action=paraminfo&modules=translationstats`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `translationstats` module (group: action). */
export interface TranslationstatsParams {
  count: "edits" | "reviewers" | "reviews" | "users";
  days: number; /** Default: `30`. */
  group?: string[] | string;
  language?: string[] | string;
  scale?: "days" | "hours" | "months" | "weeks" | "years"; /** Default: `"days"`. */
  start?: string;
}
