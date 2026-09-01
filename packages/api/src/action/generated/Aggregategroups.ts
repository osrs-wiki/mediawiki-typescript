/**
 * Generated from `action=paraminfo&modules=aggregategroups`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `aggregategroups` module (group: action). */
export interface AggregategroupsParams {
  do: "add" | "associate" | "dissociate" | "remove" | "update";
  aggregategroup?: string;
  group?: string;
  groups?: string[] | string;
  groupname?: string;
  groupdescription?: string; /** Default: `""`. */
  groupsourcelanguagecode?: string; /** Default: `"und"`. */
  token: string;
}
