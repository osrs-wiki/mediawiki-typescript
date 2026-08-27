/**
 * Generated from `action=paraminfo&modules=communityconfigurationedit`. Do not edit by hand — see
 * packages/api/codegen/generate.ts to regenerate.
 */

/** Typed request parameters for the `communityconfigurationedit` module (group: action). */
export interface CommunityconfigurationeditParams {
  provider: "Babel" | "BlockedDomain" | "CampaignEvents" | "TemplateData-FeaturedTemplates";
  content: string;
  summary?: string; /** Default: `""`. */
  token: string;
}
