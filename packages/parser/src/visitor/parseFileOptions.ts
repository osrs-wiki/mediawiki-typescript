import { FileHorizontalAlignment, FileVerticalAlignment, MediaWikiFileOptions } from "@mediawiki-typescript/builder";

const HORIZONTAL_ALIGNMENTS: FileHorizontalAlignment[] = ["left", "right", "center", "none"];
const VERTICAL_ALIGNMENTS: FileVerticalAlignment[] = [
  "baseline",
  "sub",
  "super",
  "top",
  "text-top",
  "middle",
  "bottom",
  "text-bottom",
];
const FORMATS = ["frameless", "frame", "framed", "thumb", "thumbnail"] as const;

const RESIZING_BOTH_PATTERN = /^(\d+)\s*x\s*(\d+)\s*px$/i;
const RESIZING_WIDTH_PATTERN = /^(\d+)\s*px$/i;
const RESIZING_HEIGHT_PATTERN = /^x\s*(\d+)\s*px$/i;
const UPRIGHT_PATTERN = /^upright(?:[ =](.*))?$/i;
const KEY_VALUE_PATTERN = /^(link|alt|page|thumbtime|start|lossy|class|lang)=(.*)$/i;

/**
 * Parses `[[File:name|opt1|opt2|...]]` pipe-separated options into `MediaWikiFileOptions`,
 * per the full option grammar documented on Help:Images. Each option is classified independently
 * of position (matching real MediaWiki file syntax), with any single unrecognized segment treated
 * as the caption — if more than one is present, the last one wins (per Help:Images).
 */
export const parseFileOptions = (segments: string[]): MediaWikiFileOptions | undefined => {
  const options: MediaWikiFileOptions = {};
  segments.forEach((rawSegment) => {
    const segment = rawSegment.trim();
    if (segment === "border") {
      options.border = true;
      return;
    }
    if (segment === "muted") {
      options.muted = true;
      return;
    }
    if (segment === "loop") {
      options.loop = true;
      return;
    }
    if ((FORMATS as readonly string[]).includes(segment)) {
      options.format = segment as (typeof FORMATS)[number];
      return;
    }
    if (HORIZONTAL_ALIGNMENTS.includes(segment as FileHorizontalAlignment)) {
      options.horizontalAlignment = segment as FileHorizontalAlignment;
      return;
    }
    if (VERTICAL_ALIGNMENTS.includes(segment as FileVerticalAlignment)) {
      options.verticalAlignment = segment as FileVerticalAlignment;
      return;
    }
    const uprightMatch = UPRIGHT_PATTERN.exec(segment);
    if (uprightMatch) {
      options.resizing = {
        ...options.resizing,
        upright: uprightMatch[1] ? Number(uprightMatch[1]) : true,
      };
      return;
    }
    const bothMatch = RESIZING_BOTH_PATTERN.exec(segment);
    if (bothMatch) {
      options.resizing = { width: Number(bothMatch[1]), height: Number(bothMatch[2]) };
      return;
    }
    const heightMatch = RESIZING_HEIGHT_PATTERN.exec(segment);
    if (heightMatch) {
      options.resizing = { ...options.resizing, height: Number(heightMatch[1]) };
      return;
    }
    const widthMatch = RESIZING_WIDTH_PATTERN.exec(segment);
    if (widthMatch) {
      options.resizing = { ...options.resizing, width: Number(widthMatch[1]) };
      return;
    }
    const keyValueMatch = KEY_VALUE_PATTERN.exec(segment);
    if (keyValueMatch) {
      const key = keyValueMatch[1].toLowerCase();
      const value = keyValueMatch[2];
      switch (key) {
        case "link":
          options.link = value;
          break;
        case "alt":
          options.alt = value;
          break;
        case "page":
          options.page = Number(value);
          break;
        case "thumbtime":
          options.thumbtime = value;
          break;
        case "start":
          options.start = value;
          break;
        case "lossy":
          options.lossy = value.toLowerCase() !== "false";
          break;
        case "class":
          options.class = value;
          break;
        case "lang":
          options.lang = value;
          break;
      }
      return;
    }
    options.caption = segment;
  });
  return Object.keys(options).length > 0 ? options : undefined;
};
