/**
 * Generated from `action=paraminfo&modules=tag`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `tag` module (group: action). */
export interface TagParams {
  rcid?: number[] | number;
  revid?: number[] | number;
  logid?: number[] | number;
  add?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  remove?: string[] | string;
  reason?: string; /** Default: `""`. */
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  token: string;
}
