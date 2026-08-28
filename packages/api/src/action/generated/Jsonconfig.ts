/**
 * Generated from `action=paraminfo&modules=jsonconfig`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `jsonconfig` module (group: action). */
export interface JsonconfigParams {
  command?: "reload" | "reset" | "status"; /** Default: `"status"`. */
  namespace?: number;
  title?: string; /** Default: `""`. */
}
