export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  author: string;
  date: string;
  keywords: string;
  content: string;
  excerpt: string;
};

function parseFrontmatter(text: string): { data: Record<string, string>; content: string } {
  // Try multiple patterns for frontmatter (handles different line endings)
  let match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    // Try without leading/trailing newlines
    match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  }

  if (!match) {
    return { data: {}, content: text };
  }

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  frontmatter.split(/\r?\n/).forEach((line) => {
    line = line.trim();
    if (!line) return;

    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (key && value) {
        data[key] = value;
      }
    }
  });

  return { data, content };
}

const articleModules = import.meta.glob(
  "../../content/blog/*.md",
  { query: "?raw", import: "default" }
);

export async function loadArticles(): Promise<Article[]> {
  const articles: Article[] = [];

  for (const [path, getContent] of Object.entries(articleModules)) {
    const content = await getContent();
    if (typeof content !== "string") continue;

    const { data, content: body } = parseFrontmatter(content);

    console.log("Parsed article:", { path, data, bodyLength: body.length });

    const excerpt = body.substring(0, 150).replace(/\n/g, " ");

    articles.push({
      slug: data.slug || "",
      title: data.title || "",
      metaTitle: data.metaTitle || "",
      metaDescription: data.metaDescription || "",
      ogImage: data.ogImage || "",
      author: data.author || "",
      date: data.date || "",
      keywords: data.keywords || "",
      content: body,
      excerpt,
    });
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function loadArticle(slug: string): Promise<Article | null> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug) || null;
}
