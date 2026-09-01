/**
 * Generated from `action=paraminfo&modules=query+contributors`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+contributors` module (group: prop). */
export interface QueryContributorsParams {
  group?: ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader")[] | ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader");
  excludegroup?: ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader")[] | ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader");
  rights?: (string)[] | (string);
  excluderights?: (string)[] | (string);
  limit?: number; /** Default: `10`. */
  continue?: string;
}
