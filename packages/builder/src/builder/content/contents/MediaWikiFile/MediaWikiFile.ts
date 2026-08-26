import { MediaWikiFileOptions } from "./MediaWikiFile.types";
import MediaWikiContent from "../../MediaWikiContent";
import { buildContents } from "../../MediaWikiContent.utils";

export class MediaWikiFile extends MediaWikiContent {
  fileName: string;
  options?: MediaWikiFileOptions;

  constructor(fileName: string, options?: MediaWikiFileOptions) {
    super();
    this.fileName = fileName;
    this.options = options;
  }

  build() {
    const options: string[] = [];
    const {
      border,
      caption,
      format,
      resizing,
      horizontalAlignment,
      verticalAlignment,
      link,
      alt,
      page,
      thumbtime,
      start,
      muted,
      loop,
      lossy,
      class: className,
      lang,
    } = this.options ?? {};

    if (border) {
      options.push("border");
    }
    if (format) {
      options.push(format);
    }
    if (resizing?.upright !== undefined) {
      options.push(resizing.upright === true ? "upright" : `upright=${resizing.upright}`);
    } else if (resizing?.width && resizing?.height) {
      options.push(`${resizing.width}x${resizing.height}px`);
    } else if (resizing?.width) {
      options.push(`${resizing.width}px`);
    } else if (resizing?.height) {
      options.push(`x${resizing.height}px`);
    }
    if (horizontalAlignment) {
      options.push(horizontalAlignment);
    }
    if (verticalAlignment) {
      options.push(verticalAlignment);
    }
    if (link !== undefined) {
      options.push(`link=${link}`);
    }
    if (alt !== undefined) {
      options.push(`alt=${alt}`);
    }
    if (page !== undefined) {
      options.push(`page=${page}`);
    }
    if (thumbtime !== undefined) {
      options.push(`thumbtime=${thumbtime}`);
    }
    if (start !== undefined) {
      options.push(`start=${start}`);
    }
    if (muted) {
      options.push("muted");
    }
    if (loop) {
      options.push("loop");
    }
    if (lossy !== undefined) {
      options.push(`lossy=${lossy}`);
    }
    if (className) {
      options.push(`class=${className}`);
    }
    if (lang) {
      options.push(`lang=${lang}`);
    }
    if (caption) {
      options.push(buildContents(caption));
    }

    return `[[File:${this.fileName}${options.map((option) => `|${option}`).join("")}]]`;
  }
}
