# Task Specification: Blog Module — SEO Machine

## Source

Azure DevOps Task: ai-4

## Goal

Build a blog module integrated into the existing React/Vite stack that serves SEO-optimized articles about AI-driven software development, demonstrating expertise and driving user engagement toward the company's services.

## Context

The blog is a key part of the homepage and content marketing strategy. Articles must be discoverable by search engines, shareable on social media, and internally linked to create a content network that guides users toward the service offerings. Blog posts are static markdown files managed in the repository.

## Scope

### In scope

- **Blog post structure** — Static markdown files with YAML frontmatter (slug, title, meta-description, og:image, author, date, keywords, content)
- **Blog detail page** (`/blog/[slug]`) — Renders individual articles with proper meta tags and semantic HTML
- **Blog listing page** (`/blog`) — Displays all articles with pagination (10 per page)
- **Homepage blog section** — Shows 3 most recent articles as cards (title, description, read-more button)
- **Meta tags & SEO** — Proper `<title>`, `<meta name="description">`, `<meta property="og:*">` in `<head>` per article
- **JSON-LD (ProfessionalService)** — Site-level schema at `src/integrations/seo/schema.json`, included in layout
- **Three Polish articles** — Written by Claude, 1000+ characters each, with high-intent keywords and internal links
- **Article content** — H1–H3 headings with target keywords, internal links to other articles and services, semantic HTML

### Out of scope

- Comments/discussions on articles
- "Related Projects" section
- Author profiles or bios
- Social sharing buttons
- Search functionality for blog posts
- Automatic internal linking based on keyword matching
- RSS feed
- Multi-language support (only Polish for these 3 articles)

## Behavior

### Blog file structure

```
src/content/blog/
├── (slug-1).md
├── (slug-2).md
└── (slug-3).md
```

Each `.md` file uses YAML frontmatter:

```markdown
---
slug: jak-ai-skraca-development-o-70
title: Jak AI skraca development o 70%?
metaTitle: AI development automation | Skrót czasu na kodowanie
metaDescription: Poznaj jak AI i automatyzacja workflow skracają czas development. Szybsze MVP, wyższa jakość, niższe koszty.
ogImage: /og/ai-skraca-development.png
author: AI Software Revolution
date: 2026-02-28
keywords: workflow automation, AI-assisted coding, faster MVP
---

# Jak AI skraca development o 70%?

Content here...
```

### Blog detail page

- Route: `/blog/[slug]`
- Load markdown from `src/content/blog/[slug].md`
- Parse frontmatter and render content
- Set `<title>`, `<meta name="description">`, `<meta property="og:image">`, `<meta property="og:title">`, `<meta property="og:description">` in document head
- Add `<article>` wrapper with semantic HTML
- H1 from frontmatter `title`
- Content rendered from markdown body
- Breadcrumb navigation: Home > Blog > [Article Title]
- Internal links to other blog posts (e.g., `/blog/dlaczego-software-w-2026-jest-tanszy`)
- Link to relevant service offering (e.g., Rapid Prototyping)

### Blog listing page

- Route: `/blog`
- Display all articles sorted by date (newest first)
- Cards with: title, date, short excerpt (first 150 chars of content), "Read more" button
- Pagination: 10 articles per page
- Set proper meta tags for the page itself

### Homepage blog section

- Location: Below the hero or in a prominent position on the homepage
- Show 3 most recent articles
- Card format: title, short description (from frontmatter or excerpt), "Read more" button
- Grid layout: responsive (1 column mobile, 2-3 columns desktop)
- Link to full blog page: "View all articles" button

### SEO requirements

**Content:**
- Every article saturated with high-intent keywords: "AI application", "AI programming", "AI software house"
- H1–H3 headings must contain target keywords
- Minimum 1000 characters per article
- Internal links to other articles (at least 2 per article)
- Internal link to relevant service/offer

**Meta tags (per article):**
- `<title>`: `metaTitle` from frontmatter (max 60 chars)
- `<meta name="description">`: `metaDescription` from frontmatter (max 160 chars)
- `<meta property="og:image">`: `ogImage` from frontmatter
- `<meta property="og:title">`: `title` from frontmatter
- `<meta property="og:description">`: `metaDescription` from frontmatter
- `<meta property="og:type">`: "article"
- `<meta property="og:url">`: Full article URL
- `<link rel="canonical">`: Self-referential canonical tag

**JSON-LD:**
- Site-level ProfessionalService schema in `src/integrations/seo/schema.json`
- Included in layout `<head>` as `<script type="application/ld+json">`
- Describes company: name, description, areaServed (Poland), foundingDate, contactPoint

### Three articles to write

1. **"Jak AI skraca development o 70%?"**
   - Keywords: workflow automation, AI-assisted coding, faster MVP
   - Goal: Showcase delivery speed, target clients looking to save time
   - Links to: Other two articles, "Rapid Prototyping" service

2. **"Dlaczego software w 2026 jest tańszy niż myślisz?"**
   - Keywords: AI application cost, IT cost optimization, affordable software
   - Goal: Attract clients with smaller budgets, debunk expensive software myth
   - Links to: Other two articles, pricing/cost-related service

3. **"Od pomysłu do SaaS w tydzień — to możliwe?"**
   - Keywords: LLM integration, Prompt Engineering, MVP in a week
   - Goal: Direct sales of Rapid Prototyping service
   - Links to: Other two articles, "Rapid Prototyping" service offer

## Edge Cases

- **Article not found** → Display 404 page with link to blog listing
- **Empty blog** → Homepage section gracefully hides or shows "No articles yet"
- **Very long article titles** → Truncate in card preview, show full in detail page
- **Missing og:image** → Use site default fallback og:image
- **Markdown parsing errors** → Handle gracefully (show error in dev, fallback in prod)
- **Slug conflicts** → Ensure unique slugs across all markdown files

## Data / API

### File format

- **Location:** `src/content/blog/` directory
- **Format:** Markdown with YAML frontmatter
- **Parsing:** Use `gray-matter` (or similar) to parse frontmatter + content
- **No database calls** — all content is static files in the repo

### Frontmatter schema

```yaml
slug: string (unique, URL-safe, lowercase with hyphens)
title: string (article title, 60-80 chars recommended)
metaTitle: string (SEO title, <60 chars)
metaDescription: string (SEO description, <160 chars)
ogImage: string (path to og:image, e.g., /og/article-name.png)
author: string (author name)
date: string (ISO date, YYYY-MM-DD)
keywords: string (comma-separated keywords)
```

### JSON-LD ProfessionalService schema

Create `src/integrations/seo/schema.json`:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "AI Software Revolution",
  "description": "...",
  "areaServed": "PL",
  "telephone": "+48...",
  "email": "contact@...",
  "url": "https://aiweb.com",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+48...",
    "contactType": "Customer Service"
  }
}
```

Include in layout:

```tsx
<script type="application/ld+json">
  {JSON.stringify(schema)}
</script>
```

## Acceptance (DEV)

- ✅ Blog detail page renders markdown correctly with proper meta tags
- ✅ Blog listing page shows all articles paginated
- ✅ Homepage blog section shows 3 most recent articles
- ✅ All articles have unique, SEO-friendly slugs
- ✅ Meta tags (`<title>`, `<meta name="description">`, og:* tags) present in HTML head
- ✅ JSON-LD ProfessionalService schema included and valid
- ✅ Three Polish articles written and placed in `src/content/blog/`
- ✅ Internal links between articles functional
- ✅ Breadcrumb navigation on detail page correct
- ✅ No console errors or TypeScript warnings
- ✅ Responsive design on mobile, tablet, desktop
- ✅ Build passes without warnings
