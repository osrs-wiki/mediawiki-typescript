/**
 * Generated from `action=paraminfo&modules=query+globalrenamequeue`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+globalrenamequeue` module (group: list). */
export interface QueryGlobalrenamequeueParams {
  queue: "closed" | "open";
  status?: "all" | "approved" | "rejected"; /** Default: `"all"`. */
  type?: "all" | "rename" | "vanish"; /** Default: `"all"`. */
  user?: string;
  newname?: string;
  performer?: string;
  limit?: number; /** Default: `10`. */
  continue?: string;
}
