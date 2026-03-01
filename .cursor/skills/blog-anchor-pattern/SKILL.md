---
name: blog-anchor-pattern
description: Adds AnchorLink and AnchorSection components to blog posts for a clickable table of contents and section anchors. Use when creating or editing "tips" blog posts in src/content/blog/ (MDX files) or when the user asks to add anchor links or a table of contents to a blog post.
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
```

## Pattern

1. **AnchorLink** (intro / table of contents): one per main section, in the same order as the sections in the body.
   - Props: `emoji`, `text`.
   - Renders as a link to `#<id>` where `id` is `text.toLowerCase().replace(/\s+/g, '-')`.

2. **AnchorSection** (each main section): wrap the section title link (or first line) with the component.
   - Props: `emoji`, `id`.
   - `id` must match the AnchorLink target: same as `text` from AnchorLink lowercased with spaces → hyphens.

**Rule:** Order of AnchorLinks in the intro must match the order of AnchorSections in the content.

## ID generation

From `AnchorLink` text to `AnchorSection` id:

- `text.toLowerCase().replace(/\s+/g, '-')`
- Example: "Performance Is Not a Technical Problem" → `performance-is-not-a-technical-problem`

## Example (intro + first section)

**Intro (table of contents):**

```mdx
<AnchorLink emoji="📝" text="Performance Is Not a Technical Problem" />
<AnchorLink emoji="🏢" text="Isometric NYC" />
```

**Body (sections):**

```mdx
<AnchorSection emoji="📝" id="performance-is-not-a-technical-problem">[Performance Is Not a Technical Problem](https://example.com/...)</AnchorSection>

Paragraph content here...

<AnchorSection emoji="🏢" id="isometric-nyc">[Isometric NYC](https://example.com/...)</AnchorSection>

Paragraph content here...
```

## Reference posts

- [src/content/blog/en/2026-01-26_tips-performance-is-not-a-technical-problem.mdx](src/content/blog/en/2026-01-26_tips-performance-is-not-a-technical-problem.mdx)
- [src/content/blog/en/2026-02-02_tips-how-to-recreate-vuejs-from-scratch.mdx](src/content/blog/en/2026-02-02_tips-how-to-recreate-vuejs-from-scratch.mdx)
