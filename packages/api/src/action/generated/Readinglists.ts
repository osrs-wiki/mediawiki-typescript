/**
 * Generated from `action=paraminfo&modules=readinglists`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `readinglists` module (group: action). */
export interface ReadinglistsParams {
  command: "create" | "createentry" | "delete" | "deleteentry" | "setup" | "teardown" | "update";
  token: string;
}
