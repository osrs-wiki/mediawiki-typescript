/**
 * Generated from `action=paraminfo&modules=query+messagegroups`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+messagegroups` module (group: meta). */
export interface QueryMessagegroupsParams {
  depth?: number; /** Default: `100`. */
  filter?: string[] | string; /** Default: `""`. */
  format?: "flat" | "tree"; /** Default: `"flat"`. */
  iconsize?: number; /** Default: `64`. */
  prop?: ("class" | "description" | "exists" | "icon" | "id" | "label" | "namespace" | "priority" | "priorityforce" | "prioritylangs" | "sourcelanguage" | "subscription" | "workflowstates")[] | ("class" | "description" | "exists" | "icon" | "id" | "label" | "namespace" | "priority" | "priorityforce" | "prioritylangs" | "sourcelanguage" | "subscription" | "workflowstates"); /** Default: `"id|label|description|class|exists"`. */
  root?: string; /** Default: `""`. */
  languageFilter?: string; /** Default: `""`. */
}
