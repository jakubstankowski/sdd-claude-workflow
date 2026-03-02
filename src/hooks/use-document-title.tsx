import { useEffect } from "react";

export type MetaTags = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
};

export function useDocumentTitle(metaTags: MetaTags): void {
  useEffect(() => {
    document.title = metaTags.title;

    const updateOrCreateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateOrCreateProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateOrCreateMeta("description", metaTags.description);

    if (metaTags.ogTitle) {
      updateOrCreateProperty("og:title", metaTags.ogTitle);
    }
    if (metaTags.ogDescription) {
      updateOrCreateProperty("og:description", metaTags.ogDescription);
    }
    if (metaTags.ogImage) {
      updateOrCreateProperty("og:image", metaTags.ogImage);
    }
    if (metaTags.ogUrl) {
      updateOrCreateProperty("og:url", metaTags.ogUrl);
    }

    if (metaTags.canonical) {
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", metaTags.canonical);
    }
  }, [metaTags]);
}
