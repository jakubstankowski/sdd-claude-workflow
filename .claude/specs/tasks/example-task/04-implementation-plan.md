# Implementation Plan: Blog Module — SEO Machine

Task ID: ai-4

---

## Overview

This plan details the step-by-step implementation of a static markdown-based blog module integrated into the existing React/Vite + React Router stack. The implementation covers:

1. **Infrastructure** — Directory structure, dependencies, utility functions
2. **Core Pages & Routes** — Blog detail page, blog listing page
3. **Components** — Reusable blog card component, homepage section
4. **Content** — Three Polish articles with metadata
5. **SEO Integration** — Meta tags, JSON-LD schema
6. **Verification** — Testing and validation

---

## Phase 1: Infrastructure Setup

### 1.1 Create directory structure

Create the following directories:

```
src/content/blog/           # Content storage (markdown files)
src/lib/blog/               # Blog utilities
src/integrations/seo/       # SEO schemas
```

### 1.2 Install dependencies

Install the following npm packages:

- **`gray-matter`** — Parse YAML frontmatter from markdown files
- **`markdown-it`** — Render markdown to HTML (or alternative: `remark`, `marked`)
- **`clsx`** (or `classnames`) — Class name utility (likely already installed)

Command:
```bash
npm install gray-matter markdown-it
npm install --save-dev @types/markdown-it
```

### 1.3 Create blog data loader utility

Create `src/lib/blog/loader.ts`:

**Purpose:** Load all blog articles from markdown files and parse frontmatter

**Exports:**
- `loadArticles()` → Returns array of articles sorted by date (descending)
- `loadArticle(slug)` → Loads a specific article by slug
- `type Article` → Defines the article data structure with frontmatter + content

**Implementation details:**
- Use `gray-matter` to parse frontmatter (YAML) and body (markdown)
- Validate frontmatter schema (slug, title, metaTitle, metaDescription, ogImage, author, date, keywords)
- Extract excerpt (first 150 characters of body) for listing page
- Handle missing articles gracefully
- Sort by `date` field (ISO string, YYYY-MM-DD) in descending order

### 1.4 Create markdown rendering utility

Create `src/lib/blog/markdown.ts`:

**Purpose:** Render markdown to HTML with proper semantic tags

**Exports:**
- `renderMarkdown(content: string): string` → Converts markdown body to safe HTML

**Implementation details:**
- Use `markdown-it` with options for safe rendering
- Ensure images use responsive classes (Tailwind)
- Preserve semantic HTML structure (`<h1>`, `<p>`, `<a>`, `<article>`, etc.)
- Handle code blocks with syntax highlighting if needed (or leave as-is for now)

### 1.5 Create SEO utilities

Create `src/lib/blog/seo.ts`:

**Purpose:** Generate SEO meta tags for articles

**Exports:**
- `generateArticleMetaTags(article: Article)` → Returns meta tag object
- `type MetaTags` → Type definition for meta tag data

**Implementation details:**
- Extract `metaTitle`, `metaDescription`, `ogImage`, `slug` from article
- Generate full canonical URL: `https://domain.com/blog/{slug}`
- Generate OpenGraph tags: `og:type`, `og:title`, `og:description`, `og:image`, `og:url`
- Return structured object (not JSX)

### 1.6 Create JSON-LD schema file

Create `src/integrations/seo/schema.json`:

**Purpose:** Site-level ProfessionalService schema

**Content:** Fill in the template from spec with actual company details:
- Name: "AI Software Revolution"
- Description: (from website content)
- areaServed: "PL"
- contactPoint: (actual phone/email from company info)
- foundingDate: (actual year)

**Note:** This is a static JSON file; load it in the layout and output as `<script type="application/ld+json">`.

---

## Phase 2: Pages & Routes

### 2.1 Create Blog Listing page

Create `src/pages/Blog.tsx`:

**Route:** `/blog`

**Functionality:**
- Load all articles via `loadArticles()` from loader utility
- Display articles as cards in a grid (responsive: 1 column mobile, 2 columns tablet, 3 columns desktop)
- Each card shows: title, date, excerpt (first 150 chars), "Read more" button
- Implement pagination: 10 articles per page
- Add "Page X of Y" indicator
- Previous/Next page buttons
- Set page meta tags: `<title>`, `<meta name="description">`

**Implementation details:**
- Use `useState` for current page state
- Calculate paginated articles: `articles.slice((page - 1) * 10, page * 10)`
- Use `BlogCard` component (to be created in Phase 3)
- Breadcrumb: Home > Blog
- Handle edge case: if no articles, show "No articles yet" message

### 2.2 Create Blog Detail page

Create `src/pages/BlogDetail.tsx`:

**Route:** `/blog/:slug`

