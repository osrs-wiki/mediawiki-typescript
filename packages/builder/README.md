# @mediawiki-typescript/builder

A fluent, typed tool set for building MediaWiki content (wikitext) with TypeScript. Every piece of
content — text, links, templates, tables, headings, categories, parser functions, and more — is a
small class with a `build(): string` method, composed together with `MediaWikiBuilder`.

Ported from [mediawiki-builder](https://github.com/osrs-wiki/mediawiki-builder).

## Install

```sh
npm install @mediawiki-typescript/builder
```

## Quick start

```ts
import {
  MediaWikiBuilder,
  MediaWikiHeader,
  MediaWikiText,
  MediaWikiLink,
  MediaWikiTemplate,
} from "@mediawiki-typescript/builder";

const infobox = new MediaWikiTemplate("Infobox");
infobox.add("name", "Sandbox");
infobox.add("type", "Testing");

const wikitext = new MediaWikiBuilder()
  .addContent(infobox)
  .addContent(new MediaWikiHeader("Overview", 2))
  .addContent(new MediaWikiText("See "))
  .addContent(new MediaWikiLink("Help:Sandbox", "the sandbox help page"))
  .addContent(new MediaWikiText(" for more information."))
  .build();
```

## Core concepts

### `MediaWikiContent`

The abstract base class every content type extends. Each subclass implements `build(): string`,
producing valid wikitext for that construct, and may accept nested `MediaWikiContents` as
children.

### `MediaWikiBuilder`

The top-level entry point:

- `addContent(content)` — append a single content item (ignores `null`/`undefined`).
- `addContents(contents[])` — append many content items at once.
- `addTransformer(transformer)` — register a post-processing step (see below).
- `build()` — runs all registered transformers over the content, then concatenates every item's
  `build()` output into a single wikitext string.

### Content types

`src/builder/content/contents/` contains one directory per content type, including:

**Text & formatting**

| Type | Wikitext |
| --- | --- |
| `MediaWikiText` | Plain text, with optional bold/italic/underline styling |
| `MediaWikiBreak` | Line break |
| `MediaWikiSeparator` | `----` |
| `MediaWikiHeader` | `== Heading ==` |

**Links**

| Type | Wikitext |
| --- | --- |
| `MediaWikiLink` | `[[Page\|label]]` |
| `MediaWikiExternalLink` | `[https://... label]` |
| `MediaWikiDate` | A date, rendered as linked day/month + year |

**Media & categories**

| Type | Wikitext |
| --- | --- |
| `MediaWikiFile` | `[[File:...]]`, covering the full [Help:Images](https://www.mediawiki.org/wiki/Help:Images) option grammar — resizing, alignment, framing, captions, `alt`/`page`/`thumbtime`/`class`/`lang`, etc. |
| `MediaWikiGallery` | `<gallery>...</gallery>` |
| `MediaWikiCategory` | `[[Category:Name]]` |
| `MediaWikiHiddenCategory` | `__HIDDENCAT__` |
| `MediaWikiDefaultSort` | `{{DEFAULTSORT:...}}` |

**Structure**

| Type | Wikitext |
| --- | --- |
| `MediaWikiTemplate` | `{{Name\|param=value}}`, with auto single-line/multi-line collapsing |
| `MediaWikiTable` | Full [Help:Tables](https://www.mediawiki.org/wiki/Help:Tables) support — rows, header cells, colspan/rowspan, per-cell/row/table attributes |
| `MediaWikiListItem` | Ordered/unordered/definition list items |
| `MediaWikiIndex` | `__INDEX__` |

**Parser functions & magic words**

| Type | Wikitext |
| --- | --- |
| `MediaWikiParserFunction` | Generic base for any `{{#function:...}}` |
| Conditional/logic classes | `#if`, `#ifeq`, `#switch`, … |
| String/path classes | `#titleparts`, `#sub`, `#replace`, … |
| Time classes | `#time`, `#timel`, … |
| [Extension:Variables](https://www.mediawiki.org/wiki/Extension:Variables) classes | `#var`, `#vardefine`, … |
| Case/URL classes | `lc:`, `uc:`, `urlencode:`, … |
| Behavior switch classes | `__TOC__`, `__NOTOC__`, `__FORCETOC__`, `__NOEDITSECTION__`, `__NOGALLERY__`, `__STATICREDIRECT__`, `__INDEX__`, `__NOINDEX__`, `__HIDDENCAT__` (each its own type) |

**Other**

| Type | Wikitext |
| --- | --- |
| `MediaWikiComment` | `<!-- -->` |
| `MediaWikiHTML` | Arbitrary paired/self-closing HTML tags |
| `MediaWikiIncludeOnly` / `MediaWikiNoInclude` / `MediaWikiOnlyInclude` | `<includeonly>` / `<noinclude>` / `<onlyinclude>` |
| `MediaWikiRedirect` | `#REDIRECT [[target]]` |
| `MediaWikiReference` | `<ref>` |
| `ReflistTemplate` (and other templates) | `{{Reflist}}` |

All content types are exported from the package root — see
`src/builder/content/contents/index.ts` for the full, current list.

### Transformers

`MediaWikiTransformer` is an abstract class with a single `transform(content: MediaWikiContent[]):
MediaWikiContent[]` method, letting you post-process the full content array before it's built
(e.g. to inject separators, deduplicate content, or normalize whitespace). Register one via
`builder.addTransformer(new MyTransformer())`.

### Working with a flat content list (`MediaWikiContentList`)

`src/builder/content/list/` provides query/mutation helpers for an existing flat
`MediaWikiContent[]` (e.g. page content you've parsed or built elsewhere), and
`MediaWikiContentList` wraps them in a single chainable, immutable object:

```ts
import { MediaWikiContentList, MediaWikiTemplate } from "@mediawiki-typescript/builder";

const list = new MediaWikiContentList(existingContents);

const updated = list
  .insertInSection("Changes", new MediaWikiTemplate("Change|note=Updated stats"))
  .findSection("See also");

const rebuilt = updated?.items.map((c) => c.build()).join("");
```

Available methods:

| Method | Kind | Description |
| --- | --- | --- |
| `findHeadings()` | Query | All `MediaWikiHeader` items in the list |
| `findSection(headingText, options?)` | Query | The `{ start, end }` index range of a section |
| `getSectionContents(headingText, options?)` | Query | A section's contents, wrapped in a new `MediaWikiContentList` |
| `findAll(predicate)` | Query | All items matching a predicate |
| `findTemplate(name)` | Query | The first `MediaWikiTemplate` matching `name` |
| `mapContent(fn)` / `forEachContent(fn)` / `countContent(predicate)` | Query | Standard array-style helpers over the items |
| `insertAtIndex(index, content)` | Mutation | Insert at a specific index |
| `insertAfter(target, content)` / `insertBefore(target, content)` | Mutation | Insert relative to a target item |
| `insertInSection(headingText, content, options?)` | Mutation | Insert within a named section |
| `replaceContent(target, content)` | Mutation | Replace a target item |
| `removeContent(target)` / `removeAtIndex(index)` / `removeSection(headingText, options?)` | Mutation | Remove item(s) |
| `isEmpty()` / `startsWith(content)` | Traversal | Inspect the list's shape |
| `findFirstStringContent()` | Traversal | The first item resolvable to plain text |
| `trimBreaks()` / `trimEdges()` | Traversal | Trim leading/trailing breaks or whitespace-like content |
| `getNextMeaningfulContent(index)` | Traversal | The next non-trivial item after a given index |

Every mutation-shaped method returns a **new** `MediaWikiContentList` rather than mutating the
original. These helpers only operate on top-level content — they don't recurse into a content
item's own nested children (e.g. table cells, template params) — and a "section" spans from one
heading to the next heading of the same or shallower level.

## Known, deliberate gaps

- `MediaWikiBreak.build()` returns a bare `"\n"`.
- No support for nested tables, `<col>`/`<colgroup>`/`<thead>`/`<tbody>`/`<tfoot>`, or deprecated
  HTML4 table attributes (`cellpadding`, `cellspacing`, `border=`, `width=` — use `style` instead).
- Signatures (`~~~`/`~~~~`/`~~~~~`) have no builder representation.
