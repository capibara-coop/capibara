import { notFound } from "next/navigation";
import { getArticleBySlug, getStrapiMediaUrl } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdown";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import { Clock } from "lucide-react";

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

  return (
    <MainLayout>
      <div className="space-y-8">
        <Link
          href="/articoli"
          className="inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
        >
          ← Torna agli articoli
        </Link>

        <article className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-wide text-zinc-400">
              <span>Articolo</span>
              {article.isPremium && (
                <span className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs text-amber-200">
                  Abbonati
                </span>
              )}
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white">
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
            <p className="text-lg text-zinc-300">{article.excerpt}</p>
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
              className="prose prose-invert max-w-none text-zinc-300"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(article.body) }}
            />
          )}

          {article.tags?.data && article.tags.data.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10">
              {article.tags.data.map((tag) => (
                <span
                  key={tag.attributes.slug}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300"
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

