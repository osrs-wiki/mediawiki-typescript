/**
 * Generated from `action=paraminfo&modules=query+exturlusage`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+exturlusage` module (group: list). */
export interface QueryExturlusageParams {
  prop?: ("ids" | "title" | "url")[] | ("ids" | "title" | "url"); /** Default: `"ids|title|url"`. */
  continue?: string;
  protocol?: "" | "bitcoin" | "ftp" | "ftps" | "geo" | "git" | "gopher" | "http" | "https" | "irc" | "ircs" | "magnet" | "mailto" | "matrix" | "mms" | "news" | "nntp" | "redis" | "sftp" | "sip" | "sips" | "sms" | "ssh" | "svn" | "tel" | "telnet" | "urn" | "wikipedia" | "worldwind" | "xmpp"; /** Default: `""`. */
  query?: string;
  namespace?: number[] | number;
  limit?: number; /** Default: `10`. */
  expandurl?: boolean;
}
