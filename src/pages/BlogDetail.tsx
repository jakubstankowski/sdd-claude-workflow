import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { loadArticle } from "@/lib/blog/loader";
import { renderMarkdown } from "@/lib/blog/markdown";
import { generateArticleMetaTags } from "@/lib/blog/seo";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<
    Awaited<ReturnType<typeof loadArticle>>
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      const data = await loadArticle(slug);
      if (!data) {
        setNotFound(true);
      } else {
        setArticle(data);
      }
      setIsLoading(false);
    };
    fetchArticle();
  }, [slug]);

  useDocumentTitle(
    article
      ? { ...generateArticleMetaTags(article), description: article.metaDescription }
      : { title: "Artykuł nie znaleziony", description: "Artykuł nie istnieje." }
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Ładowanie artykułu…</p>
      </main>
    );
  }

  if (notFound || !article) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Artykuł nie znaleziony</h1>
          <p className="text-muted-foreground mb-8">Artykuł którego szukasz nie istnieje lub został usunięty.</p>
          <Link to="/blog"><Button>← Wróć do bloga</Button></Link>
        </div>
      </main>
    );
  }

  const htmlContent = renderMarkdown(article.content);
  const formattedDate = new Date(article.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <article itemScope itemType="https://schema.org/BlogPosting">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1
              itemProp="headline"
              className="text-4xl font-bold tracking-tight text-foreground leading-tight mb-6"
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm border-t border-b border-border py-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {article.author.charAt(0)}
                </div>
                <address itemProp="author" className="not-italic font-medium text-foreground">
                  {article.author}
                </address>
              </div>
              <time
                itemProp="datePublished"
                dateTime={article.date}
                className="text-muted-foreground"
              >
                {formattedDate}
              </time>
            </div>
          </header>

          {/* Article body — prose plugin active */}
          <section itemProp="articleBody">
            <div
              className="prose prose-neutral dark:prose-invert max-w-none
                prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-l-[3px] prose-h2:border-primary prose-h2:pl-4 prose-h2:not-italic
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-primary
                prose-p:text-base prose-p:leading-7 prose-p:my-4
                prose-a:text-primary prose-a:font-medium prose-a:underline-offset-2 hover:prose-a:opacity-80
                prose-strong:font-semibold prose-strong:text-foreground
                prose-code:text-sm prose-code:bg-muted prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:text-sm
                prose-ul:my-4 prose-ul:pl-6 prose-ol:my-4 prose-ol:pl-6
                prose-li:my-1 prose-li:leading-7
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:bg-muted/40 prose-blockquote:py-1 prose-blockquote:rounded-r
                prose-table:text-sm prose-th:bg-muted prose-th:p-2 prose-th:text-left prose-td:p-2 prose-td:border prose-td:border-border
                prose-hr:border-border"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </section>

          {/* Keywords */}
          <footer className="mt-12 pt-6 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Słowa kluczowe</p>
            <div itemProp="keywords" className="flex flex-wrap gap-2">
              {article.keywords.split(",").map((kw) => (
                <span
                  key={kw}
                  className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                >
                  {kw.trim()}
                </span>
              ))}
            </div>
          </footer>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link to="/blog">
              <Button variant="outline">← Wróć do bloga</Button>
            </Link>
            <Link to="/">
              <Button>Poznaj nasze usługi →</Button>
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
};

export default BlogDetail;
