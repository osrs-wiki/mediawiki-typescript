/**
 * @mediawiki-typescript/api
 *
 * A typed client for the MediaWiki Action API and REST API. See docs/plans/api/plan.md for the
 * phased implementation plan. This barrel exposes the client/auth/versioning/content-bridge
 * foundation plus the curated `action/core` Action API modules, the `ActionApiClient` facade,
 * the curated `rest` REST API modules, and the `RestApiClient` facade; generated per-module
 * param types (`action/generated/*`) are not re-exported here to avoid namespace bloat — import
 * them from their specific paths.
 */
export * from "./client";
export * from "./auth";
export * from "./versioning";
export * from "./content";
export * from "./errors";
export * from "./action";
export * from "./rest";
