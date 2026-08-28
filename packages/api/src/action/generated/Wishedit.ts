/**
 * Generated from `action=paraminfo&modules=wishedit`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `wishedit` module (group: action). */
export interface WisheditParams {
  wish?: string;
  status: "community-opportunity" | "declined" | "done" | "in-progress" | "long-term-opportunity" | "near-term-opportunity" | "prioritized" | "under-review";
  focusarea?: string;
  title: string;
  description: string;
  type: "bug" | "change" | "feature" | "unknown";
  tags?: ("admins" | "android" | "botsgadgets" | "categories" | "changelists" | "citations" | "editing" | "hackathonable" | "ios" | "mobileweb" | "multimedia" | "newcomers" | "notifications" | "patrolling" | "reading" | "search" | "talkpages" | "templates" | "translation" | "wikidata" | "wikisource" | "wiktionary")[] | ("admins" | "android" | "botsgadgets" | "categories" | "changelists" | "citations" | "editing" | "hackathonable" | "ios" | "mobileweb" | "multimedia" | "newcomers" | "notifications" | "patrolling" | "reading" | "search" | "talkpages" | "templates" | "translation" | "wikidata" | "wikisource" | "wiktionary");
  audience?: string;
  phabtasks?: string[] | string;
  proposer: string;
  created: string;
  baselang: string;
  baserevid?: number;
  token: string;
}
