import {
  getLatestVideoEpisodes,
  getLatestPodcastEpisodes,
  getPremiumNewsletterIssues,
  getLatestArticles,
} from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import ContentCard, { formatDate, getKindAccent } from "@/components/ContentCard";
import type { Show } from "@/lib/api";

export default async function FeedPage() {
  const [videoEpisodes, podcastDrops, premiumLetters, articles] = await Promise.all([
    getLatestVideoEpisodes(6),
    getLatestPodcastEpisodes(6),
    getPremiumNewsletterIssues(6),
    getLatestArticles(6),
  ]);

  const validVideoEpisodes = videoEpisodes.filter((ep) => ep != null);
  const validPodcastDrops = podcastDrops.filter((ep) => ep != null);
  const validPremiumLetters = premiumLetters.filter((ep) => ep != null);
  const validArticles = articles.filter((art) => art != null);

  const allContent = [
    ...validVideoEpisodes.map((ep) => ({
      ...ep,
      contentType: "video" as const,
    })),
    ...validPodcastDrops.map((ep) => ({
      ...ep,
      contentType: "podcast" as const,
    })),
    ...validPremiumLetters.map((ep) => ({
      ...ep,
      contentType: "newsletter" as const,
    })),
    ...validArticles.map((art) => ({
      ...art,
      contentType: "article" as const,
    })),
  ].sort((a, b) => {
    const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Feed</h1>
          <p className="mt-2 text-zinc-400">
            Tutti i contenuti in ordine cronologico
          </p>
        </div>

        {allContent.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 p-12 text-center">
            <p className="text-zinc-400">Nessun contenuto disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allContent.map((item) => {
              // Only video, podcast, and newsletter have 'show' property
              const showData = 
                item.contentType !== "article" && "show" in item
                  ? (item as { show?: { data?: { attributes?: { kind?: Show["kind"] } } } }).show?.data
                  : undefined;
              const showKind =
                (showData?.attributes?.kind as Show["kind"]) ??
                item.contentType;
              const accent = getKindAccent(showKind);

              return (
                <ContentCard
                  key={`${item.contentType}-${item.slug}`}
                  entry={{
                    title: item.title ?? "Untitled",
                    date: formatDate(item.publishDate),
                    summary:
                      item.contentType === "video"
                        ? item.synopsis ?? item.summary ?? ""
                        : item.contentType === "podcast"
                          ? item.summary ?? item.synopsis ?? ""
                          : item.contentType === "article"
                            ? item.excerpt ?? ""
                            : item.excerpt ?? item.summary ?? "",
                    tag:
                      item.contentType === "video"
                        ? "Video"
                        : item.contentType === "podcast"
                          ? "Podcast"
                          : item.contentType === "article"
                            ? "Articolo"
                            : "Newsletter",
                    accent:
                      item.contentType === "article"
                        ? "from-blue-500/30 via-indigo-500/20 to-purple-900/40"
                        : accent,
                    locked: item.isPremium ?? false,
                    slug: item.slug,
                    type: item.contentType,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

