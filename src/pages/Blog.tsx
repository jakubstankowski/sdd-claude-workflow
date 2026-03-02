import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loadArticles } from "@/lib/blog/loader";
import { useDocumentTitle } from "@/hooks/use-document-title";

type Article = Awaited<ReturnType<typeof loadArticles>>[number];

const ARTICLES_PER_PAGE = 10;

const ACCENT_COLORS = [
  "from-violet-500/10 to-violet-500/5 border-violet-500/30 hover:border-violet-500/60",
  "from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/60",
  "from-emerald-500/10 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/60",
];

const BADGE_COLORS = [
  "bg-violet-500/15 text-violet-400",
  "bg-cyan-500/15 text-cyan-400",
  "bg-emerald-500/15 text-emerald-400",
];

const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
  const formattedDate = new Date(article.date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const firstKeyword = article.keywords?.split(",")[0]?.trim() ?? "";

  return (
    <Link
      to={`/blog/${article.slug}`}
      className={`group flex flex-col rounded-xl border bg-gradient-to-br p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`}
    >
      {firstKeyword && (
        <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${BADGE_COLORS[index % BADGE_COLORS.length]}`}>
          {firstKeyword}
        </span>
      )}

      <h2 className="text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {article.title}
      </h2>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
        {article.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-t border-white/10 pt-4">
        <span>{article.author?.split(" - ")[0]}</span>
        <time dateTime={article.date}>{formattedDate}</time>
      </div>
    </Link>
  );
};

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useDocumentTitle({
    title: "Blog — aplikacjawai.pl",
    description: "Artykuły o AI-driven development, automatyzacji i szybkiej budowie aplikacji.",
    canonical: "https://aplikacjawai.pl/blog",
  });

  useEffect(() => {
    loadArticles()
      .then(setArticles)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Ładowanie artykułów…</p>
      </main>
    );
  }

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Strona główna</Link>
          <span>/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        {/* Header */}
        <div className="mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Blog</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Wszystkie artykuły
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Wiedza o AI-driven development, Spec Driven Development i budowaniu produktów szybciej.
          </p>
        </div>

        {/* Articles */}
        {paginatedArticles.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={startIndex + i}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex flex-col items-center gap-3 border-t border-border pt-10">
                <p className="text-sm text-muted-foreground">
                  Strona {currentPage} z {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    ← Poprzednia
                  </Button>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  >
                    Następna →
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-border bg-muted/30 p-16 text-center">
            <p className="text-muted-foreground">Brak artykułów do wyświetlenia.</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default Blog;
