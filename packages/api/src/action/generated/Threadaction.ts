/**
 * Generated from `action=paraminfo&modules=threadaction`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `threadaction` module (group: action). */
export interface ThreadactionParams {
  thread?: string[] | string;
  talkpage?: string;
  threadaction: "addreaction" | "deletereaction" | "edit" | "inlineeditform" | "markread" | "markunread" | "merge" | "newthread" | "reply" | "setsortkey" | "setsubject" | "split";
  token: string;
  subject?: string;
  reason?: string;
  newparent?: string;
  text?: string;
  render?: string;
  bump?: string;
  sortkey?: string;
  signature?: string;
  type?: string;
  value?: string;
  method?: string;
  operand?: string;
  captchaword?: string;
  captchaid?: string;
  wgConfirmEditForceShowCaptcha?: boolean;
  editorinterface?: string;
  discussiontoolsautosubscribe?: "no" | "preferences" | "yes"; /** Default: `"preferences"`. */
}
