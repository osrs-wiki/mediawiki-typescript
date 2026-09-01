/**
 * Generated from `action=paraminfo&modules=query+extlinks`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+extlinks` module (group: prop). */
export interface QueryExtlinksParams {
  limit?: number; /** Default: `10`. */
  continue?: string;
  protocol?: "" | "bitcoin" | "ftp" | "ftps" | "geo" | "git" | "gopher" | "http" | "https" | "irc" | "ircs" | "magnet" | "mailto" | "matrix" | "mms" | "news" | "nntp" | "redis" | "sftp" | "sip" | "sips" | "sms" | "ssh" | "svn" | "tel" | "telnet" | "urn" | "wikipedia" | "worldwind" | "xmpp"; /** Default: `""`. */
  query?: string;
  expandurl?: boolean;
}
