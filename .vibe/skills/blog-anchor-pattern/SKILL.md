---
name: blog-anchor-pattern
description: Adds AnchorLink and AnchorSection components to blog posts for a clickable table of contents and section anchors; inline external links use BaseLink (section titles use AnchorSection/WebLinkSection url props). Use when creating or editing "tips" blog posts in src/content/blog/ (MDX files) or when the user asks to add anchor links or a table of contents to a blog post.
---

# Blog Anchor Pattern (AnchorLink + AnchorSection)

Adds a table-of-contents style intro and anchored sections to tips-style blog posts using `AnchorLink` and `AnchorSection` from `@/components/`.

## When to apply

- Creating or editing a blog post in `src/content/blog/` that lists multiple items with emoji + title (tips/discovery format).
- User asks for anchor links or table of contents on a blog post.

## Imports (top of MDX, after frontmatter)

```mdx
import AnchorLink from "@/components/AnchorLink.astro";
import AnchorSection from "@/components/AnchorSection.astro";
import BaseLink from "@/components/BaseLink.astro";
```

Add `AnchorWrapper`, `StarterText`, `TextSeparator`, `WebLinkSection` when the post uses the full tips format.

## Pattern

1. **AnchorLink** (intro / table of contents): one per main section, in the same order as the sections in the body.
   - Props: `emoji`, `text`.
   - Renders as a link to `#<id>` where `id` is `text.toLowerCase().replace(/\s+/g, '-')`.

2. **AnchorSection** (each main section): wrap the section title link (or first line) with the component.
   - Props: `emoji`, `id`, `text`, `url`.
   - `id` must match the AnchorLink target: same as `text` from AnchorLink lowercased with spaces → hyphens.
   - First section: no `componentClass`. Next sections: `componentClass="mt-2"`.

**Rule:** Order of AnchorLinks in the intro must match the order of AnchorSections in the content.

## Links: section vs inline

### Section links (do NOT use BaseLink)

These components own the external URL and append `utm_source=cocoweb.fr` automatically. Pass `url` **without** `utm_source`:

- **AnchorSection** — main article title in the body (`url` prop)
- **WebLinkSection** — tools, cool websites, design picks (`url` prop)
- **AnchorLink** — in-page TOC only (`#anchor-id`), never external

### Inline links (always BaseLink)

Any other external link inside prose — `StarterText`, `<p class="mt-2">`, or `WebLinkSection` children — must use **BaseLink**, never markdown `[label](url)`.

```mdx
<BaseLink text="Daman" url="https://x.com/daman76752" />
```

- Props: `text`, `url`
- `url` must **NOT** include `utm_source` (the component appends `?utm_source=cocoweb.fr`)
- Self-closing tag: `<BaseLink text="..." url="..." />`
- Multiple inline links in one sentence: repeat `<BaseLink />` for each one

**Skip BaseLink** only for in-page anchors: `[text](#section-id)` — no UTM, rare in tips posts.

## ID generation

From `AnchorLink` text to `AnchorSection` id:

- `text.toLowerCase().replace(/\s+/g, '-')`
- Example: "Performance Is Not a Technical Problem" → `performance-is-not-a-technical-problem`

## Example (intro + first section + inline link)

**Intro (table of contents):**

```mdx
<AnchorLink emoji="📝" text="Performance Is Not a Technical Problem" />
<AnchorLink emoji="🏢" text="Isometric NYC" />
```

**Body (sections):**

```mdx
<AnchorSection emoji="📝" id="performance-is-not-a-technical-problem" text="Performance Is Not a Technical Problem" url="https://example.com/article" />

<p class="mt-2">
Paragraph content here. See also <BaseLink text="the follow-up post" url="https://example.com/follow-up" /> for more context.
</p>

<AnchorSection componentClass="mt-2" emoji="🏢" id="isometric-nyc" text="Isometric NYC" url="https://example.com/other" />

<p class="mt-2">
Paragraph content here...
</p>
```

**WebLinkSection with inline link in description:**

```mdx
<WebLinkSection emoji="🤩" url="https://x.com/daman76752/status/123" text="Footer design" templateClass="mt-4">
Some cool design footer from <BaseLink text="Daman" url="https://x.com/daman76752" />.
</WebLinkSection>
```

## Reference posts

- [src/content/blog/en/2026-01-26_tips-performance-is-not-a-technical-problem.mdx](../../../src/content/blog/en/2026-01-26_tips-performance-is-not-a-technical-problem.mdx)
- [src/content/blog/en/2026-02-02_tips-how-to-recreate-vuejs-from-scratch.mdx](../../../src/content/blog/en/2026-02-02_tips-how-to-recreate-vuejs-from-scratch.mdx)
- [src/content/blog/en/2026-06-01_tips-encyclical-letter-of-the-pope.mdx](../../../src/content/blog/en/2026-06-01_tips-encyclical-letter-of-the-pope.mdx) — BaseLink in prose