**Functionality:**
- Extract slug from URL params
- Load article via `loadArticle(slug)` from loader utility
- Display article title (H1)
- Render article markdown body as HTML
- Display meta information: author, date, keywords
- Breadcrumb: Home > Blog > [Title]
- Internal links to other articles (manually placed in markdown content)
- Link to relevant service offering (manually placed in markdown content)
- Handle edge case: article not found → show error message with link to blog listing

**Implementation details:**
- Use `useParams()` from react-router-dom to get slug
- Set document meta tags using `useEffect` and `useDocumentTitle` hook (or manual DOM manipulation)
- Render markdown using `renderMarkdown()` utility
- Extract and apply SEO meta tags using `generateArticleMetaTags()`
- Semantic HTML: wrap content in `<article>` tag
- Handle missing articles gracefully (404 behavior)

### 2.3 Add routes to App.tsx

Modify `src/App.tsx`:

**Add routes:**
```
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogDetail />} />
```

**Placement:** Before the catch-all `"*"` route (as per existing comment in App.tsx)

---

## Phase 3: Components

### 3.1 Create BlogCard component

Create `src/components/BlogCard.tsx`:

**Purpose:** Reusable card displaying article preview

**Props:**
```
{
  slug: string
  title: string
  date: string (ISO date, YYYY-MM-DD)
  excerpt: string
  ogImage?: string
}
```

**Functionality:**
- Display card with image (if provided), title, date, excerpt
- Truncate title to 60 characters if too long
- "Read more" button linking to `/blog/{slug}`
- Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- Semantic HTML: `<article>` wrapper per card

**Implementation details:**
- Use Tailwind for styling (card borders, padding, hover effects)
- Use `cn()` for conditional classes
- Use `lucide-react` for date icon if desired
- Fallback image path if `ogImage` missing

### 3.2 Create HomePageBlogSection component

Create `src/components/HomePageBlogSection.tsx`:

**Purpose:** Display 3 most recent articles on homepage

**Functionality:**
- Load articles via `loadArticles()`
- Show top 3 articles
- Each article displayed as a card using `BlogCard`
- "View all articles" button linking to `/blog`
- Responsive grid: 1 column mobile, 2-3 columns desktop
- Handle edge case: if no articles, gracefully hide section or show placeholder

**Implementation details:**
- Use `useMemo` to avoid reloading articles on every render
- Use `BlogCard` component
- Implement optional image display with fallback
- Responsive Tailwind classes

### 3.3 Create Breadcrumb component (if not exists)

Check if shadcn-ui breadcrumb is already installed in `src/components/ui/breadcrumb.tsx`.

If not present, install via shadcn CLI:
```bash
npx shadcn-ui@latest add breadcrumb
```

If present, verify it's imported and functional.

**Usage in detail pages:**
- `<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: articleTitle }]} />`

---

## Phase 4: Homepage Integration

### 4.1 Add HomePageBlogSection to Index page

Modify `src/pages/Index.tsx`:

**Changes:**
- Import `HomePageBlogSection` component
- Add `<HomePageBlogSection />` to the main layout, positioned after one of the existing sections (or after Hero for prominence)

**Example placement:**
```
<main className="min-h-screen bg-background">
  <Hero />
  <HomePageBlogSection />
  <ComparisonSection />
  ...
</main>
```

---

## Phase 5: Content Creation

### 5.1 Write Article 1: "Jak AI skraca development o 70%?"

Create `src/content/blog/jak-ai-skraca-development-o-70.md`

**Frontmatter:**
```yaml
slug: jak-ai-skraca-development-o-70
title: Jak AI skraca development o 70%?
metaTitle: AI development automation | Skrót czasu na kodowanie
metaDescription: Poznaj jak AI i automatyzacja workflow skracają czas development. Szybsze MVP, wyższa jakość, niższe koszty.
ogImage: /og/ai-skraca-development.png
author: AI Software Revolution
date: 2026-02-28
keywords: workflow automation, AI-assisted coding, faster MVP
```

**Content requirements:**
- Minimum 1000 characters
- H1 in content: "Jak AI skraca development o 70%?"
- H2 & H3 headings containing: "workflow automation", "AI-assisted coding", "faster MVP"
- Internal links to other two articles: link to `/blog/dlaczego-software-w-2026-jest-tanszy` and `/blog/od-pomyslu-do-saas-w-tydzien-to-mozliwe`
- Link to Rapid Prototyping service offer (anchor: `/offer#rapid-prototyping` or similar)
- Target keywords naturally woven throughout

**Goal:** Showcase delivery speed, target clients looking to save time

---

### 5.2 Write Article 2: "Dlaczego software w 2026 jest tańszy niż myślisz?"

