/**
 * Generated from https://www.mediawiki.org/w/api.php (`action=paraminfo`). Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** One entry per generated Action API module. */
export type GeneratedModuleManifestEntry = {
  /** The module's bare name, e.g. "revisions" for query+revisions. */
  name: string;
  /** Full paraminfo module path, e.g. "query+revisions". */
  path: string;
  /** Submodule group ("action", "prop", "list", "meta", "generator"), if applicable. */
  group?: string;
  /** Whether MediaWiki marks this module internal-use-only. */
  internal: boolean;
  /** Name of the generated `*Params` interface for this module. */
  exportName: string;
};

/** The wiki `action=paraminfo` was crawled against to produce this manifest. */
export const referenceWiki = "https://www.mediawiki.org/w/api.php";

/** Every Action API module discovered via paraminfo when this manifest was generated. */
export const generatedModuleManifest: GeneratedModuleManifestEntry[] = [
  {
    "name": "abusefiltercheckmatch",
    "path": "abusefiltercheckmatch",
    "group": "action",
    "internal": false,
    "exportName": "AbusefiltercheckmatchParams"
  },
  {
    "name": "abusefilterchecksyntax",
    "path": "abusefilterchecksyntax",
    "group": "action",
    "internal": false,
    "exportName": "AbusefilterchecksyntaxParams"
  },
  {
    "name": "abusefilterevalexpression",
    "path": "abusefilterevalexpression",
    "group": "action",
    "internal": false,
    "exportName": "AbusefilterevalexpressionParams"
  },
  {
    "name": "abusefilterunblockautopromote",
    "path": "abusefilterunblockautopromote",
    "group": "action",
    "internal": false,
    "exportName": "AbusefilterunblockautopromoteParams"
  },
  {
    "name": "abuselogprivatedetails",
    "path": "abuselogprivatedetails",
    "group": "action",
    "internal": false,
    "exportName": "AbuselogprivatedetailsParams"
  },
  {
    "name": "acquiretempusername",
    "path": "acquiretempusername",
    "group": "action",
    "internal": false,
    "exportName": "AcquiretempusernameParams"
  },
  {
    "name": "aggregategroups",
    "path": "aggregategroups",
    "group": "action",
    "internal": false,
    "exportName": "AggregategroupsParams"
  },
  {
    "name": "antispoof",
    "path": "antispoof",
    "group": "action",
    "internal": false,
    "exportName": "AntispoofParams"
  },
  {
    "name": "block",
    "path": "block",
    "group": "action",
    "internal": false,
    "exportName": "BlockParams"
  },
  {
    "name": "centralauthtoken",
    "path": "centralauthtoken",
    "group": "action",
    "internal": false,
    "exportName": "CentralauthtokenParams"
  },
  {
    "name": "centralnoticecdncacheupdatebanner",
    "path": "centralnoticecdncacheupdatebanner",
    "group": "action",
    "internal": false,
    "exportName": "CentralnoticecdncacheupdatebannerParams"
  },
  {
    "name": "centralnoticechoicedata",
    "path": "centralnoticechoicedata",
    "group": "action",
    "internal": false,
    "exportName": "CentralnoticechoicedataParams"
  },
  {
    "name": "centralnoticequerycampaign",
    "path": "centralnoticequerycampaign",
    "group": "action",
    "internal": false,
    "exportName": "CentralnoticequerycampaignParams"
  },
  {
    "name": "changeauthenticationdata",
    "path": "changeauthenticationdata",
    "group": "action",
    "internal": false,
    "exportName": "ChangeauthenticationdataParams"
  },
  {
    "name": "changecontentmodel",
    "path": "changecontentmodel",
    "group": "action",
    "internal": false,
    "exportName": "ChangecontentmodelParams"
  },
  {
    "name": "checktoken",
    "path": "checktoken",
    "group": "action",
    "internal": false,
    "exportName": "ChecktokenParams"
  },
  {
    "name": "clearhasmsg",
    "path": "clearhasmsg",
    "group": "action",
    "internal": false,
    "exportName": "ClearhasmsgParams"
  },
  {
    "name": "clientlogin",
    "path": "clientlogin",
    "group": "action",
    "internal": false,
    "exportName": "ClientloginParams"
  },
  {
    "name": "communityconfigurationedit",
    "path": "communityconfigurationedit",
    "group": "action",
    "internal": false,
    "exportName": "CommunityconfigurationeditParams"
  },
  {
    "name": "compare",
    "path": "compare",
    "group": "action",
    "internal": false,
    "exportName": "CompareParams"
  },
  {
    "name": "createaccount",
    "path": "createaccount",
    "group": "action",
    "internal": false,
    "exportName": "CreateaccountParams"
  },
  {
    "name": "createlocalaccount",
    "path": "createlocalaccount",
    "group": "action",
    "internal": false,
    "exportName": "CreatelocalaccountParams"
  },
  {
    "name": "delete",
    "path": "delete",
    "group": "action",
    "internal": false,
    "exportName": "DeleteParams"
  },
  {
    "name": "deleteglobalaccount",
    "path": "deleteglobalaccount",
    "group": "action",
    "internal": false,
    "exportName": "DeleteglobalaccountParams"
  },
  {
    "name": "discouragetranslation",
    "path": "discouragetranslation",
    "group": "action",
    "internal": false,
    "exportName": "DiscouragetranslationParams"
  },
  {
    "name": "discussiontoolsedit",
    "path": "discussiontoolsedit",
    "group": "action",
    "internal": false,
    "exportName": "DiscussiontoolseditParams"
  },
  {
    "name": "discussiontoolsfindcomment",
    "path": "discussiontoolsfindcomment",
    "group": "action",
    "internal": false,
    "exportName": "DiscussiontoolsfindcommentParams"
  },
  {
    "name": "discussiontoolsgetsubscriptions",
    "path": "discussiontoolsgetsubscriptions",
    "group": "action",
    "internal": false,
    "exportName": "DiscussiontoolsgetsubscriptionsParams"
  },
  {
    "name": "discussiontoolssubscribe",
    "path": "discussiontoolssubscribe",
    "group": "action",
    "internal": false,
    "exportName": "DiscussiontoolssubscribeParams"
  },
  {
    "name": "discussiontoolsthank",
    "path": "discussiontoolsthank",
    "group": "action",
    "internal": false,
    "exportName": "DiscussiontoolsthankParams"
  },
  {
    "name": "echocreateevent",
    "path": "echocreateevent",
    "group": "action",
    "internal": false,
    "exportName": "EchocreateeventParams"
  },
  {
    "name": "echomarkread",
    "path": "echomarkread",
    "group": "action",
    "internal": false,
    "exportName": "EchomarkreadParams"
  },
  {
    "name": "echomarkseen",
    "path": "echomarkseen",
    "group": "action",
    "internal": false,
    "exportName": "EchomarkseenParams"
  },
  {
    "name": "echomute",
    "path": "echomute",
    "group": "action",
    "internal": false,
    "exportName": "EchomuteParams"
  },
  {
    "name": "edit",
    "path": "edit",
    "group": "action",
    "internal": false,
    "exportName": "EditParams"
  },
  {
    "name": "editmassmessagelist",
    "path": "editmassmessagelist",
    "group": "action",
    "internal": false,
    "exportName": "EditmassmessagelistParams"
  },
  {
    "name": "emailuser",
    "path": "emailuser",
    "group": "action",
    "internal": false,
    "exportName": "EmailuserParams"
  },
  {
    "name": "expandtemplates",
    "path": "expandtemplates",
    "group": "action",
    "internal": false,
    "exportName": "ExpandtemplatesParams"
  },
  {
    "name": "featuredfeed",
    "path": "featuredfeed",
    "group": "action",
    "internal": false,
    "exportName": "FeaturedfeedParams"
  },
  {
    "name": "feedcontributions",
    "path": "feedcontributions",
    "group": "action",
    "internal": false,
    "exportName": "FeedcontributionsParams"
  },
  {
    "name": "feedrecentchanges",
    "path": "feedrecentchanges",
    "group": "action",
    "internal": false,
    "exportName": "FeedrecentchangesParams"
  },
  {
    "name": "feedthreads",
    "path": "feedthreads",
    "group": "action",
    "internal": false,
    "exportName": "FeedthreadsParams"
  },
  {
    "name": "feedwatchlist",
    "path": "feedwatchlist",
    "group": "action",
    "internal": false,
    "exportName": "FeedwatchlistParams"
  },
  {
    "name": "filerevert",
    "path": "filerevert",
    "group": "action",
    "internal": false,
    "exportName": "FilerevertParams"
  },
  {
    "name": "flow",
    "path": "flow",
    "group": "action",
    "internal": false,
    "exportName": "FlowParams"
  },
  {
    "name": "flow-parsoid-utils",
    "path": "flow-parsoid-utils",
    "group": "action",
    "internal": false,
    "exportName": "FlowParsoidUtilsParams"
  },
  {
    "name": "flowthank",
    "path": "flowthank",
    "group": "action",
    "internal": false,
    "exportName": "FlowthankParams"
  },
  {
    "name": "globalblock",
    "path": "globalblock",
    "group": "action",
    "internal": false,
    "exportName": "GlobalblockParams"
  },
  {
    "name": "globalpreferenceoverrides",
    "path": "globalpreferenceoverrides",
    "group": "action",
    "internal": false,
    "exportName": "GlobalpreferenceoverridesParams"
  },
  {
    "name": "globalpreferences",
    "path": "globalpreferences",
    "group": "action",
    "internal": false,
    "exportName": "GlobalpreferencesParams"
  },
  {
    "name": "globaluserrights",
    "path": "globaluserrights",
    "group": "action",
    "internal": false,
    "exportName": "GlobaluserrightsParams"
  },
  {
    "name": "groupreview",
    "path": "groupreview",
    "group": "action",
    "internal": false,
    "exportName": "GroupreviewParams"
  },
  {
    "name": "help",
    "path": "help",
    "group": "action",
    "internal": false,
    "exportName": "HelpParams"
  },
  {
    "name": "imagerotate",
    "path": "imagerotate",
    "group": "action",
    "internal": false,
    "exportName": "ImagerotateParams"
  },
  {
    "name": "import",
    "path": "import",
    "group": "action",
    "internal": false,
    "exportName": "ImportParams"
  },
  {
    "name": "jsonconfig",
    "path": "jsonconfig",
    "group": "action",
    "internal": false,
    "exportName": "JsonconfigParams"
  },
  {
    "name": "languagesearch",
    "path": "languagesearch",
    "group": "action",
    "internal": false,
    "exportName": "LanguagesearchParams"
  },
  {
    "name": "linkaccount",
    "path": "linkaccount",
    "group": "action",
    "internal": false,
    "exportName": "LinkaccountParams"
  },
  {
    "name": "login",
    "path": "login",
    "group": "action",
    "internal": false,
    "exportName": "LoginParams"
  },
  {
    "name": "logout",
    "path": "logout",
    "group": "action",
    "internal": false,
    "exportName": "LogoutParams"
  },
  {
    "name": "managetags",
    "path": "managetags",
    "group": "action",
    "internal": false,
    "exportName": "ManagetagsParams"
  },
  {
    "name": "markfortranslation",
    "path": "markfortranslation",
    "group": "action",
    "internal": false,
    "exportName": "MarkfortranslationParams"
  },
  {
    "name": "massmessage",
    "path": "massmessage",
    "group": "action",
    "internal": false,
    "exportName": "MassmessageParams"
  },
  {
    "name": "mergehistory",
    "path": "mergehistory",
    "group": "action",
    "internal": false,
    "exportName": "MergehistoryParams"
  },
  {
    "name": "move",
    "path": "move",
    "group": "action",
    "internal": false,
    "exportName": "MoveParams"
  },
  {
    "name": "newslettersubscribe",
    "path": "newslettersubscribe",
    "group": "action",
    "internal": false,
    "exportName": "NewslettersubscribeParams"
  },
  {
    "name": "opensearch",
    "path": "opensearch",
    "group": "action",
    "internal": false,
    "exportName": "OpensearchParams"
  },
  {
    "name": "options",
    "path": "options",
    "group": "action",
    "internal": false,
    "exportName": "OptionsParams"
  },
  {
    "name": "paraminfo",
    "path": "paraminfo",
    "group": "action",
    "internal": false,
    "exportName": "ParaminfoParams"
  },
  {
    "name": "parse",
    "path": "parse",
    "group": "action",
    "internal": false,
    "exportName": "ParseParams"
  },
  {
    "name": "patrol",
    "path": "patrol",
    "group": "action",
    "internal": false,
    "exportName": "PatrolParams"
  },
  {
    "name": "protect",
    "path": "protect",
    "group": "action",
    "internal": false,
    "exportName": "ProtectParams"
  },
  {
    "name": "purge",
    "path": "purge",
    "group": "action",
    "internal": false,
    "exportName": "PurgeParams"
  },
  {
    "name": "query",
    "path": "query",
    "group": "action",
    "internal": false,
    "exportName": "QueryParams"
  },
  {
    "name": "removeauthenticationdata",
    "path": "removeauthenticationdata",
    "group": "action",
    "internal": false,
    "exportName": "RemoveauthenticationdataParams"
  },
  {
    "name": "resetpassword",
    "path": "resetpassword",
    "group": "action",
    "internal": false,
    "exportName": "ResetpasswordParams"
  },
  {
    "name": "revisiondelete",
    "path": "revisiondelete",
    "group": "action",
    "internal": false,
    "exportName": "RevisiondeleteParams"
  },
  {
    "name": "rollback",
    "path": "rollback",
    "group": "action",
    "internal": false,
    "exportName": "RollbackParams"
  },
  {
    "name": "rsd",
    "path": "rsd",
    "group": "action",
    "internal": false,
    "exportName": "RsdParams"
  },
  {
    "name": "searchtranslations",
    "path": "searchtranslations",
    "group": "action",
    "internal": false,
    "exportName": "SearchtranslationsParams"
  },
  {
    "name": "setglobalaccountstatus",
    "path": "setglobalaccountstatus",
    "group": "action",
    "internal": false,
    "exportName": "SetglobalaccountstatusParams"
  },
  {
    "name": "setnotificationtimestamp",
    "path": "setnotificationtimestamp",
    "group": "action",
    "internal": false,
    "exportName": "SetnotificationtimestampParams"
  },
  {
    "name": "setpagelanguage",
    "path": "setpagelanguage",
    "group": "action",
    "internal": false,
    "exportName": "SetpagelanguageParams"
  },
  {
    "name": "shortenurl",
    "path": "shortenurl",
    "group": "action",
    "internal": false,
    "exportName": "ShortenurlParams"
  },
  {
    "name": "sitematrix",
    "path": "sitematrix",
    "group": "action",
    "internal": false,
    "exportName": "SitematrixParams"
  },
  {
    "name": "spamblacklist",
    "path": "spamblacklist",
    "group": "action",
    "internal": false,
    "exportName": "SpamblacklistParams"
  },
  {
    "name": "streamconfigs",
    "path": "streamconfigs",
    "group": "action",
    "internal": false,
    "exportName": "StreamconfigsParams"
  },
  {
    "name": "strikevote",
    "path": "strikevote",
    "group": "action",
    "internal": false,
    "exportName": "StrikevoteParams"
  },
  {
    "name": "tag",
    "path": "tag",
    "group": "action",
    "internal": false,
    "exportName": "TagParams"
  },
  {
    "name": "templatedata",
    "path": "templatedata",
    "group": "action",
    "internal": false,
    "exportName": "TemplatedataParams"
  },
  {
    "name": "thank",
    "path": "thank",
    "group": "action",
    "internal": false,
    "exportName": "ThankParams"
  },
  {
    "name": "threadaction",
    "path": "threadaction",
    "group": "action",
    "internal": false,
    "exportName": "ThreadactionParams"
  },
  {
    "name": "titleblacklist",
    "path": "titleblacklist",
    "group": "action",
    "internal": false,
    "exportName": "TitleblacklistParams"
  },
  {
    "name": "torblock",
    "path": "torblock",
    "group": "action",
    "internal": false,
    "exportName": "TorblockParams"
  },
  {
    "name": "transcodereset",
    "path": "transcodereset",
    "group": "action",
    "internal": false,
    "exportName": "TranscoderesetParams"
  },
  {
    "name": "translationaids",
    "path": "translationaids",
    "group": "action",
    "internal": false,
    "exportName": "TranslationaidsParams"
  },
  {
    "name": "translationreview",
    "path": "translationreview",
    "group": "action",
    "internal": false,
    "exportName": "TranslationreviewParams"
  },
  {
    "name": "translationstats",
    "path": "translationstats",
    "group": "action",
    "internal": false,
    "exportName": "TranslationstatsParams"
  },
  {
    "name": "ttmserver",
    "path": "ttmserver",
    "group": "action",
    "internal": false,
    "exportName": "TtmserverParams"
  },
  {
    "name": "unblock",
    "path": "unblock",
    "group": "action",
    "internal": false,
    "exportName": "UnblockParams"
  },
  {
    "name": "undelete",
    "path": "undelete",
    "group": "action",
    "internal": false,
    "exportName": "UndeleteParams"
  },
  {
    "name": "unlinkaccount",
    "path": "unlinkaccount",
    "group": "action",
    "internal": false,
    "exportName": "UnlinkaccountParams"
  },
  {
    "name": "upload",
    "path": "upload",
    "group": "action",
    "internal": false,
    "exportName": "UploadParams"
  },
  {
    "name": "userrights",
    "path": "userrights",
    "group": "action",
    "internal": false,
    "exportName": "UserrightsParams"
  },
  {
    "name": "validatepassword",
    "path": "validatepassword",
    "group": "action",
    "internal": false,
    "exportName": "ValidatepasswordParams"
  },
  {
    "name": "watch",
    "path": "watch",
    "group": "action",
    "internal": false,
    "exportName": "WatchParams"
  },
  {
    "name": "webapp-manifest",
    "path": "webapp-manifest",
    "group": "action",
    "internal": false,
    "exportName": "WebappManifestParams"
  },
  {
    "name": "webauthn",
    "path": "webauthn",
    "group": "action",
    "internal": false,
    "exportName": "WebauthnParams"
  },
  {
    "name": "wikilove",
    "path": "wikilove",
    "group": "action",
    "internal": false,
    "exportName": "WikiloveParams"
  },
  {
    "name": "bouncehandler",
    "path": "bouncehandler",
    "group": "action",
    "internal": true,
    "exportName": "BouncehandlerParams"
  },
  {
    "name": "categorytree",
    "path": "categorytree",
    "group": "action",
    "internal": true,
    "exportName": "CategorytreeParams"
  },
  {
    "name": "chartinfo",
    "path": "chartinfo",
    "group": "action",
    "internal": true,
    "exportName": "ChartinfoParams"
  },
  {
    "name": "cirrus-check-sanity",
    "path": "cirrus-check-sanity",
    "group": "action",
    "internal": true,
    "exportName": "CirrusCheckSanityParams"
  },
  {
    "name": "cirrus-config-dump",
    "path": "cirrus-config-dump",
    "group": "action",
    "internal": true,
    "exportName": "CirrusConfigDumpParams"
  },
  {
    "name": "cirrus-profiles-dump",
    "path": "cirrus-profiles-dump",
    "group": "action",
    "internal": true,
    "exportName": "CirrusProfilesDumpParams"
  },
  {
    "name": "cirrus-schema-dump",
    "path": "cirrus-schema-dump",
    "group": "action",
    "internal": true,
    "exportName": "CirrusSchemaDumpParams"
  },
  {
    "name": "codemirror-validate",
    "path": "codemirror-validate",
    "group": "action",
    "internal": true,
    "exportName": "CodemirrorValidateParams"
  },
  {
    "name": "collection",
    "path": "collection",
    "group": "action",
    "internal": true,
    "exportName": "CollectionParams"
  },
  {
    "name": "cspreport",
    "path": "cspreport",
    "group": "action",
    "internal": true,
    "exportName": "CspreportParams"
  },
  {
    "name": "discussiontoolscompare",
    "path": "discussiontoolscompare",
    "group": "action",
    "internal": true,
    "exportName": "DiscussiontoolscompareParams"
  },
  {
    "name": "discussiontoolspageinfo",
    "path": "discussiontoolspageinfo",
    "group": "action",
    "internal": true,
    "exportName": "DiscussiontoolspageinfoParams"
  },
  {
    "name": "discussiontoolspreview",
    "path": "discussiontoolspreview",
    "group": "action",
    "internal": true,
    "exportName": "DiscussiontoolspreviewParams"
  },
  {
    "name": "editcheckreferenceurl",
    "path": "editcheckreferenceurl",
    "group": "action",
    "internal": true,
    "exportName": "EditcheckreferenceurlParams"
  },
  {
    "name": "fancycaptchareload",
    "path": "fancycaptchareload",
    "group": "action",
    "internal": true,
    "exportName": "FancycaptchareloadParams"
  },
  {
    "name": "focusareaedit",
    "path": "focusareaedit",
    "group": "action",
    "internal": true,
    "exportName": "FocusareaeditParams"
  },
  {
    "name": "jsondata",
    "path": "jsondata",
    "group": "action",
    "internal": true,
    "exportName": "JsondataParams"
  },
  {
    "name": "jsontransform",
    "path": "jsontransform",
    "group": "action",
    "internal": true,
    "exportName": "JsontransformParams"
  },
  {
    "name": "managegroupsynchronizationcache",
    "path": "managegroupsynchronizationcache",
    "group": "action",
    "internal": true,
    "exportName": "ManagegroupsynchronizationcacheParams"
  },
  {
    "name": "managemessagegroups",
    "path": "managemessagegroups",
    "group": "action",
    "internal": true,
    "exportName": "ManagemessagegroupsParams"
  },
  {
    "name": "messagegroupsubscription",
    "path": "messagegroupsubscription",
    "group": "action",
    "internal": true,
    "exportName": "MessagegroupsubscriptionParams"
  },
  {
    "name": "parser-migration",
    "path": "parser-migration",
    "group": "action",
    "internal": true,
    "exportName": "ParserMigrationParams"
  },
  {
    "name": "readinglists",
    "path": "readinglists",
    "group": "action",
    "internal": true,
    "exportName": "ReadinglistsParams"
  },
  {
    "name": "sanitize-mapdata",
    "path": "sanitize-mapdata",
    "group": "action",
    "internal": true,
    "exportName": "SanitizeMapdataParams"
  },
  {
    "name": "scribunto-console",
    "path": "scribunto-console",
    "group": "action",
    "internal": true,
    "exportName": "ScribuntoConsoleParams"
  },
  {
    "name": "securepollauth",
    "path": "securepollauth",
    "group": "action",
    "internal": true,
    "exportName": "SecurepollauthParams"
  },
  {
    "name": "stashedit",
    "path": "stashedit",
    "group": "action",
    "internal": true,
    "exportName": "StasheditParams"
  },
  {
    "name": "timedtext",
    "path": "timedtext",
    "group": "action",
    "internal": true,
    "exportName": "TimedtextParams"
  },
  {
    "name": "translationcheck",
    "path": "translationcheck",
    "group": "action",
    "internal": true,
    "exportName": "TranslationcheckParams"
  },
  {
    "name": "translationentitysearch",
    "path": "translationentitysearch",
    "group": "action",
    "internal": true,
    "exportName": "TranslationentitysearchParams"
  },
  {
    "name": "ulslocalization",
    "path": "ulslocalization",
    "group": "action",
    "internal": true,
    "exportName": "UlslocalizationParams"
  },
  {
    "name": "ulssetlang",
    "path": "ulssetlang",
    "group": "action",
    "internal": true,
    "exportName": "UlssetlangParams"
  },
  {
    "name": "visualeditor",
    "path": "visualeditor",
    "group": "action",
    "internal": true,
    "exportName": "VisualeditorParams"
  },
  {
    "name": "visualeditoredit",
    "path": "visualeditoredit",
    "group": "action",
    "internal": true,
    "exportName": "VisualeditoreditParams"
  },
  {
    "name": "wikimediaeventsblockededit",
    "path": "wikimediaeventsblockededit",
    "group": "action",
    "internal": true,
    "exportName": "WikimediaeventsblockededitParams"
  },
  {
    "name": "wikimediaeventshcaptchaeditattempt",
    "path": "wikimediaeventshcaptchaeditattempt",
    "group": "action",
    "internal": true,
    "exportName": "WikimediaeventshcaptchaeditattemptParams"
  },
  {
    "name": "wishedit",
    "path": "wishedit",
    "group": "action",
    "internal": true,
    "exportName": "WisheditParams"
  },
  {
    "name": "wishlistvote",
    "path": "wishlistvote",
    "group": "action",
    "internal": true,
    "exportName": "WishlistvoteParams"
  },
  {
    "name": "categories",
    "path": "query+categories",
    "group": "prop",
    "internal": false,
    "exportName": "QueryCategoriesParams"
  },
  {
    "name": "categoryinfo",
    "path": "query+categoryinfo",
    "group": "prop",
    "internal": false,
    "exportName": "QueryCategoryinfoParams"
  },
  {
    "name": "contributors",
    "path": "query+contributors",
    "group": "prop",
    "internal": false,
    "exportName": "QueryContributorsParams"
  },
  {
    "name": "deletedrevisions",
    "path": "query+deletedrevisions",
    "group": "prop",
    "internal": false,
    "exportName": "QueryDeletedrevisionsParams"
  },
  {
    "name": "duplicatefiles",
    "path": "query+duplicatefiles",
    "group": "prop",
    "internal": false,
    "exportName": "QueryDuplicatefilesParams"
  },
  {
    "name": "extlinks",
    "path": "query+extlinks",
    "group": "prop",
    "internal": false,
    "exportName": "QueryExtlinksParams"
  },
  {
    "name": "extracts",
    "path": "query+extracts",
    "group": "prop",
    "internal": false,
    "exportName": "QueryExtractsParams"
  },
  {
    "name": "fileusage",
    "path": "query+fileusage",
    "group": "prop",
    "internal": false,
    "exportName": "QueryFileusageParams"
  },
  {
    "name": "globalusage",
    "path": "query+globalusage",
    "group": "prop",
    "internal": false,
    "exportName": "QueryGlobalusageParams"
  },
  {
    "name": "imageinfo",
    "path": "query+imageinfo",
    "group": "prop",
    "internal": false,
    "exportName": "QueryImageinfoParams"
  },
  {
    "name": "images",
    "path": "query+images",
    "group": "prop",
    "internal": false,
    "exportName": "QueryImagesParams"
  },
  {
    "name": "info",
    "path": "query+info",
    "group": "prop",
    "internal": false,
    "exportName": "QueryInfoParams"
  },
  {
    "name": "iwlinks",
    "path": "query+iwlinks",
    "group": "prop",
    "internal": false,
    "exportName": "QueryIwlinksParams"
  },
  {
    "name": "langlinks",
    "path": "query+langlinks",
    "group": "prop",
    "internal": false,
    "exportName": "QueryLanglinksParams"
  },
  {
    "name": "links",
    "path": "query+links",
    "group": "prop",
    "internal": false,
    "exportName": "QueryLinksParams"
  },
  {
    "name": "linkshere",
    "path": "query+linkshere",
    "group": "prop",
    "internal": false,
    "exportName": "QueryLinkshereParams"
  },
  {
    "name": "mmcontent",
    "path": "query+mmcontent",
    "group": "prop",
    "internal": false,
    "exportName": "QueryMmcontentParams"
  },
  {
    "name": "pageimages",
    "path": "query+pageimages",
    "group": "prop",
    "internal": false,
    "exportName": "QueryPageimagesParams"
  },
  {
    "name": "pageprops",
    "path": "query+pageprops",
    "group": "prop",
    "internal": false,
    "exportName": "QueryPagepropsParams"
  },
  {
    "name": "pageterms",
    "path": "query+pageterms",
    "group": "prop",
    "internal": false,
    "exportName": "QueryPagetermsParams"
  },
  {
    "name": "pageviews",
    "path": "query+pageviews",
    "group": "prop",
    "internal": false,
    "exportName": "QueryPageviewsParams"
  },
  {
    "name": "redirects",
    "path": "query+redirects",
    "group": "prop",
    "internal": false,
    "exportName": "QueryRedirectsParams"
  },
  {
    "name": "revisions",
    "path": "query+revisions",
    "group": "prop",
    "internal": false,
    "exportName": "QueryRevisionsParams"
  },
  {
    "name": "stashimageinfo",
    "path": "query+stashimageinfo",
    "group": "prop",
    "internal": false,
    "exportName": "QueryStashimageinfoParams"
  },
  {
    "name": "templates",
    "path": "query+templates",
    "group": "prop",
    "internal": false,
    "exportName": "QueryTemplatesParams"
  },
  {
    "name": "transcludedin",
    "path": "query+transcludedin",
    "group": "prop",
    "internal": false,
    "exportName": "QueryTranscludedinParams"
  },
  {
    "name": "transcodestatus",
    "path": "query+transcodestatus",
    "group": "prop",
    "internal": false,
    "exportName": "QueryTranscodestatusParams"
  },
  {
    "name": "videoinfo",
    "path": "query+videoinfo",
    "group": "prop",
    "internal": false,
    "exportName": "QueryVideoinfoParams"
  },
  {
    "name": "wbentityusage",
    "path": "query+wbentityusage",
    "group": "prop",
    "internal": false,
    "exportName": "QueryWbentityusageParams"
  },
  {
    "name": "flowinfo",
    "path": "query+flowinfo",
    "group": "prop",
    "internal": false,
    "exportName": "QueryFlowinfoParams"
  },
  {
    "name": "cirrusbuilddoc",
    "path": "query+cirrusbuilddoc",
    "group": "prop",
    "internal": true,
    "exportName": "QueryCirrusbuilddocParams"
  },
  {
    "name": "cirruscompsuggestbuilddoc",
    "path": "query+cirruscompsuggestbuilddoc",
    "group": "prop",
    "internal": true,
    "exportName": "QueryCirruscompsuggestbuilddocParams"
  },
  {
    "name": "cirrusdoc",
    "path": "query+cirrusdoc",
    "group": "prop",
    "internal": true,
    "exportName": "QueryCirrusdocParams"
  },
  {
    "name": "description",
    "path": "query+description",
    "group": "prop",
    "internal": true,
    "exportName": "QueryDescriptionParams"
  },
  {
    "name": "mapdata",
    "path": "query+mapdata",
    "group": "prop",
    "internal": true,
    "exportName": "QueryMapdataParams"
  },
  {
    "name": "abusefilters",
    "path": "query+abusefilters",
    "group": "list",
    "internal": false,
    "exportName": "QueryAbusefiltersParams"
  },
  {
    "name": "abuselog",
    "path": "query+abuselog",
    "group": "list",
    "internal": false,
    "exportName": "QueryAbuselogParams"
  },
  {
    "name": "allcategories",
    "path": "query+allcategories",
    "group": "list",
    "internal": false,
    "exportName": "QueryAllcategoriesParams"
  },
  {
    "name": "alldeletedrevisions",
    "path": "query+alldeletedrevisions",
    "group": "list",
    "internal": false,
    "exportName": "QueryAlldeletedrevisionsParams"
  },
  {
    "name": "allfileusages",
    "path": "query+allfileusages",
    "group": "list",
    "internal": false,
    "exportName": "QueryAllfileusagesParams"
  },
  {
    "name": "allimages",
    "path": "query+allimages",
    "group": "list",
    "internal": false,
    "exportName": "QueryAllimagesParams"
  },
  {
    "name": "alllinks",
    "path": "query+alllinks",
    "group": "list",
    "internal": false,
    "exportName": "QueryAlllinksParams"
  },
  {
    "name": "allpages",
    "path": "query+allpages",
    "group": "list",
    "internal": false,
    "exportName": "QueryAllpagesParams"
  },
  {
    "name": "allredirects",
    "path": "query+allredirects",
    "group": "list",
    "internal": false,
    "exportName": "QueryAllredirectsParams"
  },
  {
    "name": "allrevisions",
    "path": "query+allrevisions",
    "group": "list",
    "internal": false,
    "exportName": "QueryAllrevisionsParams"
  },
  {
    "name": "alltransclusions",
    "path": "query+alltransclusions",
    "group": "list",
    "internal": false,
    "exportName": "QueryAlltransclusionsParams"
  },
  {
    "name": "allusers",
    "path": "query+allusers",
    "group": "list",
    "internal": false,
    "exportName": "QueryAllusersParams"
  },
  {
    "name": "backlinks",
    "path": "query+backlinks",
    "group": "list",
    "internal": false,
    "exportName": "QueryBacklinksParams"
  },
  {
    "name": "betafeatures",
    "path": "query+betafeatures",
    "group": "list",
    "internal": false,
    "exportName": "QueryBetafeaturesParams"
  },
  {
    "name": "blocks",
    "path": "query+blocks",
    "group": "list",
    "internal": false,
    "exportName": "QueryBlocksParams"
  },
  {
    "name": "categorymembers",
    "path": "query+categorymembers",
    "group": "list",
    "internal": false,
    "exportName": "QueryCategorymembersParams"
  },
  {
    "name": "centralnoticeactivecampaigns",
    "path": "query+centralnoticeactivecampaigns",
    "group": "list",
    "internal": false,
    "exportName": "QueryCentralnoticeactivecampaignsParams"
  },
  {
    "name": "centralnoticelogs",
    "path": "query+centralnoticelogs",
    "group": "list",
    "internal": false,
    "exportName": "QueryCentralnoticelogsParams"
  },
  {
    "name": "checkuserlog",
    "path": "query+checkuserlog",
    "group": "list",
    "internal": false,
    "exportName": "QueryCheckuserlogParams"
  },
  {
    "name": "codexicons",
    "path": "query+codexicons",
    "group": "list",
    "internal": false,
    "exportName": "QueryCodexiconsParams"
  },
  {
    "name": "communityrequests-wishes",
    "path": "query+communityrequests-wishes",
    "group": "list",
    "internal": false,
    "exportName": "QueryCommunityrequestsWishesParams"
  },
  {
    "name": "embeddedin",
    "path": "query+embeddedin",
    "group": "list",
    "internal": false,
    "exportName": "QueryEmbeddedinParams"
  },
  {
    "name": "extdistrepos",
    "path": "query+extdistrepos",
    "group": "list",
    "internal": false,
    "exportName": "QueryExtdistreposParams"
  },
  {
    "name": "exturlusage",
    "path": "query+exturlusage",
    "group": "list",
    "internal": false,
    "exportName": "QueryExturlusageParams"
  },
  {
    "name": "filearchive",
    "path": "query+filearchive",
    "group": "list",
    "internal": false,
    "exportName": "QueryFilearchiveParams"
  },
  {
    "name": "gadgetcategories",
    "path": "query+gadgetcategories",
    "group": "list",
    "internal": false,
    "exportName": "QueryGadgetcategoriesParams"
  },
  {
    "name": "gadgets",
    "path": "query+gadgets",
    "group": "list",
    "internal": false,
    "exportName": "QueryGadgetsParams"
  },
  {
    "name": "globalallusers",
    "path": "query+globalallusers",
    "group": "list",
    "internal": false,
    "exportName": "QueryGlobalallusersParams"
  },
  {
    "name": "globalblocks",
    "path": "query+globalblocks",
    "group": "list",
    "internal": false,
    "exportName": "QueryGlobalblocksParams"
  },
  {
    "name": "globalgroups",
    "path": "query+globalgroups",
    "group": "list",
    "internal": false,
    "exportName": "QueryGlobalgroupsParams"
  },
  {
    "name": "globalrenamequeue",
    "path": "query+globalrenamequeue",
    "group": "list",
    "internal": false,
    "exportName": "QueryGlobalrenamequeueParams"
  },
  {
    "name": "globalusers",
    "path": "query+globalusers",
    "group": "list",
    "internal": false,
    "exportName": "QueryGlobalusersParams"
  },
  {
    "name": "imageusage",
    "path": "query+imageusage",
    "group": "list",
    "internal": false,
    "exportName": "QueryImageusageParams"
  },
  {
    "name": "iwbacklinks",
    "path": "query+iwbacklinks",
    "group": "list",
    "internal": false,
    "exportName": "QueryIwbacklinksParams"
  },
  {
    "name": "langbacklinks",
    "path": "query+langbacklinks",
    "group": "list",
    "internal": false,
    "exportName": "QueryLangbacklinksParams"
  },
  {
    "name": "linterrors",
    "path": "query+linterrors",
    "group": "list",
    "internal": false,
    "exportName": "QueryLinterrorsParams"
  },
  {
    "name": "logevents",
    "path": "query+logevents",
    "group": "list",
    "internal": false,
    "exportName": "QueryLogeventsParams"
  },
  {
    "name": "messagecollection",
    "path": "query+messagecollection",
    "group": "list",
    "internal": false,
    "exportName": "QueryMessagecollectionParams"
  },
  {
    "name": "mostviewed",
    "path": "query+mostviewed",
    "group": "list",
    "internal": false,
    "exportName": "QueryMostviewedParams"
  },
  {
    "name": "mystashedfiles",
    "path": "query+mystashedfiles",
    "group": "list",
    "internal": false,
    "exportName": "QueryMystashedfilesParams"
  },
  {
    "name": "pagecollectionsmetadata",
    "path": "query+pagecollectionsmetadata",
    "group": "list",
    "internal": false,
    "exportName": "QueryPagecollectionsmetadataParams"
  },
  {
    "name": "pagepropnames",
    "path": "query+pagepropnames",
    "group": "list",
    "internal": false,
    "exportName": "QueryPagepropnamesParams"
  },
  {
    "name": "pageswithprop",
    "path": "query+pageswithprop",
    "group": "list",
    "internal": false,
    "exportName": "QueryPageswithpropParams"
  },
  {
    "name": "prefixsearch",
    "path": "query+prefixsearch",
    "group": "list",
    "internal": false,
    "exportName": "QueryPrefixsearchParams"
  },
  {
    "name": "protectedtitles",
    "path": "query+protectedtitles",
    "group": "list",
    "internal": false,
    "exportName": "QueryProtectedtitlesParams"
  },
  {
    "name": "querypage",
    "path": "query+querypage",
    "group": "list",
    "internal": false,
    "exportName": "QueryQuerypageParams"
  },
  {
    "name": "random",
    "path": "query+random",
    "group": "list",
    "internal": false,
    "exportName": "QueryRandomParams"
  },
  {
    "name": "recentchanges",
    "path": "query+recentchanges",
    "group": "list",
    "internal": false,
    "exportName": "QueryRecentchangesParams"
  },
  {
    "name": "search",
    "path": "query+search",
    "group": "list",
    "internal": false,
    "exportName": "QuerySearchParams"
  },
  {
    "name": "tags",
    "path": "query+tags",
    "group": "list",
    "internal": false,
    "exportName": "QueryTagsParams"
  },
  {
    "name": "threads",
    "path": "query+threads",
    "group": "list",
    "internal": false,
    "exportName": "QueryThreadsParams"
  },
  {
    "name": "trackingcategories",
    "path": "query+trackingcategories",
    "group": "list",
    "internal": false,
    "exportName": "QueryTrackingcategoriesParams"
  },
  {
    "name": "usercontribs",
    "path": "query+usercontribs",
    "group": "list",
    "internal": false,
    "exportName": "QueryUsercontribsParams"
  },
  {
    "name": "users",
    "path": "query+users",
    "group": "list",
    "internal": false,
    "exportName": "QueryUsersParams"
  },
  {
    "name": "watchlist",
    "path": "query+watchlist",
    "group": "list",
    "internal": false,
    "exportName": "QueryWatchlistParams"
  },
  {
    "name": "watchlistraw",
    "path": "query+watchlistraw",
    "group": "list",
    "internal": false,
    "exportName": "QueryWatchlistrawParams"
  },
  {
    "name": "wblistentityusage",
    "path": "query+wblistentityusage",
    "group": "list",
    "internal": false,
    "exportName": "QueryWblistentityusageParams"
  },
  {
    "name": "wikisets",
    "path": "query+wikisets",
    "group": "list",
    "internal": false,
    "exportName": "QueryWikisetsParams"
  },
  {
    "name": "checkuser",
    "path": "query+checkuser",
    "group": "list",
    "internal": false,
    "exportName": "QueryCheckuserParams"
  },
  {
    "name": "deletedrevs",
    "path": "query+deletedrevs",
    "group": "list",
    "internal": false,
    "exportName": "QueryDeletedrevsParams"
  },
  {
    "name": "extdistbranches",
    "path": "query+extdistbranches",
    "group": "list",
    "internal": true,
    "exportName": "QueryExtdistbranchesParams"
  },
  {
    "name": "messagegroupsubscription",
    "path": "query+messagegroupsubscription",
    "group": "list",
    "internal": true,
    "exportName": "QueryMessagegroupsubscriptionParams"
  },
  {
    "name": "readinglistentries",
    "path": "query+readinglistentries",
    "group": "list",
    "internal": true,
    "exportName": "QueryReadinglistentriesParams"
  },
  {
    "name": "allmessages",
    "path": "query+allmessages",
    "group": "meta",
    "internal": false,
    "exportName": "QueryAllmessagesParams"
  },
  {
    "name": "authmanagerinfo",
    "path": "query+authmanagerinfo",
    "group": "meta",
    "internal": false,
    "exportName": "QueryAuthmanagerinfoParams"
  },
  {
    "name": "babel",
    "path": "query+babel",
    "group": "meta",
    "internal": false,
    "exportName": "QueryBabelParams"
  },
  {
    "name": "communityconfiguration",
    "path": "query+communityconfiguration",
    "group": "meta",
    "internal": false,
    "exportName": "QueryCommunityconfigurationParams"
  },
  {
    "name": "featureusage",
    "path": "query+featureusage",
    "group": "meta",
    "internal": false,
    "exportName": "QueryFeatureusageParams"
  },
  {
    "name": "filerepoinfo",
    "path": "query+filerepoinfo",
    "group": "meta",
    "internal": false,
    "exportName": "QueryFilerepoinfoParams"
  },
  {
    "name": "globalpreferences",
    "path": "query+globalpreferences",
    "group": "meta",
    "internal": false,
    "exportName": "QueryGlobalpreferencesParams"
  },
  {
    "name": "globalrenamestatus",
    "path": "query+globalrenamestatus",
    "group": "meta",
    "internal": false,
    "exportName": "QueryGlobalrenamestatusParams"
  },
  {
    "name": "globaluserinfo",
    "path": "query+globaluserinfo",
    "group": "meta",
    "internal": false,
    "exportName": "QueryGlobaluserinfoParams"
  },
  {
    "name": "languageinfo",
    "path": "query+languageinfo",
    "group": "meta",
    "internal": false,
    "exportName": "QueryLanguageinfoParams"
  },
  {
    "name": "languagestats",
    "path": "query+languagestats",
    "group": "meta",
    "internal": false,
    "exportName": "QueryLanguagestatsParams"
  },
  {
    "name": "linterstats",
    "path": "query+linterstats",
    "group": "meta",
    "internal": false,
    "exportName": "QueryLinterstatsParams"
  },
  {
    "name": "managemessagegroups",
    "path": "query+managemessagegroups",
    "group": "meta",
    "internal": false,
    "exportName": "QueryManagemessagegroupsParams"
  },
  {
    "name": "messagegroups",
    "path": "query+messagegroups",
    "group": "meta",
    "internal": false,
    "exportName": "QueryMessagegroupsParams"
  },
  {
    "name": "messagegroupstats",
    "path": "query+messagegroupstats",
    "group": "meta",
    "internal": false,
    "exportName": "QueryMessagegroupstatsParams"
  },
  {
    "name": "messagetranslations",
    "path": "query+messagetranslations",
    "group": "meta",
    "internal": false,
    "exportName": "QueryMessagetranslationsParams"
  },
  {
    "name": "notifications",
    "path": "query+notifications",
    "group": "meta",
    "internal": false,
    "exportName": "QueryNotificationsParams"
  },
  {
    "name": "siteinfo",
    "path": "query+siteinfo",
    "group": "meta",
    "internal": false,
    "exportName": "QuerySiteinfoParams"
  },
  {
    "name": "siteviews",
    "path": "query+siteviews",
    "group": "meta",
    "internal": false,
    "exportName": "QuerySiteviewsParams"
  },
  {
    "name": "tokens",
    "path": "query+tokens",
    "group": "meta",
    "internal": false,
    "exportName": "QueryTokensParams"
  },
  {
    "name": "unreadnotificationpages",
    "path": "query+unreadnotificationpages",
    "group": "meta",
    "internal": false,
    "exportName": "QueryUnreadnotificationpagesParams"
  },
  {
    "name": "userinfo",
    "path": "query+userinfo",
    "group": "meta",
    "internal": false,
    "exportName": "QueryUserinfoParams"
  },
  {
    "name": "wikibase",
    "path": "query+wikibase",
    "group": "meta",
    "internal": false,
    "exportName": "QueryWikibaseParams"
  },
  {
    "name": "checkuserformattedblockinfo",
    "path": "query+checkuserformattedblockinfo",
    "group": "meta",
    "internal": true,
    "exportName": "QueryCheckuserformattedblockinfoParams"
  },
  {
    "name": "readinglists",
    "path": "query+readinglists",
    "group": "meta",
    "internal": true,
    "exportName": "QueryReadinglistsParams"
  }
];
