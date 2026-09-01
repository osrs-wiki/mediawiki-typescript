/**
 * Generated from `action=paraminfo&modules=userrights`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `userrights` module (group: action). */
export interface UserrightsParams {
  user?: string;
  userid?: number;
  add?: ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader")[] | ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader");
  expiry?: string[] | string; /** Default: `"infinite"`. */
  remove?: ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader")[] | ("accountcreator" | "autopatrolled" | "bot" | "bureaucrat" | "checkuser" | "community-wishlist-manager" | "confirmed" | "event-organizer" | "flow-bot" | "import" | "interface-admin" | "ipblock-exempt" | "no-ipinfo" | "steward" | "suppress" | "sysop" | "temporary-account-viewer" | "translationadmin" | "transwiki" | "uploader");
  reason?: string; /** Default: `""`. */
  token: string;
  tags?: ("AWB" | "convenient-discussions")[] | ("AWB" | "convenient-discussions");
  watchuser?: boolean;
  watchlistexpiry?: string;
}
