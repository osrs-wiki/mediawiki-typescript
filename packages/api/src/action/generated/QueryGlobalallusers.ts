/**
 * Generated from `action=paraminfo&modules=query+globalallusers`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+globalallusers` module (group: list). */
export interface QueryGlobalallusersParams {
  from?: string;
  to?: string;
  prefix?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  group?: ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher")[] | ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher");
  excludegroup?: ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher")[] | ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher");
  prop?: ("existslocally" | "groups" | "lockinfo")[] | ("existslocally" | "groups" | "lockinfo");
  limit?: number; /** Default: `10`. */
  excludenamed?: boolean;
  excludetemp?: boolean;
}
