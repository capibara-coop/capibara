import { getArticles, extractHeroImage } from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import ContentCard, { formatDate } from "@/components/ContentCard";
import Link from "next/link";

export default async function ArticoliPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const { data: articles, pagination } = await getArticles(page, 12);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Articoli</h1>
          <p className="mt-2 text-zinc-400">
            Approfondimenti, analisi e articoli editoriali
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 p-12 text-center">
            <p className="text-zinc-400">Nessun articolo disponibile al momento.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const { url, alt } = extractHeroImage(article.heroImage);

                return (
                  <ContentCard
                    key={article.slug}
                    entry={{
                      title: article.title ?? "Untitled",
                      date: formatDate(article.publishDate),
                      summary: article.excerpt ?? "",
                      tag: "Articolo",
                      accent: "from-blue-500/30 via-indigo-500/20 to-purple-900/40",
                      imageUrl: url ?? undefined,
                      imageAlt: alt ?? article.title,
                      locked: article.isPremium ?? false,
                      slug: article.slug,
                      type: "article",
                    }}
                  />
                );
              })}
            </div>

            {pagination.pageCount > 1 && (
              <div className="flex items-center justify-center gap-4">
                {pagination.page > 1 && (
                  <Link
                    href={`/articoli?page=${pagination.page - 1}`}
                    className="rounded-full border border-white/10 px-6 py-2 text-sm text-zinc-300 transition hover:border-white/40 hover:text-white"
                  >
                    ← Precedente
                  </Link>
                )}
                <span className="text-sm text-zinc-500">
                  Pagina {pagination.page} di {pagination.pageCount}
                </span>
                {pagination.page < pagination.pageCount && (
                  <Link
                    href={`/articoli?page=${pagination.page + 1}`}
                    className="rounded-full border border-white/10 px-6 py-2 text-sm text-zinc-300 transition hover:border-white/40 hover:text-white"
                  >
                    Successiva →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

