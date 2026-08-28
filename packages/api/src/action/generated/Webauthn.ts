/**
 * Generated from `action=paraminfo&modules=webauthn`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `webauthn` module (group: action). */
export interface WebauthnParams {
  func: "getAuthInfo" | "getRegisterInfo" | "register";
  passkeyMode?: boolean;
  credential?: string;
  friendlyname?: string;
}
