/**
 * Generated from `action=paraminfo&modules=parser-migration`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `parser-migration` module (group: action). */
export interface ParserMigrationParams {
  title: string;
  config?: ("new" | "old")[] | ("new" | "old"); /** Default: `"old|new"`. */
  redirect?: string;
}
