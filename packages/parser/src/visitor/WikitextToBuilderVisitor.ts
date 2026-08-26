import { CstNode, IToken } from "chevrotain";
import { orderedChildren } from "./orderedChildren";
import { parseFileOptions } from "./parseFileOptions";
import { parseGallery } from "./parseGallery";
import { Piece } from "./Piece";
import { resolveQuotes, segmentToString } from "./resolveQuotes";
import { parseAttributes } from "../attributes";
import { BARE_PARSER_FUNCTION_NAMES } from "../constants";
import { wikitextParser } from "../parser/parserInstance";
import {
  MediaWikiCategory,
  MediaWikiComment,
  MediaWikiDefaultSort,
  MediaWikiExternalLink,
  MediaWikiFile,
  MediaWikiHTML,
  MediaWikiIncludeOnly,
  MediaWikiLink,
  MediaWikiNoInclude,
  MediaWikiOnlyInclude,
  MediaWikiParserFunction,
  MediaWikiReference,
  MediaWikiTemplate,
  MediaWikiText,
} from "@mediawiki-typescript/builder";

// Preprocessor directives, not real HTML — their content is still parsed as wikitext, but they
// map to dedicated builder types instead of the generic MediaWikiHTML.
// https://www.mediawiki.org/wiki/Help:Transclusion#Source_page_syntax
const TRANSCLUSION_TAG_BUILDERS = {
  noinclude: MediaWikiNoInclude,
  includeonly: MediaWikiIncludeOnly,
  onlyinclude: MediaWikiOnlyInclude,
} as const;

const TOP_LEVEL_LITERAL_TOKEN_KEYS = new Set(["Pipe", "TemplateClose", "LinkClose", "ExtLinkClose"]);

const TAG_NAME_PATTERN = /^<\/?([a-zA-Z][\w-]*)/;
const SELF_CLOSING_PATTERN = /\/>\s*$/;

const BaseVisitor = wikitextParser.getBaseCstVisitorConstructor<never, unknown>();

/**
 * Walks the inline wikitext CST and instantiates real `@mediawiki-typescript/builder` content
 * classes, rather than building a separate parser-owned AST — see docs/plans/builder-parser/plan.md.
 */
