/**
 * Generated from `action=paraminfo&modules=echocreateevent`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `echocreateevent` module (group: action). */
export interface EchocreateeventParams {
  user?: string;
  header: string;
  content: string;
  page?: string;
  section: "alert" | "notice"; /** Default: `"notice"`. */
  email?: boolean;
  token: string;
}
