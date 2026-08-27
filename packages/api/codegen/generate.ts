import { mkdir, writeFile } from "fs/promises";
import path from "node:path";
import axios from "axios";
import { emitModuleFile } from "./emitModule";
import { ParamInfoModule, ParamInfoResponse } from "./paraminfo.types";

/** Parsed `--wiki`/`--out` CLI options for {@link main}. */
type CliOptions = {
  /** Base wiki URL to crawl `action=paraminfo` against, e.g. "https://www.mediawiki.org". */
  wiki: string;
  /** Output directory to write generated module files + manifest.ts into. */
  out: string;
};

/**
 * A single row of the generated `manifest.ts`, summarizing one discovered module for
 * `versioning/moduleRegistry.ts` to consume.
 */
type ManifestEntry = {
  name: string;
  path: string;
  group?: string;
  internal: boolean;
  exportName: string;
};

/**
 * Parses `--wiki <url>`/`--out <dir>` flags from argv, defaulting to mediawiki.org and
 * `src/action/generated`.
 * @param argv `process.argv.slice(2)`.
 */
const parseArgs = (argv: string[]): CliOptions => {
  let wiki = "https://www.mediawiki.org";
  let out = path.join(__dirname, "../src/action/generated");
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--wiki") {
      wiki = argv[i + 1];
    }
    if (argv[i] === "--out") {
      out = path.isAbsolute(argv[i + 1]) ? argv[i + 1] : path.resolve(process.cwd(), argv[i + 1]);
    }
  }
  return { wiki, out };
};

/**
 * Splits `items` into chunks of at most `size`, to keep each `action=paraminfo` request within
 * MediaWiki's reasonable multi-value parameter limits.
 * @param items The array to split.
 * @param size Maximum chunk size.
 */
const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

/**
 * Fetches full `paraminfo` definitions for the given module paths in one request.
 * @param apiUrl The wiki's `api.php` endpoint.
 * @param modules Module paths/names to request, e.g. `["edit", "query+info"]`.
 */
const fetchParamInfo = async (apiUrl: string, modules: string[]): Promise<ParamInfoModule[]> => {
  const response = await axios.get<ParamInfoResponse>(apiUrl, {
    params: { action: "paraminfo", modules: modules.join("|"), format: "json", formatversion: "2" },
    // Wikimedia wikis reject anonymous/no-user-agent requests per their robot policy (T400119).
    headers: { "User-Agent": "mediawiki-typescript-api-codegen/0.0.0 (https://github.com/osrs-wiki/mediawiki-typescript)" },
  });
  return response.data.paraminfo.modules;
};

/**
 * Discovers every Action API module path: all top-level `action=` values, plus every `query`
 * `prop`/`list`/`meta`/`generator` submodule (as `query+<name>`). Some modules (e.g. `categories`,
 * `revisions`) are usable as both a plain prop/list AND a generator, so the raw crawl can list
 * the same `query+<name>` path twice — deduplicated before returning.
 * @param apiUrl The wiki's `api.php` endpoint.
 */
const discoverModulePaths = async (apiUrl: string): Promise<string[]> => {
  const [mainModule] = await fetchParamInfo(apiUrl, ["main"]);
  const actionParam = mainModule.parameters.find((param) => param.name === "action");
  const actionNames = Array.isArray(actionParam?.type) ? (actionParam.type as string[]) : [];

  const [queryModule] = await fetchParamInfo(apiUrl, ["query"]);
  const queryPaths = (["prop", "list", "meta", "generator"] as const).flatMap((group) => {
    const param = queryModule.parameters.find((p) => p.name === group);
    const values = Array.isArray(param?.type) ? (param.type as string[]) : [];
    return values.map((value) => `query+${value}`);
  });

  return [...new Set([...actionNames, ...queryPaths])];
};

/**
 * Renders the generated `manifest.ts` source, listing every discovered module for
 * `versioning/moduleRegistry.ts` and the Phase 2 coverage-guardrail test to consume.
 * @param apiUrl The wiki `action=paraminfo` was crawled against.
 * @param entries One {@link ManifestEntry} per generated module.
 */
const renderManifest = (apiUrl: string, entries: ManifestEntry[]): string =>
  [
    "/**",
    ` * Generated from ${apiUrl} (\`action=paraminfo\`). Do not edit by hand \u2014 see`,
    " * packages/api/codegen/generate.ts to regenerate.",
    " */",
    "",
    "/** One entry per generated Action API module. */",
    "export type GeneratedModuleManifestEntry = {",
    '  /** The module\'s bare name, e.g. "revisions" for query+revisions. */',
    "  name: string;",
    '  /** Full paraminfo module path, e.g. "query+revisions". */',
    "  path: string;",
    '  /** Submodule group ("action", "prop", "list", "meta", "generator"), if applicable. */',
    "  group?: string;",
    "  /** Whether MediaWiki marks this module internal-use-only. */",
    "  internal: boolean;",
    "  /** Name of the generated `*Params` interface for this module. */",
    "  exportName: string;",
    "};",
    "",
    "/** The wiki `action=paraminfo` was crawled against to produce this manifest. */",
    `export const referenceWiki = ${JSON.stringify(apiUrl)};`,
    "",
    "/** Every Action API module discovered via paraminfo when this manifest was generated. */",
    `export const generatedModuleManifest: GeneratedModuleManifestEntry[] = ${JSON.stringify(entries, null, 2)};`,
    "",
  ].join("\n");

/** Entry point: crawls `action=paraminfo` and writes generated module files + `manifest.ts`. */
const main = async (): Promise<void> => {
  const { wiki, out } = parseArgs(process.argv.slice(2));
  const apiUrl = `${wiki.replace(/\/+$/, "")}/w/api.php`;

  console.log(`Discovering Action API modules from ${apiUrl} ...`);
  const modulePaths = await discoverModulePaths(apiUrl);

  console.log(`Fetching full parameter schemas for ${modulePaths.length} modules ...`);
  const modules: ParamInfoModule[] = [];
  for (const batch of chunk(modulePaths, 50)) {
    modules.push(...(await fetchParamInfo(apiUrl, batch)));
  }

  await mkdir(out, { recursive: true });
  const manifestEntries: ManifestEntry[] = [];
  for (const module of modules) {
    const emitted = emitModuleFile(module);
    await writeFile(path.join(out, emitted.fileName), emitted.content, "utf-8");
    manifestEntries.push({
      name: module.name,
      path: module.path,
      group: module.group,
      internal: module.internal ?? false,
      exportName: emitted.exportName,
    });
  }

  await writeFile(path.join(out, "manifest.ts"), renderManifest(apiUrl, manifestEntries), "utf-8");
  console.log(`Wrote ${modules.length} module files + manifest.ts to ${out}`);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