export class WikitextToBuilderVisitor extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  private pieceFromEntry(key: string, element: IToken | CstNode): Piece {
    if (TOP_LEVEL_LITERAL_TOKEN_KEYS.has(key)) {
      return { kind: "text", value: (element as IToken).image };
    }
    return this.visit(element as CstNode) as Piece;
  }

  content(ctx: Record<string, (IToken | CstNode)[]>): Piece[] {
    return orderedChildren(ctx).map(({ key, element }) => this.pieceFromEntry(key, element));
  }

  segment(ctx: Record<string, (IToken | CstNode)[]>): Piece[] {
    return orderedChildren(ctx).map(({ key, element }) => this.pieceFromEntry(key, element));
  }

  opaqueTag(ctx: { OpaqueTag: IToken[] }): Piece {
    const image = ctx.OpaqueTag[0].image;
    const tagName = TAG_NAME_PATTERN.exec(image)?.[1]?.toLowerCase();
    if (tagName === "gallery") {
      return { kind: "content", value: parseGallery(image) };
    }
    return { kind: "content", value: new MediaWikiText(image) };
  }

  comment(ctx: { Comment: IToken[] }): Piece {
    const image = ctx.Comment[0].image;
    const inner = image.replace(/^<!--/, "").replace(/-->$/, "").trim();
    return { kind: "content", value: new MediaWikiComment(inner) };
  }

  tripleBrace(ctx: { TripleBrace: IToken[] }): Piece {
    return { kind: "content", value: new MediaWikiText(ctx.TripleBrace[0].image) };
  }

  templateOrParserFunction(ctx: { segments: CstNode[] }): Piece {
    const segmentStrings = ctx.segments.map((segment) =>
      segmentToString(this.visit(segment) as Piece[])
    );
    const [first, ...rest] = segmentStrings;
    const colonIndex = first.indexOf(":");

    if (colonIndex !== -1) {
      const beforeColon = first.slice(0, colonIndex).trim();
      const afterColon = first.slice(colonIndex + 1);
      // {{subst:Name|...}} — substitution modifier on a template transclusion, not a parser function.
      if (beforeColon.toLowerCase() === "subst") {
        return {
          kind: "content",
          value: this.buildTemplate(afterColon, rest, { subst: true }),
        };
      }
      // {{DEFAULTSORT:key}} — overrides the page's category sort key, not a parser function.
      if (beforeColon.toLowerCase() === "defaultsort") {
        return { kind: "content", value: new MediaWikiDefaultSort(afterColon) };
      }
      const isParserFunction =
        beforeColon.startsWith("#") ||
        BARE_PARSER_FUNCTION_NAMES.includes(beforeColon.toLowerCase());
      if (isParserFunction) {
        const parserFunction = new MediaWikiParserFunction(beforeColon);
        parserFunction.add(afterColon);
        rest.forEach((value) => parserFunction.add(value));
        return { kind: "content", value: parserFunction };
      }
    }

    return { kind: "content", value: this.buildTemplate(first, rest) };
  }

  private buildTemplate(
    name: string,
    rest: string[],
    options?: { subst?: boolean }
  ): MediaWikiTemplate {
    const template = new MediaWikiTemplate(name, options);
    rest.forEach((value) => {
      const eqIndex = value.indexOf("=");
      if (eqIndex === -1) {
        template.add("", value);
      } else {
        template.add(value.slice(0, eqIndex).trim(), value.slice(eqIndex + 1).trim());
      }
    });
    return template;
  }

  link(ctx: { segments: CstNode[] }): Piece {
    const [target, ...rest] = ctx.segments.map((segment) =>
      segmentToString(this.visit(segment) as Piece[])
    );
    if (/^(file|image):/i.test(target)) {
      const fileName = target.replace(/^(file|image):/i, "");
      return {
        kind: "content",
        value: new MediaWikiFile(fileName, parseFileOptions(rest)),
      };
    }
    // A leading ":" (e.g. "[[:Category:Help]]") is a plain link to the category page, not a
    // category tag — only a bare "Category:" target adds the current page to that category.
    if (/^category:/i.test(target)) {
      const categoryName = target.replace(/^category:/i, "");
      return {
        kind: "content",
        value: new MediaWikiCategory(categoryName, rest[0]),
      };
    }
    const label = rest.length > 0 ? rest[rest.length - 1] : undefined;
    return { kind: "content", value: new MediaWikiLink(target, label) };
  }

  externalLink(ctx: { body: CstNode[] }): Piece {
    const body = segmentToString(this.visit(ctx.body[0]) as Piece[]);
    const spaceIndex = body.search(/\s/);
    const link = spaceIndex === -1 ? body : body.slice(0, spaceIndex);
    const label = spaceIndex === -1 ? "" : body.slice(spaceIndex + 1).trim();
    return { kind: "content", value: new MediaWikiExternalLink(label, link) };
  }

  quotes(ctx: { Apostrophes: IToken[] }): Piece {
    return { kind: "quote", count: ctx.Apostrophes[0].image.length };
  }

  tag(ctx: { pairedTag?: CstNode[]; TagClose?: IToken[] }): Piece {
    if (ctx.pairedTag) {
      return this.visit(ctx.pairedTag[0]) as Piece;
    }
    return { kind: "text", value: (ctx.TagClose as IToken[])[0].image };
  }

  pairedTag(ctx: Record<string, (IToken | CstNode)[]>): Piece {
    const openImage = (ctx.TagOpen[0] as IToken).image;
    const tagName = TAG_NAME_PATTERN.exec(openImage)?.[1] ?? "span";
    const selfClosing = SELF_CLOSING_PATTERN.test(openImage);
    const attributes = parseAttributes(openImage);

    const { TagOpen, TagClose, ...childEntries } = ctx;
    void TagOpen;
    void TagClose;
    const childPieces = orderedChildren(childEntries).map(({ key, element }) =>
      this.pieceFromEntry(key, element)
    );
    const children = selfClosing ? undefined : resolveQuotes(childPieces);

    if (tagName.toLowerCase() === "ref") {
      const { name, group } = attributes ?? {};
      const options = name || group ? { name, group } : undefined;
      return { kind: "content", value: new MediaWikiReference(children, options) };
    }

    const TransclusionTag =
      TRANSCLUSION_TAG_BUILDERS[
        tagName.toLowerCase() as keyof typeof TRANSCLUSION_TAG_BUILDERS
      ];
    if (TransclusionTag) {
      return { kind: "content", value: new TransclusionTag(children) };
    }

    return {
      kind: "content",
      value: new MediaWikiHTML(
        tagName,
        children,
        attributes,
        children && children.length > 0 ? { collapsed: true } : undefined
      ),
    };
  }

  text(ctx: { PlainText?: IToken[]; AnyChar?: IToken[] }): Piece {
    const token = (ctx.PlainText ?? ctx.AnyChar)?.[0];
    return { kind: "text", value: token?.image ?? "" };
  }
}
