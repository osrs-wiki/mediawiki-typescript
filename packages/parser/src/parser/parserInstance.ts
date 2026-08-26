import { WikitextParser } from "./WikitextParser";

/** Chevrotain requires a single shared parser instance (grammar analysis runs once at construction). */
export const wikitextParser = new WikitextParser();
