/**
 * Generated from `action=paraminfo&modules=query`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query` module (group: action). */
export interface QueryParams {
  prop?: ("categories" | "categoryinfo" | "contributors" | "deletedrevisions" | "duplicatefiles" | "extlinks" | "extracts" | "fileusage" | "globalusage" | "imageinfo" | "images" | "info" | "iwlinks" | "langlinks" | "links" | "linkshere" | "mmcontent" | "pageimages" | "pageprops" | "pageterms" | "pageviews" | "redirects" | "revisions" | "stashimageinfo" | "templates" | "transcludedin" | "transcodestatus" | "videoinfo" | "wbentityusage" | "flowinfo" | "cirrusbuilddoc" | "cirruscompsuggestbuilddoc" | "cirrusdoc" | "description" | "mapdata")[] | ("categories" | "categoryinfo" | "contributors" | "deletedrevisions" | "duplicatefiles" | "extlinks" | "extracts" | "fileusage" | "globalusage" | "imageinfo" | "images" | "info" | "iwlinks" | "langlinks" | "links" | "linkshere" | "mmcontent" | "pageimages" | "pageprops" | "pageterms" | "pageviews" | "redirects" | "revisions" | "stashimageinfo" | "templates" | "transcludedin" | "transcodestatus" | "videoinfo" | "wbentityusage" | "flowinfo" | "cirrusbuilddoc" | "cirruscompsuggestbuilddoc" | "cirrusdoc" | "description" | "mapdata");
  list?: (string)[] | (string);
  meta?: ("allmessages" | "authmanagerinfo" | "babel" | "communityconfiguration" | "featureusage" | "filerepoinfo" | "globalpreferences" | "globalrenamestatus" | "globaluserinfo" | "languageinfo" | "languagestats" | "linterstats" | "managemessagegroups" | "messagegroups" | "messagegroupstats" | "messagetranslations" | "notifications" | "siteinfo" | "siteviews" | "tokens" | "unreadnotificationpages" | "userinfo" | "wikibase" | "checkuserformattedblockinfo" | "readinglists")[] | ("allmessages" | "authmanagerinfo" | "babel" | "communityconfiguration" | "featureusage" | "filerepoinfo" | "globalpreferences" | "globalrenamestatus" | "globaluserinfo" | "languageinfo" | "languagestats" | "linterstats" | "managemessagegroups" | "messagegroups" | "messagegroupstats" | "messagetranslations" | "notifications" | "siteinfo" | "siteviews" | "tokens" | "unreadnotificationpages" | "userinfo" | "wikibase" | "checkuserformattedblockinfo" | "readinglists");
  indexpageids?: boolean;
  export?: boolean;
  exportnowrap?: boolean;
  exportschema?: "0.10" | "0.11"; /** Default: `"0.11"`. */
  iwurl?: boolean;
  continue?: string;
  rawcontinue?: boolean;
  titles?: string[] | string;
  pageids?: number[] | number;
  revids?: number[] | number;
  generator?: string;
  redirects?: boolean;
  converttitles?: boolean;
}
