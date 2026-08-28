/**
 * Generated from `action=paraminfo&modules=wishlistvote`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `wishlistvote` module (group: action). */
export interface WishlistvoteParams {
  entity: string;
  comment?: string;
  voteaction?: "add" | "remove"; /** Default: `"add"`. */
  token: string;
}
