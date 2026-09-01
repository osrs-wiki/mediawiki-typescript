/**
 * Generated from `action=paraminfo&modules=flow`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `flow` module (group: action). */
export interface FlowParams {
  submodule: "edit-header" | "edit-post" | "edit-title" | "edit-topic-summary" | "lock-topic" | "moderate-post" | "moderate-topic" | "new-topic" | "reply" | "undo-edit-header" | "undo-edit-post" | "undo-edit-topic-summary" | "view-header" | "view-post" | "view-post-history" | "view-topic" | "view-topic-history" | "view-topic-summary" | "view-topiclist" | "close-open-topic";
  page?: string; /** Default: `"Topic:Flow-enabled_page"`. */
  token?: string; /** Default: `""`. */
}
