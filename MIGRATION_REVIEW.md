# Migration Review: Eleventy to Astro

This document summarizes the architecture changes from the Eleventy to Astro migration and lists legacy code to be removed in a separate commit.

---

## 1. New Astro Architecture

### Project Structure

```
src/
├── content/
│   ├── config.ts              # Zod schema for collections
│   ├── blog/                   # 200+ migrated posts
│   └── articles/               # Technical articles
├── layouts/
│   ├── BaseLayout.astro        # Main layout (meta, nav, footer)
│   ├── PostLayout.astro        # Blog post layout
│   └── ArticleLayout.astro     # Article layout (no Sources section)
├── pages/
│   ├── index.astro             # Homepage (EN default)
│   ├── about.astro             # About page
│   ├── 404.astro               # 404 page
│   ├── blog/
│   │   ├── index.astro         # Blog listing
│   │   └── [...slug].astro     # Dynamic post routes
│   ├── articles/
│   │   ├── index.astro         # Articles listing
│   │   └── [...slug].astro     # Dynamic article routes
│   ├── tags/
│   │   ├── index.astro         # All tags
│   │   └── [tag].astro         # Posts by tag
│   ├── feed/
│   │   ├── feed.xml.ts         # RSS Atom feed
│   │   └── feed.json.ts        # JSON feed
│   └── fr/                     # French pages (prefixed)
│       ├── index.astro
│       ├── about.astro
│       ├── blog/
│       ├── articles/
│       └── tags/
├── components/
│   ├── Nav.astro               # Navigation
│   ├── PostList.astro          # Post listing with i18n support
│   ├── ThemeToggle.astro       # Dark/light mode toggle
│   ├── LanguageSwitcher.astro  # FR/EN switcher
│   ├── AnchorLink.astro        # Anchor link with emoji
│   └── AnchorSection.astro     # Section with anchor ID
├── i18n/
│   ├── ui.ts                   # UI translations (FR/EN)
│   └── utils.ts                # i18n helper functions
└── styles/
    └── theme.scss              # SASS styles (migrated from sass/)
```

### Key Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config with i18n, static output |
| `src/content/config.ts` | Content collections schema |
| `tsconfig.json` | TypeScript configuration |

### Build Output

- **Output directory**: `dist/` (replaces `_site/`)
- **Build command**: `pnpm build` (runs `astro build`)

---

## 2. Legacy Files to Remove

### Configuration Files

| File | Status |
|------|--------|
| `.eleventy.js` | Delete |
| `.eleventyignore` | Delete |

### Nunjucks Templates (18 files)

**Root templates:**
- `index.njk`
- `search.njk`
- `tags.njk`
- `articles.njk`
- `all-posts.njk`
- `page-list.njk`
- `tags-list.njk`
- `sitemap.xml.njk`
- `search-index.njk`

**Feed templates:**
- `feed/feed.njk`
- `feed/json.njk`
- `feed/htaccess.njk`

**Include templates:**
- `_includes/layouts/base.njk`
- `_includes/layouts/post.njk`
- `_includes/layouts/home.njk`
- `_includes/layouts/articles.njk`
- `_includes/postslist.njk`
- `_includes/articlesList.njk`

### Directories to Remove

| Directory | Reason |
|-----------|--------|
| `_includes/` | Nunjucks layouts and JS (migrated to src/) |
| `_data/` | metadata.json (now in astro.config.mjs) |
| `_site/` | Eleventy output (replaced by dist/) |
| `feed/` | Nunjucks templates (replaced by src/pages/feed/) |
| `posts/` | Moved to `src/content/blog/` |
| `articles/` | Moved to `src/content/articles/` |
| `about/` | Migrated to `src/pages/about.astro` |
| `sass/` | Copied to `src/styles/` |

### Root Markdown Files

| File | Status |
|------|--------|
| `404.md` | Delete (migrated to src/pages/404.astro) |

---

## 3. Package.json Cleanup

### devDependencies to Remove

```json
"@11ty/eleventy": "^3.0.0",
"@11ty/eleventy-navigation": "^0.3.5",
"@11ty/eleventy-plugin-rss": "^2.0.2",
"@11ty/eleventy-plugin-syntaxhighlight": "^5.0.0",
"luxon": "^3.5.0",
"markdown-it": "^14.1.0",
"markdown-it-anchor": "^9.2.0"
```

### dependencies to Remove

```json
"@quasibit/eleventy-plugin-schema": "^1.11.1",
"markdown-it-attrs": "^4.3.1"
```

### Scripts to Remove

```json
"eleventy:build": "eleventy && pnpm run build:sass",
"eleventy:watch": "eleventy --watch",
"eleventy:serve": "eleventy --serve",
"watch:sass": "sass sass:_site/css --watch",
"build:sass": "sass sass/theme.scss _site/css/theme.css",
"eleventy:start": "eleventy --serve & pnpm run watch:sass",
"eleventy:debug": "DEBUG=* eleventy"
```

### Metadata to Update

```json
"repository": {
  "type": "git",
  "url": "git://github.com/CMarzin/cocoweb.git"
},
"author": {
  "name": "Corentin Marzin",
  "email": "corentinmarzin@gmail.com",
  "url": "https://cocoweb.fr"
},
"bugs": {
  "url": "https://github.com/CMarzin/cocoweb/issues"
},
"homepage": "https://cocoweb.fr"
```

---

## 4. Removal Commands

Run these commands to remove legacy code (in a separate commit):

```bash
# Remove Eleventy config files
rm .eleventy.js .eleventyignore

# Remove Nunjucks templates
rm index.njk search.njk tags.njk articles.njk
rm all-posts.njk page-list.njk tags-list.njk
rm sitemap.xml.njk search-index.njk

# Remove legacy directories
rm -rf _includes/ _data/ _site/ feed/

# Remove source content (already migrated to src/content/)
rm -rf posts/ articles/ about/

# Remove legacy markdown
rm 404.md

# Remove legacy sass (already copied to src/styles/)
rm -rf sass/
```

---

## 5. Verification Checklist

Before removing legacy code, verify:

- [ ] `pnpm build` succeeds
- [ ] `pnpm preview` shows the site correctly
- [ ] All posts are accessible at `/blog/[slug]/`
- [ ] All articles are accessible at `/articles/[slug]/`
- [ ] Tags pages work at `/tags/` and `/tags/[tag]/`
- [ ] RSS feed works at `/feed/feed.xml`
- [ ] JSON feed works at `/feed/feed.json`
- [ ] French pages work at `/fr/*`
- [ ] Language switcher toggles between EN/FR
- [ ] Dark/light mode toggle works
- [ ] 404 page displays correctly

---

## 6. Commit Strategy

### Commit 1: Architecture Review (this document)
- Add `MIGRATION_REVIEW.md`

### Commit 2: Remove Legacy Code
- Remove all files listed in Section 2
- Clean up `package.json` as described in Section 3
- Run `pnpm install` to update lockfile

### Commit 3: Final Cleanup (optional)
- Remove `MIGRATION_REVIEW.md` if no longer needed
- Update `README.md` with new build instructions
