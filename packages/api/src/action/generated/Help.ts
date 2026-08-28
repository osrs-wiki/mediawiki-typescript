/**
 * Generated from `action=paraminfo&modules=help`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `help` module (group: action). */
export interface HelpParams {
  modules?: string[] | string; /** Default: `"main"`. */
  submodules?: boolean;
  recursivesubmodules?: boolean;
  wrap?: boolean;
  toc?: boolean;
}
