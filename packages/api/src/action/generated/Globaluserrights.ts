/**
 * Generated from `action=paraminfo&modules=globaluserrights`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `globaluserrights` module (group: action). */
export interface GlobaluserrightsParams {
  user?: string;
  userid?: number;
  add?: ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher")[] | ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher");
  expiry?: string[] | string; /** Default: `"infinite"`. */
  remove?: ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher")[] | ("abusefilter-helper" | "abusefilter-maintainer" | "apihighlimits-requestor" | "captcha-exempt" | "founder" | "global-bot" | "global-deleter" | "global-flow-create" | "global-interface-editor" | "global-ipblock-exempt" | "global-rollbacker" | "global-sysop" | "global-temporary-account-viewer" | "local-bot" | "new-wikis-importer" | "ombuds" | "recursive-export" | "staff" | "steward" | "sysadmin" | "u4c-member" | "vrt-permissions" | "wmf-email-block-override" | "wmf-researcher");
  reason?: string; /** Default: `""`. */
  token: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
}
