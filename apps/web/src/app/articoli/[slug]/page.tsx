import { notFound } from "next/navigation";
import { getArticleBySlug, getStrapiMediaUrl } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdown";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import { Clock } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Articolo non trovato",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.coop";
  const articleUrl = `${siteUrl}/articoli/${slug}`;
  const imageUrl = article.heroImage?.data?.attributes?.url
    ? getStrapiMediaUrl(article.heroImage.data.attributes.url) || `${siteUrl}${article.heroImage.data.attributes.url}`
    : `${siteUrl}/logo_capibara.png`;

  const description = article.excerpt || article.body?.substring(0, 160) || "Leggi l'articolo completo su Capibara";

  return {
    title: article.title,
    description,
    keywords: article.tags?.data?.map((tag) => tag.attributes.name) || [],
    authors: article.author ? [{ name: article.author }] : undefined,
    openGraph: {
      type: "article",
      locale: "it_IT",
      url: articleUrl,
      siteName: "Capibara",
      title: article.title,
      description,
      publishedTime: article.publishDate || undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.heroImage?.data?.attributes?.alternativeText || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.coop";
  const articleUrl = `${siteUrl}/articoli/${slug}`;
  const imageUrl = article.heroImage?.data?.attributes?.url
    ? getStrapiMediaUrl(article.heroImage.data.attributes.url) || `${siteUrl}${article.heroImage.data.attributes.url}`
    : `${siteUrl}/logo_capibara.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || article.body?.substring(0, 160) || "",
    image: imageUrl,
    datePublished: article.publishDate || undefined,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author,
        }
      : {
          "@type": "Organization",
          name: "Capibara",
        },
    publisher: {
      "@type": "Organization",
      name: "Capibara",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo_capibara.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.tags?.data?.map((tag) => tag.attributes.name).join(", ") || undefined,
  };

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <Link
          href="/articoli"
          className="back-link"
        >
          ← Torna agli articoli
        </Link>

        <article className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-wide meta-text">
              <span>Articolo</span>
              {article.isPremium && (
                <span className="locked-badge">
                  Abbonati
                </span>
              )}
            </div>
            <h1 className="page-title text-4xl font-semibold leading-tight">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
              {article.publishDate && (
                <span className="uppercase tracking-wide">
                  {new Date(article.publishDate).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {article.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} min di lettura
                </span>
              )}
              {article.author && (
                <span>di {article.author}</span>
              )}
            </div>
          </div>

          {article.excerpt && (
            <p className="article-excerpt">{article.excerpt}</p>
          )}

          {article.heroImage?.data?.attributes?.url && (
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <img
                src={
                  getStrapiMediaUrl(article.heroImage.data.attributes.url) ??
                  article.heroImage.data.attributes.url
                }
                alt={article.heroImage.data.attributes.alternativeText || article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {article.body && (
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(article.body) }}
            />
          )}

          {article.tags?.data && article.tags.data.length > 0 && (
            <div className="article-tags-container">
              {article.tags.data.map((tag) => (
                <span
                  key={tag.attributes.slug}
                  className="article-tag"
                >
                  {tag.attributes.name}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </MainLayout>
  );
}

