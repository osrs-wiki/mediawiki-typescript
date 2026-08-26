import { CstElement, CstParser, IOrAlt } from "chevrotain";
import {
  allTokens,
  AnyChar,
  Comment,
  ExtLinkClose,
  ExtLinkOpen,
  LinkClose,
  LinkOpen,
  OpaqueTag,
  Pipe,
  PlainText,
  Apostrophes,
  TagClose,
  TagOpen,
  TemplateClose,
  TemplateOpen,
  TripleBrace,
} from "../lexer/tokens";

type InlineAlternativesOptions = {
  /** Include stray Pipe/TemplateClose/LinkClose/ExtLinkClose as literal text (top-level content only). */
  topLevel?: boolean;
  /** Exclude the generic `tag` alternative (used inside a paired tag's own children, so its MANY loop stops at any TagClose). */
  excludeTagClose?: boolean;
};

/**
 * Chevrotain CST grammar for the *inline* wikitext grammar (bold/italic, links, templates, parser
 * functions, tags, comments). Block-level constructs (headings/lists/horizontal rules/paragraphs)
 * are detected separately by `splitBlocks` before this parser runs on each block's content —
 * mirroring MediaWiki's own two-phase preprocessor/block-pass architecture (see Manual:Parser).
 */
export class WikitextParser extends CstParser {
  constructor() {
    super(allTokens, { nodeLocationTracking: "full" });
    this.performSelfAnalysis();
  }

  private inlineAlternatives(options: InlineAlternativesOptions = {}): IOrAlt<CstElement>[] {
    const alternatives: IOrAlt<CstElement>[] = [
      { ALT: () => this.SUBRULE(this.opaqueTag) },
      { ALT: () => this.SUBRULE(this.comment) },
      { ALT: () => this.SUBRULE(this.tripleBrace) },
      { ALT: () => this.SUBRULE(this.templateOrParserFunction) },
      { ALT: () => this.SUBRULE(this.link) },
      { ALT: () => this.SUBRULE(this.externalLink) },
      { ALT: () => this.SUBRULE(this.quotes) },
      { ALT: () => this.SUBRULE(this.text) },
    ];
    if (!options.excludeTagClose) {
      alternatives.push({ ALT: () => this.SUBRULE(this.tag) });
    } else {
      alternatives.push({ ALT: () => this.SUBRULE(this.pairedTag) });
    }
    if (options.topLevel) {
      alternatives.push(
        { ALT: () => this.CONSUME(Pipe) },
        { ALT: () => this.CONSUME(TemplateClose) },
        { ALT: () => this.CONSUME(LinkClose) },
        { ALT: () => this.CONSUME(ExtLinkClose) }
      );
    }
    return alternatives;
  }

  /** Top-level entry point: parses a single block's worth of inline content. */
  public content = this.RULE("content", () => {
    this.MANY(() => this.OR(this.inlineAlternatives({ topLevel: true })));
  });

  /** A run of inline elements used inside template/parser-function params and link targets/labels. */
  private segment = this.RULE("segment", () => {
    this.MANY(() => this.OR(this.inlineAlternatives()));
  });

  private opaqueTag = this.RULE("opaqueTag", () => {
    this.CONSUME(OpaqueTag);
  });

  private comment = this.RULE("comment", () => {
    this.CONSUME(Comment);
  });

  private tripleBrace = this.RULE("tripleBrace", () => {
    this.CONSUME(TripleBrace);
  });

  /** `{{Name|k=v}}` or `{{#name:arg1|arg2}}` — disambiguated later, in the visitor. */
  private templateOrParserFunction = this.RULE("templateOrParserFunction", () => {
    this.CONSUME(TemplateOpen);
    this.SUBRULE(this.segment, { LABEL: "segments" });
    this.MANY(() => {
      this.CONSUME(Pipe);
      this.SUBRULE2(this.segment, { LABEL: "segments" });
    });
    this.CONSUME(TemplateClose);
  });

  /** `[[target]]`, `[[target|label]]`, or `[[File:x|opt1|opt2|...]]` (multiple pipe-separated segments). */
  private link = this.RULE("link", () => {
    this.CONSUME(LinkOpen);
    this.SUBRULE(this.segment, { LABEL: "segments" });
    this.MANY(() => {
      this.CONSUME(Pipe);
      this.SUBRULE2(this.segment, { LABEL: "segments" });
    });
    this.CONSUME(LinkClose);
  });

  /** `[url]` or `[url label text]` — the URL/label split happens in the visitor. */
  private externalLink = this.RULE("externalLink", () => {
    this.CONSUME(ExtLinkOpen);
    this.SUBRULE(this.segment, { LABEL: "body" });
    this.CONSUME(ExtLinkClose);
  });

  /** A run of 2+ apostrophes; resolved into bold/italic markers by the visitor. */
  private quotes = this.RULE("quotes", () => {
    this.CONSUME(Apostrophes);
  });

  private tag = this.RULE("tag", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.pairedTag) },
      // A stray/unmatched closing tag is treated as literal text by the visitor.
      { ALT: () => this.CONSUME(TagClose) },
    ]);
  });

  /**
   * An HTML-like tag and (if not self-closing) its children, up to the next closing tag.
   * Does not verify the closing tag's name matches the opening tag's name (best-effort simplification).
   */
  private pairedTag = this.RULE("pairedTag", () => {
    this.CONSUME(TagOpen);
    this.MANY(() => this.OR(this.inlineAlternatives({ excludeTagClose: true })));
    this.OPTION(() => this.CONSUME(TagClose));
  });

  private text = this.RULE("text", () => {
    this.OR([{ ALT: () => this.CONSUME(PlainText) }, { ALT: () => this.CONSUME(AnyChar) }]);
  });
}
