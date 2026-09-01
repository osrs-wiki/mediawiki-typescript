/** A single parameter definition as returned by `action=paraminfo`. */
export type ParamInfoParameter = {
  /** Parameter name, as passed on the wire (e.g. "titles", "prop"). */
  name: string;
  /** Either a primitive type name (e.g. "string", "boolean") or an explicit list of allowed values. */
  type?: string | string[];
  /** Whether the parameter must be supplied. */
  required?: boolean;
  /** Whether the parameter accepts multiple pipe-separated values. */
  multi?: boolean;
  /** The parameter's default value, if any. */
  default?: unknown;
};

/** A single module definition as returned by `action=paraminfo`. */
export type ParamInfoModule = {
  /** The module's bare name, e.g. "revisions" for the `query+revisions` submodule. */
  name: string;
  /** Full paraminfo module path, e.g. "query+revisions" or "edit". */
  path: string;
  /** Submodule group ("action", "prop", "list", "meta", "generator"), when applicable. */
  group?: string;
  /** Whether MediaWiki marks this module internal-use-only. */
  internal?: boolean;
  /** This module's own parameters. */
  parameters: ParamInfoParameter[];
};

/** Shape of the `action=paraminfo&format=json&formatversion=2` response envelope. */
export type ParamInfoResponse = {
  paraminfo: {
    modules: ParamInfoModule[];
  };
};
