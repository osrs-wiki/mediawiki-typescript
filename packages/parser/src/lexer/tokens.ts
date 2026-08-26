import { createToken } from "chevrotain";
import { OPAQUE_TAG_NAMES } from "../constants";

const OPAQUE_TAG_PATTERN = new RegExp(`^<(${OPAQUE_TAG_NAMES.join("|")})\\b[^>]*>`, "i");

/** Matches an entire opaque tag (e.g. `<nowiki>...</nowiki>`) as a single raw token; its contents are never wikitext-parsed. */
export const OpaqueTag = createToken({
  name: "OpaqueTag",
  pattern: (text: string, startOffset: number) => {
    const remaining = text.slice(startOffset);
    const openMatch = OPAQUE_TAG_PATTERN.exec(remaining);
    if (!openMatch) {
      return null;
    }
    const tagName = openMatch[1].toLowerCase();
    const closeTag = `</${tagName}>`;
    const closeIndex = text.toLowerCase().indexOf(closeTag, startOffset + openMatch[0].length);
    const end = closeIndex === -1 ? text.length : closeIndex + closeTag.length;
    const full = text.slice(startOffset, end);
    const match = [full] as unknown as RegExpExecArray;
    match.index = startOffset;
    match.input = text;
    return match;
  },
  line_breaks: true,
  start_chars_hint: ["<"],
});

/** Matches an entire HTML comment (`<!-- ... -->`) as a single raw token. */
export const Comment = createToken({
  name: "Comment",
  pattern: (text: string, startOffset: number) => {
    if (!text.startsWith("<!--", startOffset)) {
      return null;
    }
    const closeIndex = text.indexOf("-->", startOffset + 4);
    const end = closeIndex === -1 ? text.length : closeIndex + 3;
    const full = text.slice(startOffset, end);
    const match = [full] as unknown as RegExpExecArray;
    match.index = startOffset;
    match.input = text;
    return match;
  },
  line_breaks: true,
  start_chars_hint: ["<"],
});

/** Matches an entire `{{{...}}}` template-parameter placeholder as a single raw token (passed through as plain text). */
export const TripleBrace = createToken({
  name: "TripleBrace",
  pattern: (text: string, startOffset: number) => {
    if (!text.startsWith("{{{", startOffset)) {
      return null;
    }
    const closeIndex = text.indexOf("}}}", startOffset + 3);
    const end = closeIndex === -1 ? text.length : closeIndex + 3;
    const full = text.slice(startOffset, end);
    const match = [full] as unknown as RegExpExecArray;
    match.index = startOffset;
    match.input = text;
    return match;
  },
  line_breaks: true,
  start_chars_hint: ["{"],
});

export const TemplateOpen = createToken({ name: "TemplateOpen", pattern: /\{\{/ });
export const TemplateClose = createToken({ name: "TemplateClose", pattern: /\}\}/ });
export const LinkOpen = createToken({ name: "LinkOpen", pattern: /\[\[/ });
export const LinkClose = createToken({ name: "LinkClose", pattern: /\]\]/ });
export const ExtLinkOpen = createToken({ name: "ExtLinkOpen", pattern: /\[/ });
export const ExtLinkClose = createToken({ name: "ExtLinkClose", pattern: /\]/ });
export const Pipe = createToken({ name: "Pipe", pattern: /\|/ });

/** A run of 2+ apostrophes; bold/italic resolution happens later via MediaWiki's counting algorithm, not here. */
export const Apostrophes = createToken({ name: "Apostrophes", pattern: /'{2,}/ });

export const TagClose = createToken({ name: "TagClose", pattern: /<\/[a-zA-Z][\w-]*\s*>/ });
export const TagOpen = createToken({ name: "TagOpen", pattern: /<[a-zA-Z][\w-]*(\s+[^<>]*)?\/?>/ });

/** A greedy run of characters with no special meaning to the inline grammar. */
export const PlainText = createToken({ name: "PlainText", pattern: /[^{}[\]|'<]+/, line_breaks: true });

/** Absolute fallback: a single otherwise-unmatched character (e.g. a lone brace/bracket/apostrophe/`<`). */
export const AnyChar = createToken({ name: "AnyChar", pattern: /[\s\S]/, line_breaks: true });

export const allTokens = [
  TripleBrace,
  Comment,
  OpaqueTag,
  TemplateOpen,
  TemplateClose,
  LinkOpen,
  LinkClose,
  ExtLinkOpen,
  ExtLinkClose,
  Pipe,
  Apostrophes,
  TagClose,
  TagOpen,
  PlainText,
  AnyChar,
];
