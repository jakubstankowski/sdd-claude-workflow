import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loadArticles } from "@/lib/blog/loader";

type Article = Awaited<ReturnType<typeof loadArticles>>[number];

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

      <h3 className="text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {article.title}
      </h3>

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

const HomePageBlogSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles()
      .then((data) => setArticles(data.slice(0, 3)))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || articles.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-background border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              Blog
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Najnowsze artykuły
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Wiedza o AI-driven development, Spec Driven Development i budowaniu produktów szybciej.
            </p>
          </div>
          <Link to="/blog" className="shrink-0">
            <Button variant="outline" size="sm">
              Wszystkie artykuły →
            </Button>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomePageBlogSection;
