/**
 * Generated from `action=paraminfo&modules=query+siteinfo`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `query+siteinfo` module (group: meta). */
export interface QuerySiteinfoParams {
  prop?: ("autocreatetempuser" | "autopromote" | "autopromoteonce" | "clientlibraries" | "copyuploaddomains" | "crosssiteajaxdomains" | "dbrepllag" | "defaultoptions" | "doubleunderscores" | "extensions" | "extensiontags" | "fileextensions" | "functionhooks" | "general" | "interwikimap" | "languages" | "languagevariants" | "libraries" | "magicwords" | "namespacealiases" | "namespaces" | "protocols" | "restrictions" | "rightsinfo" | "sbom" | "showhooks" | "skins" | "specialpagealiases" | "statistics" | "uploaddialog" | "usergroups" | "variables")[] | ("autocreatetempuser" | "autopromote" | "autopromoteonce" | "clientlibraries" | "copyuploaddomains" | "crosssiteajaxdomains" | "dbrepllag" | "defaultoptions" | "doubleunderscores" | "extensions" | "extensiontags" | "fileextensions" | "functionhooks" | "general" | "interwikimap" | "languages" | "languagevariants" | "libraries" | "magicwords" | "namespacealiases" | "namespaces" | "protocols" | "restrictions" | "rightsinfo" | "sbom" | "showhooks" | "skins" | "specialpagealiases" | "statistics" | "uploaddialog" | "usergroups" | "variables"); /** Default: `"general"`. */
  filteriw?: "!local" | "local";
  showalldb?: boolean;
  numberingroup?: boolean;
  inlanguagecode?: string;
}
