import { getVideoEpisodes, extractHeroImage } from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import ContentCard, { formatDate, getKindAccent } from "@/components/ContentCard";
import type { Show } from "@/lib/api";
import Link from "next/link";

export default async function VideoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const { data: episodes, pagination } = await getVideoEpisodes(page, 12);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Video</h1>
          <p className="mt-2 text-zinc-400">
            Tutti gli episodi video di Capibara Originals
          </p>
        </div>

        {episodes.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 p-12 text-center">
            <p className="text-zinc-400">Nessun video disponibile al momento.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => {
                const showData = episode.show?.data;
                const showKind = 
                  (showData?.attributes?.kind as Show["kind"]) ?? "video";
                const accent = getKindAccent(showKind);

                const { url: imageUrl, alt: imageAltRaw } = extractHeroImage(episode.heroImage);
                const imageAlt = imageAltRaw ?? episode.title;

                return (
                  <ContentCard
                    key={episode.slug}
                    entry={{
                      title: episode.title ?? "Untitled",
                      date: formatDate(episode.publishDate),
                      summary: episode.synopsis ?? episode.summary ?? "",
                      tag: "Video",
                      accent,
                      imageUrl: imageUrl ?? undefined,
                      imageAlt,
                      locked: episode.isPremium ?? false,
                      slug: episode.slug,
                      type: "video",
                    }}
                  />
                );
              })}
            </div>

            {pagination.pageCount > 1 && (
              <div className="flex items-center justify-center gap-4">
                {pagination.page > 1 && (
                  <Link
                    href={`/video?page=${pagination.page - 1}`}
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
                    href={`/video?page=${pagination.page + 1}`}
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

