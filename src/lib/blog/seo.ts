import { Article } from "./loader";

export type MetaTags = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  canonical: string;
};

const DOMAIN = "https://aiweb.com";

export function generateArticleMetaTags(article: Article): MetaTags {
  const url = `${DOMAIN}/blog/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    ogTitle: article.title,
    ogDescription: article.metaDescription,
    ogImage: article.ogImage.startsWith("http")
      ? article.ogImage
      : `${DOMAIN}${article.ogImage}`,
    ogUrl: url,
    ogType: "article",
    canonical: url,
  };
}
