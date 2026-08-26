/** HTML-like tags whose content must never be interpreted as wikitext (mirrors MediaWiki's strip markers). */
export const OPAQUE_TAG_NAMES = ["nowiki", "pre", "ref", "math", "syntaxhighlight", "source"];

/** Parser/magic-word-style function names that use `{{name:arg}}` syntax without a leading `#`. */
export const BARE_PARSER_FUNCTION_NAMES = [
  "lc",
  "uc",
  "lcfirst",
  "ucfirst",
  "urlencode",
  "anchorencode",
];
