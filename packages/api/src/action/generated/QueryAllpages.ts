/**
 * Generated from `action=paraminfo&modules=query+allpages`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+allpages` module (group: list). */
export interface QueryAllpagesParams {
  from?: string;
  continue?: string;
  to?: string;
  prefix?: string;
  namespace?: number; /** Default: `0`. */
  filterredir?: "all" | "nonredirects" | "redirects"; /** Default: `"all"`. */
  filterlanglinks?: "all" | "withlanglinks" | "withoutlanglinks"; /** Default: `"all"`. */
  minsize?: number;
  maxsize?: number;
  prtype?: ("edit" | "move" | "upload")[] | ("edit" | "move" | "upload");
  prlevel?: ("" | "autoconfirmed" | "sysop")[] | ("" | "autoconfirmed" | "sysop");
  prfiltercascade?: "all" | "cascading" | "noncascading"; /** Default: `"all"`. */
  prexpiry?: "all" | "definite" | "indefinite"; /** Default: `"all"`. */
  limit?: number; /** Default: `10`. */
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
}
