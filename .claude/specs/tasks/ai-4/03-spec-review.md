# Specification Review: Blog Module — SEO Machine

Task ID: ai-4

---

## Summary

**Overall assessment: PASS WITH ISSUES**

The specification correctly captures the core requirements from the task and provides a detailed, implementable blueprint. However, there are clarity gaps around SSR implementation (which was clarified as not needed), missing markdown rendering library specifications, and some undocumented assumptions about implementation details (pagination, breadcrumbs, excerpt handling) that are reasonable but not grounded in the original task.

---

## Findings

### Critical Issues

None.

### Non-Critical Issues

1. **SSR Implementation Confusion** (Section: Behavior/Context)
   - The spec says "Vite is typically CSR-only" but doesn't explicitly confirm that we are implementing CSR (not SSR) despite the user's clarification.
   - **Recommendation:** Add explicit statement: "This implementation uses client-side rendering (CSR); articles are static markdown files loaded and rendered in the browser. This satisfies the requirement for no lazy-loading of article content."

2. **Missing Markdown Rendering Library** (Section: Data/API)
   - The spec mentions `gray-matter` for frontmatter parsing but does NOT specify which markdown renderer to use (`markdown-it`, `remark`, `marked`, etc.).
   - **Recommendation:** Add: "Markdown content is rendered using [library TBD]. Specify library choice during implementation planning."

3. **Keyword Saturation Vagueness** (Section: Behavior/SEO requirements)
   - "Every article saturated with high-intent keywords" is not quantified (e.g., keyword density, minimum occurrences).
   - **Recommendation:** Clarify with the user: is there a target keyword density (e.g., 2-3% for main keywords) or is this left to content writer judgment?

4. **og:image Fallback Path** (Section: Edge Cases)
   - "Missing og:image → Use site default fallback og:image" specifies the behavior but not the path to the fallback image.
   - **Recommendation:** Define fallback path (e.g., `/og/default.png` or logo path).

5. **Article Title Truncation Length** (Section: Edge Cases)
   - "Very long article titles → Truncate in card preview, show full in detail page" does not specify truncation length.
   - **Recommendation:** Add: "Truncate to 60 characters for consistency with `metaTitle` max length."

### Unclear or Ambiguous Sections

1. **Blog Listing Page Scope** (Section: In scope)
   - The original task does NOT explicitly mention a dedicated blog listing page (`/blog`). It only specifies:
     - A blog detail page (implied by "every blog entry")
     - A homepage section with 3 recent articles
   - The spec adds a full `/blog` route with pagination. While reasonable for a complete blog module, this is an **inferred requirement, not explicit**.

2. **Breadcrumb Navigation** (Section: Behavior/Blog detail page)
   - "Breadcrumb navigation: Home > Blog > [Article Title]" is NOT mentioned in the task.
   - This is a reasonable UX addition but not required by the original task.

3. **Pagination Page Size** (Section: Behavior/Blog listing page)
   - "Pagination: 10 articles per page" is not justified in the task. Why 10 and not 5, 15, or infinite scroll?
   - **Recommendation:** Clarify whether 10 is a hard requirement or a reasonable default.

4. **Excerpt Extraction** (Section: Behavior/Blog listing page)
   - "Cards with: title, date, short excerpt (first 150 chars of content)" — the 150-char limit is not in the task.
   - Task only says "short description" which could come from `metaDescription` instead.

5. **Date Field Timezone** (Section: Data/API/Frontmatter schema)
   - `date: string (ISO date, YYYY-MM-DD)` does not specify timezone handling or whether times are needed.
   - Should be clarified if only date (no time) or if timezone-aware timestamps are required.

### Invented or Unsupported Requirements

1. **Blog listing page at `/blog`** — Not explicitly required by task; inferred as good UX.
2. **Breadcrumb navigation** — Common pattern but not in task.
3. **Pagination** — Reasonable for scalability but no size requirement in task.
4. **Excerpt extraction from article body** — Task only specifies "short description," which could be a frontmatter field.

These are sensible additions for a complete blog module, but they extend beyond the explicit task scope.

---

## Assumptions Detected

| Assumption | Explicit in Spec? | Risk Level |
|-----------|------------------|-----------|
| Using `gray-matter` library for frontmatter parsing | Mentioned but not required | Low |
| Using a markdown renderer library (not specified which) | NO | Medium |
| JSON-LD schema stored in separate file (`src/integrations/seo/schema.json`) | Yes, but not justified | Low |
| og:image files are created/provided separately | NO | Medium |
| Pagination size: 10 items per page | Yes, but not justified | Low |
| Breadcrumb navigation implementation | Yes, but not required by task | Low |
| Excerpt source: first 150 chars of markdown body | Yes, but could be frontmatter field | Low |
| Sorting by `date` field (descending) for "most recent" | Implied but not explicit | Low |
| SSR/SSG not implemented (CSR only) | NO | High |
| Meta descriptions provided in frontmatter (not auto-generated) | Implied in frontmatter schema | Low |

---

## Recommendation

**Proceed with revisions:**

Before implementation, clarify with the user:

1. **SSR clarification:** Confirm explicit CSR-only implementation (no pre-rendering at build time).
2. **Markdown renderer:** Specify which library to use.
3. **Blog listing page:** Confirm scope — is the full `/blog` route required, or just homepage section + detail pages?
4. **Pagination:** Confirm 10-per-page is acceptable, or adjust.
5. **og:image fallback:** Define fallback path.
6. **Excerpt source:** Should excerpt come from first N chars of content or from a separate frontmatter field?

After clarifications, the spec is ready for implementation.

---

## Notes

- The specification is well-structured and covers all major components.
- The acceptance criteria are clear and testable.
- Edge cases are thoughtfully addressed.
- Main gap: some implementation details (breadcrumbs, pagination, excerpt extraction) were inferred rather than explicitly required, which is reasonable but should be confirmed with the user.
