---
name: tips-draft-to-mdx
description: Converts a duplicated tips draft (raw markdown with emoji titles and links) into the rich MDX format used by the 2026-03-09 tips post. Use when the user pastes a weekly tips draft into a "copy" MDX file and needs the final formatted version with AnchorWrapper, StarterText, TextSeparator, and WebLinkSection.
---

# Tips Draft to MDX (Rich Format)

Transforms a raw weekly tips draft (like the "copy" file) into the rich MDX format used in the 2026-03-09 post.

## When to apply

- The user duplicates a weekly tips file and pastes raw markdown into the "copy" file.
- The user wants the final MDX to match the rich format (AnchorWrapper, StarterText, TextSeparator, WebLinkSection, etc.).

## Inputs / Outputs

- **Input example**: `.cursor/skills/blog-anchor-pattern/2026-03-09_tips-code-isnt-slowing-your-project-down-communication-is copy.mdx`
- **Output example**: `.cursor/skills/blog-anchor-pattern/2026-03-09_tips-code-isnt-slowing-your-project-down-communication-is.mdx`

## Core transformation

### 1. Frontmatter

- Keep the title and tags from the draft.
- **Enrich the description**: append a concise topic summary after `Tips and discovery of the week. - `.

### 2. Imports

Add these imports after frontmatter:

```mdx
import AnchorLink from "@/components/AnchorLink.astro";
import AnchorSection from "@/components/AnchorSection.astro";
import AnchorWrapper from "@/components/AnchorWrapper.astro";
import TextSeparator from "@/components/TextSeparator.astro";
import StarterText from "@/components/StarterText.astro";
import WebLinkSection from "@/components/WebLinkSection.astro";
```

### 3. Intro block

Replace the `## Salut, ...` heading + paragraph with:

```mdx
<StarterText>
Intro paragraph here...
</StarterText>
```

- Remove the `##` heading entirely.

### 4. Table of contents

Transform each `emoji Title` line into an `AnchorLink`, wrapped in `AnchorWrapper`:

```mdx
<AnchorWrapper>
  <AnchorLink emoji="📢" text="Code Isn't Slowing Your Project Down, Communication Is" />
  <AnchorLink emoji="🌈" text="Finding an accessibility-first culture in npmx" />
  <AnchorLink emoji="👀" text="Accessibility in Vue" />
  <AnchorLink emoji="⚒️" text="Oxfmt Beta" />
</AnchorWrapper>
```

- The `text` can be a shortened version of the full article title.
- The anchor ID is derived from `text.toLowerCase().replace(/\s+/g, '-')`.

### 5. Separator after intro

Replace:

```
**Have a great week.**

___
```

with:

```mdx
<TextSeparator />
```

### 6. Main sections

Convert each `emoji [Title](url)` + paragraph into:

```mdx
<AnchorSection emoji="📢" id="code-isn't-slowing-your-project-down,-communication-is" text="Code Isn't Slowing Your Project Down, Communication Is" url="https://shiftmag.dev/code-isnt-slowing-your-project-down-communication-is-7889/" />

<p class="mt-2">
Paragraph content here...
</p>
```

Rules:
- First section: no `componentClass`.
- Next sections: add `componentClass="mt-2"`.
- `id` is derived from the AnchorLink `text` (lowercase + spaces → hyphens).
- `url` should **NOT** include `utm_source`. The component appends it automatically.
- If the draft URL already has `utm_source`, remove it from the prop.

### 7. Bottom separator

Replace the bottom `___` with:

```mdx
<hr class="my-8 border-t border-border/60 animate-fade-up"  style="animation-delay: 500ms;"/>
```

### 8. Bottom sections (Web tools, Cool Websites, Design inspirations)

Replace each markdown section heading with `<h2>`:

- First: `<h2 class="font-display text-2xl text-foreground">Heading</h2>`
- Next ones: `<h2 class="font-display text-2xl text-foreground mt-8">Heading</h2>`

Replace each `emoji [name](url)` + description with `WebLinkSection`:

```mdx
<WebLinkSection emoji="📜" url="https://vue-scrollama.pages.dev" text="vue-scrollama" templateClass="mt-4">
Scroll down to explore component primitives and real-world scrollytelling patterns.
</ WebLinkSection>
```

Rules:
- `url` should **NOT** include `utm_source`.
- The component appends `?utm_source=cocoweb.fr` automatically.

### 9. UTM rules for inline links

Any markdown link inside `StarterText` or inside `<p class="mt-2">` **must** include `utm_source=cocoweb.fr`.

- If URL has no query string → append `?utm_source=cocoweb.fr`.
- If URL already has `?` → append `&utm_source=cocoweb.fr`.

## Example (short)

**Input (draft):**

```markdown
## Salut, web dev friends! 🧑‍💻

This week, I started reading a lot of things about accessiblity , I started using more [storybook](https://storybook.js.org/) and their [A11y addon](https://storybook.js.org/addons/@storybook/addon-a11y).

📢 Code Isn’t Slowing Your Project Down, Communication Is
🌈 Finding an accessibility-first culture in npmx

**Have a great week.**

___

📢  [Code Isn’t Slowing Your Project Down, Communication Is](https://shiftmag.dev/code-isnt-slowing-your-project-down-communication-is-7889/)
I like the conclusion, « Sit down and listen to other teams ».
```

**Output (MDX):**

```mdx
import AnchorLink from "@/components/AnchorLink.astro";
import AnchorSection from "@/components/AnchorSection.astro";
import AnchorWrapper from "@/components/AnchorWrapper.astro";
import TextSeparator from "@/components/TextSeparator.astro";
import StarterText from "@/components/StarterText.astro";
import WebLinkSection from "@/components/WebLinkSection.astro";

<StarterText>
This week, I started reading a lot of things about accessiblity , I started using more [storybook](https://storybook.js.org/?utm_source=cocoweb.fr) and their [A11y addon](https://storybook.js.org/addons/@storybook/addon-a11y?utm_source=cocoweb.fr).
</StarterText>

<AnchorWrapper>
  <AnchorLink emoji="📢" text="Code Isn't Slowing Your Project Down, Communication Is" />
  <AnchorLink emoji="🌈" text="Finding an accessibility-first culture in npmx" />
</AnchorWrapper>

<TextSeparator />

<AnchorSection emoji="📢" id="code-isn't-slowing-your-project-down,-communication-is" text="Code Isn't Slowing Your Project Down, Communication Is" url="https://shiftmag.dev/code-isnt-slowing-your-project-down-communication-is-7889/" />

<p class="mt-2">
I like the conclusion, « Sit down and listen to other teams ».
</p>
```

## Reference files

- `.cursor/skills/blog-anchor-pattern/2026-03-09_tips-code-isnt-slowing-your-project-down-communication-is copy.mdx`
- `.cursor/skills/blog-anchor-pattern/2026-03-09_tips-code-isnt-slowing-your-project-down-communication-is.mdx`
- `src/components/AnchorSection.astro`
- `src/components/AnchorLink.astro`
- `src/components/AnchorWrapper.astro`
- `src/components/StarterText.astro`
- `src/components/TextSeparator.astro`
- `src/components/WebLinkSection.astro`
