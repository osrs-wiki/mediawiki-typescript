import { mapParamType } from "./mapParamType";
import { toPascalCase } from "./naming";
import { ParamInfoModule, ParamInfoParameter } from "./paraminfo.types";

/** Result of {@link emitModuleFile}: the file to write plus what it exports, for the manifest. */
export type EmittedModuleFile = {
  /** File name (relative to the output directory) the module should be written to. */
  fileName: string;
  /** Name of the exported `*Params` interface, referenced by the generated manifest. */
  exportName: string;
  /** Full generated TypeScript source for the module. */
  content: string;
};

/**
 * Renders a TS identifier for a parameter name, quoting it if it isn't already a valid
 * identifier (MediaWiki occasionally uses names that collide with reserved words, e.g. "default").
 * @param name The raw paraminfo parameter name.
 */
const toFieldName = (name: string): string => (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name));

/**
 * Renders a single interface field line (with an inline default-value doc comment, if any) for
 * one paraminfo parameter.
 * @param param The parameter definition to render.
 */
const emitParameterField = (param: ParamInfoParameter): string => {
  const tsType = mapParamType(param);
  const optional = param.required ? "" : "?";
  const comment = param.default !== undefined ? ` /** Default: \`${JSON.stringify(param.default)}\`. */` : "";
  return `  ${toFieldName(param.name)}${optional}: ${tsType};${comment}`;
};

/**
 * Emits the generated TypeScript source for a single paraminfo module: a fully-typed
 * `*Params` interface, one field per parameter. Query submodules (`prop`/`list`/`meta`/`generator`)
 * intentionally get params-only output here — composing them into an `action=query` call requires
 * knowing the module's parameter prefix and how multiple submodules combine in one request, which
 * is handled by hand-authored `action/core/query/*` modules instead.
 * @param module The module definition to emit, as returned by `action=paraminfo`.
 */
export const emitModuleFile = (module: ParamInfoModule): EmittedModuleFile => {
  const pascalName = toPascalCase(module.path);
  const exportName = `${pascalName}Params`;
  const fields = (module.parameters ?? []).map(emitParameterField).join("\n");
  // A module with no parameters is emitted as an empty-object type alias rather than an empty
  // interface, since `interface Foo {}` allows any non-nullish value and trips `no-empty-object-type`.
  const body = fields
    ? [`export interface ${exportName} {`, fields, "}"]
    : [`export type ${exportName} = Record<string, never>;`];

  const content = [
    "/**",
    ` * Generated from \`action=paraminfo&modules=${module.path}\`. Do not edit by hand \u2014 see`,
    " * packages/api/codegen/generate.ts to regenerate.",
    " */",
    "",
    `/** Typed request parameters for the \`${module.path}\` module (group: ${module.group ?? "unknown"}). */`,
    ...body,
    "",
  ].join("\n");

  return { fileName: `${pascalName}.ts`, exportName, content };
};