Create `src/content/blog/dlaczego-software-w-2026-jest-tanszy.md`

**Frontmatter:**
```yaml
slug: dlaczego-software-w-2026-jest-tanszy
title: Dlaczego software w 2026 jest tańszy niż myślisz?
metaTitle: AI applications cost | Jak oszczędzić na software
metaDescription: Dowiedz się, dlaczego software w erze AI jest tańszy. AI application cost vs tradycyjna budowa. Szybko, tanio, efektywnie.
ogImage: /og/software-tanszy.png
author: AI Software Revolution
date: 2026-02-27
keywords: AI application cost, IT cost optimization, affordable software
```

**Content requirements:**
- Minimum 1000 characters
- H1 in content: "Dlaczego software w 2026 jest tańszy niż myślisz?"
- H2 & H3 headings containing: "AI application cost", "IT cost optimization", "affordable software"
- Internal links to other two articles: `/blog/jak-ai-skraca-development-o-70` and `/blog/od-pomyslu-do-saas-w-tydzien-to-mozliwe`
- Link to pricing/cost-related service page
- Target keywords naturally woven throughout

**Goal:** Attract clients with smaller budgets, debunk the myth that good software is expensive

---

### 5.3 Write Article 3: "Od pomysłu do SaaS w tydzień — to możliwe?"

Create `src/content/blog/od-pomyslu-do-saas-w-tydzien-to-mozliwe.md`

**Frontmatter:**
```yaml
slug: od-pomyslu-do-saas-w-tydzien-to-mozliwe
title: Od pomysłu do SaaS w tydzień — to możliwe?
metaTitle: MVP in a week | LLM integration & Prompt Engineering
metaDescription: Jak zbudować MVP SaaS w tydzień? LLM integration, Prompt Engineering, i AI-driven development. Sprawdź naszą metodę.
ogImage: /og/saas-tydzien.png
author: AI Software Revolution
date: 2026-02-26
keywords: LLM integration, Prompt Engineering, MVP in a week
```

**Content requirements:**
- Minimum 1000 characters
- H1 in content: "Od pomysłu do SaaS w tydzień — to możliwe?"
- H2 & H3 headings containing: "LLM integration", "Prompt Engineering", "MVP in a week"
- Internal links to other two articles: `/blog/jak-ai-skraca-development-o-70` and `/blog/dlaczego-software-w-2026-jest-tanszy`
- Link to Rapid Prototyping service offer (multiple times)
- Target keywords naturally woven throughout

**Goal:** Direct sales of Rapid Prototyping service

---

### 5.4 Create OG images

Create placeholder or actual og:image files in `public/og/`:

```
public/og/ai-skraca-development.png
public/og/software-tanszy.png
public/og/saas-tydzien.png
```

**Note:** These can be simple designs (e.g., 1200x630px with text overlay). If images don't exist, use fallback og:image.

---

## Phase 6: SEO & Meta Tags Integration

### 6.1 Create useDocumentTitle hook

Create `src/hooks/use-document-title.tsx`:

**Purpose:** Set document title and meta tags on page load

**Exports:**
- `useDocumentTitle(metaTags: MetaTags)` → Updates `<title>`, `<meta>` tags in document head

**Implementation:**
- Use `useEffect` to update DOM meta tags
- Set: `<title>`, `<meta name="description">`, `<meta property="og:*">`, `<link rel="canonical">`
- Handle cleanup on unmount

### 6.2 Load JSON-LD schema in Layout

Modify the root layout (or App.tsx) to include JSON-LD schema:

**Implementation:**
- Import schema from `src/integrations/seo/schema.json`
- Create a `<script type="application/ld+json">` tag in `<head>`
- Use React Helmet or manual DOM manipulation

**Placement:** In the root layout or a dedicated SEO component

### 6.3 Verify meta tag generation

Test that each blog article page outputs correct meta tags:
- `<title>`: `metaTitle` from frontmatter
- `<meta name="description">`: `metaDescription` from frontmatter
- `<meta property="og:image">`: `ogImage` from frontmatter
- `<meta property="og:title">`: `title` from frontmatter
- `<link rel="canonical">`: `https://domain.com/blog/{slug}`

---

## Phase 7: Validation & Testing

### 7.1 Test article loading

- [ ] `loadArticles()` returns all 3 articles sorted by date (descending)
- [ ] `loadArticle(slug)` loads specific article by slug
- [ ] Frontmatter is correctly parsed (all fields present)
- [ ] Missing articles return null or error (handle gracefully)

### 7.2 Test routing

- [ ] `/blog` displays blog listing with all articles
- [ ] `/blog/[slug]` loads correct article
- [ ] Invalid slugs show 404 or error message
- [ ] Pagination works correctly (next/prev buttons, page indicator)

