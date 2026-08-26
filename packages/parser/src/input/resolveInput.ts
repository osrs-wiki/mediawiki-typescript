export type WikitextInput = string | { filePath: string } | NodeJS.ReadableStream | URL;

const streamToString = (stream: NodeJS.ReadableStream): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", reject);
  });

const isReadableStream = (input: WikitextInput): input is NodeJS.ReadableStream =>
  typeof input === "object" &&
  input !== null &&
  !(input instanceof URL) &&
  !("filePath" in input) &&
  typeof (input as NodeJS.ReadableStream).on === "function";

/**
 * Resolves any supported wikitext input source down to a raw string.
 *
 * URL input is a plain HTTP(S) GET of raw text content — it does NOT know how to call the
 * MediaWiki Action API (`action=raw`/`action=parse`) to fetch wikitext by page title. Callers
 * needing that should construct the appropriate `action=raw` URL themselves.
 */
export const resolveInput = async (input: WikitextInput): Promise<string> => {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof URL) {
    const response = await fetch(input);
    return response.text();
  }
  if (isReadableStream(input)) {
    return streamToString(input);
  }
  const { readFile } = await import("fs/promises");
  return readFile(input.filePath, "utf-8");
};
