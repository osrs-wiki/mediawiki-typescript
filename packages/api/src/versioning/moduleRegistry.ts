/** Per-module version constraint, populated incrementally as version-specific quirks are discovered. */
export type ModuleVersionOverride = {
  /** Minimum MediaWiki version (as in `generator`, e.g. "1.35") the module is available from. */
  minVersion?: string;
  /** Human-readable note about the constraint, surfaced in warnings. */
  note?: string;
};

/**
 * Known module availability quirks across MediaWiki versions. Intentionally starts empty —
 * generated/core modules assume "latest" by default; entries are added here only once a real
 * incompatibility is hit against an older wiki, rather than pre-populating speculative history.
 */
const KNOWN_MODULE_OVERRIDES: Record<string, ModuleVersionOverride> = {};

/**
 * Looks up a known version constraint for an Action/REST API module.
 * @param moduleName The module name as it appears in `action=`/`list=`/`prop=`/etc.
 * @returns The override, or `undefined` if no constraint is recorded for that module.
 */
export const getModuleOverride = (moduleName: string): ModuleVersionOverride | undefined =>
  KNOWN_MODULE_OVERRIDES[moduleName];
