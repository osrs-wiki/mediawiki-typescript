/**
 * Generated from `action=paraminfo&modules=query+info`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+info` module (group: prop). */
export interface QueryInfoParams {
  prop?: ("associatedpage" | "displaytitle" | "editintro" | "linkclasses" | "notificationtimestamp" | "preloadcontent" | "protection" | "subjectid" | "talkid" | "url" | "varianttitles" | "visitingwatchers" | "watched" | "watchers" | "watchlistlabels" | "preload" | "readable")[] | ("associatedpage" | "displaytitle" | "editintro" | "linkclasses" | "notificationtimestamp" | "preloadcontent" | "protection" | "subjectid" | "talkid" | "url" | "varianttitles" | "visitingwatchers" | "watched" | "watchers" | "watchlistlabels" | "preload" | "readable");
  linkcontext?: string; /** Default: `"MediaWiki"`. */
  defaultlinkcaption?: boolean;
  testactions?: string[] | string;
  testactionsdetail?: "boolean" | "full" | "quick"; /** Default: `"boolean"`. */
  testactionsautocreate?: boolean;
  preloadcustom?: string;
  preloadparams?: string[] | string;
  preloadnewsection?: boolean;
  editintrostyle?: "lessframes" | "moreframes"; /** Default: `"moreframes"`. */
  editintroskip?: string[] | string;
  editintrocustom?: string;
  continue?: string;
}
