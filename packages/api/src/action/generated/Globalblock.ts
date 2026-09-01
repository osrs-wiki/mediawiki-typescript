/**
 * Generated from `action=paraminfo&modules=globalblock`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `globalblock` module (group: action). */
export interface GlobalblockParams {
  id?: number;
  target?: string;
  expiry?: string;
  unblock?: boolean;
  reason: string;
  anononly?: boolean;
  "allow-account-creation"?: boolean;
  "enable-autoblock"?: boolean;
  "block-email"?: boolean;
  modify?: boolean;
  alsolocal?: boolean;
  localblockstalk?: boolean;
  localblocksemail?: boolean;
  localanononly?: boolean;
  "local-allow-account-creation"?: boolean;
  token: string;
}
