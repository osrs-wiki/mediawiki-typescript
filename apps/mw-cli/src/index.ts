#!/usr/bin/env node
import { MediaWikiClient, MediaWikiClientRegistry, RestApiClient } from "@mediawiki-typescript/api";

const registry = new MediaWikiClientRegistry();

/** Prints usage for the single command this CLI currently supports. */
const printUsage = (): void => {
  console.log("Usage: mw-cli page get <title> --wiki <baseUrl>");
};

/** Parses `--wiki <url>` out of a flag/positional argv slice. */
const parseWikiFlag = (args: string[]): string | undefined => {
  const wikiIndex = args.indexOf("--wiki");
  return wikiIndex >= 0 ? args[wikiIndex + 1] : undefined;
};

const main = async (): Promise<void> => {
  const [command, subcommand, ...rest] = process.argv.slice(2);
  const baseUrl = parseWikiFlag(rest);
  const title = rest.find((arg) => !arg.startsWith("--") && arg !== baseUrl);

  if (command !== "page" || subcommand !== "get" || !title || !baseUrl) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  registry.register("current", new MediaWikiClient({ baseUrl }));
  const restApi = new RestApiClient(registry.current);
  const page = await restApi.page.getSource(title);
  console.log(page.source);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