### 7.3 Test components

- [ ] `BlogCard` renders title, date, excerpt, "Read more" button
- [ ] `HomePageBlogSection` shows 3 most recent articles
- [ ] Breadcrumbs display correctly
- [ ] Responsive layout: mobile (1 col), tablet (2 col), desktop (3 col)

### 7.4 Test SEO

- [ ] Meta tags are present in HTML `<head>` for each article
- [ ] JSON-LD schema is valid (test with schema.org validator)
- [ ] Canonical tags are self-referential
- [ ] OG images are accessible (no 404s)
- [ ] Internal links in article content are functional

### 7.5 Test content quality

- [ ] Each article ≥ 1000 characters
- [ ] Keywords are present in H1, H2, H3
- [ ] Internal links to other articles work
- [ ] Links to service offerings are functional
- [ ] No markdown parsing errors

### 7.6 Build validation

- [ ] `npm run build` completes without errors or warnings
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No console errors in browser DevTools
- [ ] No unused variables or imports

---

## Implementation Checklist

**Phase 1: Infrastructure**
- [ ] Create `src/content/blog/` directory
- [ ] Create `src/lib/blog/` directory
- [ ] Create `src/integrations/seo/` directory
- [ ] Install `gray-matter` and `markdown-it`
- [ ] Create `src/lib/blog/loader.ts`
- [ ] Create `src/lib/blog/markdown.ts`
- [ ] Create `src/lib/blog/seo.ts`
- [ ] Create `src/integrations/seo/schema.json`

**Phase 2: Pages & Routes**
- [ ] Create `src/pages/Blog.tsx`
- [ ] Create `src/pages/BlogDetail.tsx`
- [ ] Update `src/App.tsx` with blog routes
- [ ] Create `src/hooks/use-document-title.tsx`

**Phase 3: Components**
- [ ] Create `src/components/BlogCard.tsx`
- [ ] Create `src/components/HomePageBlogSection.tsx`
- [ ] Verify breadcrumb component (shadcn-ui)

**Phase 4: Homepage**
- [ ] Update `src/pages/Index.tsx` with HomePageBlogSection

**Phase 5: Content**
- [ ] Create `src/content/blog/jak-ai-skraca-development-o-70.md`
- [ ] Create `src/content/blog/dlaczego-software-w-2026-jest-tanszy.md`
- [ ] Create `src/content/blog/od-pomyslu-do-saas-w-tydzien-to-mozliwe.md`
- [ ] Create OG images in `public/og/`

**Phase 6: SEO**
- [ ] Integrate JSON-LD schema in layout
- [ ] Verify meta tag generation on article pages
- [ ] Test canonical tags

**Phase 7: Validation**
- [ ] Run all tests in validation section
- [ ] Build passes
- [ ] No TypeScript errors
- [ ] No console errors

---

## Dependencies Summary

**npm packages to install:**
- `gray-matter` — YAML frontmatter parsing
- `markdown-it` — Markdown rendering
- `@types/markdown-it` — TypeScript types

**Existing dependencies used:**
- `react-router-dom` — Routing
- `react` — Component framework
- `tailwindcss` — Styling
- `@/components/ui/*` — shadcn-ui components
- `@tanstack/react-query` — (optional, if querying articles dynamically)

---

## File Summary

**New files created:**

```
Infrastructure:
- src/lib/blog/loader.ts
- src/lib/blog/markdown.ts
- src/lib/blog/seo.ts
- src/integrations/seo/schema.json

Pages:
- src/pages/Blog.tsx
- src/pages/BlogDetail.tsx

Components:
- src/components/BlogCard.tsx
- src/components/HomePageBlogSection.tsx

Hooks:
- src/hooks/use-document-title.tsx

Content:
- src/content/blog/jak-ai-skraca-development-o-70.md
- src/content/blog/dlaczego-software-w-2026-jest-tanszy.md
- src/content/blog/od-pomyslu-do-saas-w-tydzien-to-mozliwe.md

Assets:
- public/og/ai-skraca-development.png
- public/og/software-tanszy.png
- public/og/saas-tydzien.png

Modified files:
- src/App.tsx (add blog routes)
- src/pages/Index.tsx (add HomePageBlogSection)
```

**Total new files:** 13

---

## Notes

- All file paths follow project conventions (PascalCase for components, kebab-case for utilities)
- All code will follow the conventions in `.claude/context/conventions.md`
- TypeScript is strictly enforced; no `any` types
- Markdown rendering uses semantic HTML (`<article>`, `<h1>`, etc.)
- Article content and internal links are manually written/configured (no automatic generation)
- Static markdown files are committed to the repository (no database required)
