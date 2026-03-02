import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  ogImage?: string;
};

const BlogCard = ({ slug, title = "Untitled", date = "", excerpt = "", ogImage }: Props) => {
  const truncatedTitle = title?.length > 60 ? `${title.substring(0, 60)}...` : title;
  const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg">
<div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
          {truncatedTitle}
        </h3>
        <time className="mt-2 text-sm text-muted-foreground">{formattedDate}</time>
        <p className="mt-3 flex-1 line-clamp-3 text-sm text-muted-foreground">
          {excerpt}
        </p>
        <Link to={`/blog/${slug}`} className="mt-4">
          <Button variant="outline" className="w-full">
            Czytaj więcej
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
