/**
 * Generated from `action=paraminfo&modules=query+allusers`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+allusers` module (group: list). */
export interface QueryAllusersParams {
  from?: string;
  to?: string;
  prefix?: string;
  dir?: "ascending" | "descending"; /** Default: `"ascending"`. */
  group?: ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader")[] | ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader");
  excludegroup?: ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader")[] | ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader");
  rights?: (string)[] | (string);
  prop?: ("blockinfo" | "centralids" | "editcount" | "groups" | "implicitgroups" | "registration" | "rights" | "tempexpired")[] | ("blockinfo" | "centralids" | "editcount" | "groups" | "implicitgroups" | "registration" | "rights" | "tempexpired");
  limit?: number; /** Default: `10`. */
  witheditsonly?: boolean;
  activeusers?: boolean;
  attachedwiki?: string;
  excludenamed?: boolean;
  excludetemp?: boolean;
}
