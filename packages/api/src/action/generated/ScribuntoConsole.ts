/**
 * Generated from `action=paraminfo&modules=scribunto-console`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `scribunto-console` module (group: action). */
export interface ScribuntoConsoleParams {
  title?: string;
  content?: string;
  session?: number;
  question: string;
  clear?: boolean;
  token: string;
}
