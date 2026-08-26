import { MediaWikiContent } from "@mediawiki-typescript/builder";

/** An unresolved piece of inline content, produced while walking the CST, before quote resolution. */
export type Piece =
  | { kind: "text"; value: string }
  | { kind: "content"; value: MediaWikiContent }
  | { kind: "quote"; count: number };
