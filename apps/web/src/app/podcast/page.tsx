import { getPodcastEpisodes, extractHeroImage } from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import ContentCard, { formatDate, getKindAccent } from "@/components/ContentCard";
import type { Show } from "@/lib/api";
import Link from "next/link";

export default async function PodcastPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const { data: episodes, pagination } = await getPodcastEpisodes(page, 12);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Podcast</h1>
          <p className="mt-2 text-zinc-400">
            Tutti gli episodi podcast di VentiQuaranta
          </p>
        </div>

        {episodes.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 p-12 text-center">
            <p className="text-zinc-400">Nessun podcast disponibile al momento.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => {
                const showData = episode.show?.data;
                const showKind = 
                  (showData?.attributes?.kind as Show["kind"]) ?? "podcast";
                const accent = getKindAccent(showKind);

                const { url, alt } = extractHeroImage(episode.heroImage);

                return (
                  <ContentCard
                    key={episode.slug}
                    entry={{
                      title: episode.title ?? "Untitled",
                      date: formatDate(episode.publishDate),
                      summary: episode.summary ?? episode.synopsis ?? "",
                      tag: "Podcast",
                      accent,
                      imageUrl: url ?? undefined,
                      imageAlt: alt ?? episode.title,
                      locked: episode.isPremium ?? false,
                      slug: episode.slug,
                      type: "podcast",
                    }}
                  />
                );
              })}
            </div>

            {pagination.pageCount > 1 && (
              <div className="flex items-center justify-center gap-4">
                {pagination.page > 1 && (
                  <Link
                    href={`/podcast?page=${pagination.page - 1}`}
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
                    href={`/podcast?page=${pagination.page + 1}`}
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

