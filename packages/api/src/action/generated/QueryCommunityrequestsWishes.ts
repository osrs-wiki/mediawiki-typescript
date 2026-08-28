/**
 * Generated from `action=paraminfo&modules=query+communityrequests-wishes`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+communityrequests-wishes` module (group: list). */
export interface QueryCommunityrequestsWishesParams {
  lang?: string;
  tags?: ("admins" | "android" | "botsgadgets" | "categories" | "changelists" | "citations" | "editing" | "hackathonable" | "ios" | "mobileweb" | "multimedia" | "newcomers" | "notifications" | "patrolling" | "reading" | "search" | "talkpages" | "templates" | "translation" | "wikidata" | "wikisource" | "wiktionary")[] | ("admins" | "android" | "botsgadgets" | "categories" | "changelists" | "citations" | "editing" | "hackathonable" | "ios" | "mobileweb" | "multimedia" | "newcomers" | "notifications" | "patrolling" | "reading" | "search" | "talkpages" | "templates" | "translation" | "wikidata" | "wikisource" | "wiktionary");
  statuses?: ("community-opportunity" | "declined" | "done" | "in-progress" | "long-term-opportunity" | "near-term-opportunity" | "prioritized" | "under-review")[] | ("community-opportunity" | "declined" | "done" | "in-progress" | "long-term-opportunity" | "near-term-opportunity" | "prioritized" | "under-review");
  focusareas?: string[] | string;
  prop?: ("audience" | "baselang" | "created" | "description" | "focusarea" | "langinfo" | "phabtasks" | "proposer" | "status" | "tags" | "title" | "type" | "updated" | "votecount")[] | ("audience" | "baselang" | "created" | "description" | "focusarea" | "langinfo" | "phabtasks" | "proposer" | "status" | "tags" | "title" | "type" | "updated" | "votecount"); /** Default: `"tags|status|type|title|votecount|created|updated"`. */
  sort?: "created" | "title" | "updated" | "votecount"; /** Default: `"created"`. */
  dir?: "ascending" | "descending"; /** Default: `"descending"`. */
  limit?: number; /** Default: `10`. */
  count?: boolean;
  start?: string;
  end?: string;
  continue?: string;
}
