/* ArchivioContent: componente client che gestisce ricerca e vista hub iniziale */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/components/ContentCard";
import ContentListItem from "@/components/ContentListItem";
import type {
  VideoEpisode,
  PodcastEpisode,
  NewsletterIssue,
  Article,
} from "@/lib/api";
import { Search } from "lucide-react";

type SearchResults = {
  videos: VideoEpisode[];
  podcasts: PodcastEpisode[];
  newsletters: NewsletterIssue[];
  articles: Article[];
} | null;

type ArchivioContentProps = {
  initialVideos: VideoEpisode[];
  initialPodcasts: PodcastEpisode[];
  initialNewsletters: NewsletterIssue[];
  initialArticles: Article[];
};

export function ArchivioContent({
  initialVideos,
  initialPodcasts,
  initialNewsletters,
  initialArticles,
}: ArchivioContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResults>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setResults(null);
      router.push("/archivio");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}`,
      );
      const data = await response.json();
      setResults(data);
      router.push(`/archivio?q=${encodeURIComponent(trimmed)}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const hasSearchResults =
    !!results &&
    (results.videos.length > 0 ||
      results.podcasts.length > 0 ||
      results.newsletters.length > 0 ||
      results.articles.length > 0);

  const showInitialHub = !results && !loading && !query.trim();

  type UnifiedItem = {
    id: string;
    title: string;
    isoDate: string | null | undefined;
    date: string;
    summary: string;
    tag: string;
    locked: boolean;
    slug?: string;
    type?: "video" | "podcast" | "newsletter" | "article";
  };

  const sortByDateDesc = (a: UnifiedItem, b: UnifiedItem) => {
    const da = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const db = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return db - da;
  };

  const initialUnifiedList: UnifiedItem[] = [
    ...initialVideos.map((episode) => ({
      id: `video-${episode.slug}`,
      title: episode.title ?? "Untitled",
      isoDate: episode.publishDate,
      date: formatDate(episode.publishDate),
      summary: episode.synopsis ?? episode.summary ?? "",
      tag: "Video",
      locked: episode.isPremium ?? false,
      slug: episode.slug,
      type: "video" as const,
    })),
    ...initialPodcasts.map((episode) => ({
      id: `podcast-${episode.slug}`,
      title: episode.title ?? "Untitled",
      isoDate: episode.publishDate,
      date: formatDate(episode.publishDate),
      summary: episode.summary ?? episode.synopsis ?? "",
      tag: "Podcast",
      locked: episode.isPremium ?? false,
      slug: episode.slug,
      type: "podcast" as const,
    })),
    ...initialNewsletters.map((issue) => ({
      id: `newsletter-${issue.slug}`,
      title: issue.title ?? "Untitled",
      isoDate: issue.publishDate,
      date: formatDate(issue.publishDate),
      summary: issue.excerpt ?? issue.summary ?? "",
      tag: "Newsletter",
      locked: issue.isPremium ?? true,
      slug: issue.slug,
      type: "newsletter" as const,
    })),
    ...initialArticles.map((article) => ({
      id: `article-${article.slug}`,
      title: article.title ?? "Untitled",
      isoDate: article.publishDate,
      date: formatDate(article.publishDate),
      summary: article.excerpt ?? "",
      tag: "Articolo",
      locked: article.isPremium ?? false,
      slug: article.slug,
      type: "article" as const,
    })),
  ].sort(sortByDateDesc);

  const searchUnifiedList: UnifiedItem[] | null = results
    ? [
        ...results.videos.map((episode) => ({
          id: `video-${episode.slug}`,
          title: episode.title ?? "Untitled",
          isoDate: episode.publishDate,
          date: formatDate(episode.publishDate),
          summary: episode.synopsis ?? episode.summary ?? "",
          tag: "Video",
          locked: episode.isPremium ?? false,
          slug: episode.slug,
          type: "video" as const,
        })),
        ...results.podcasts.map((episode) => ({
          id: `podcast-${episode.slug}`,
          title: episode.title ?? "Untitled",
          isoDate: episode.publishDate,
          date: formatDate(episode.publishDate),
          summary: episode.summary ?? episode.synopsis ?? "",
          tag: "Podcast",
          locked: episode.isPremium ?? false,
          slug: episode.slug,
          type: "podcast" as const,
        })),
        ...results.newsletters.map((issue) => ({
          id: `newsletter-${issue.slug}`,
          title: issue.title ?? "Untitled",
          isoDate: issue.publishDate,
          date: formatDate(issue.publishDate),
          summary: issue.excerpt ?? issue.summary ?? "",
          tag: "Newsletter",
          locked: issue.isPremium ?? true,
          slug: issue.slug,
          type: "newsletter" as const,
        })),
        ...results.articles.map((article) => ({
          id: `article-${article.slug}`,
          title: article.title ?? "Untitled",
          isoDate: article.publishDate,
          date: formatDate(article.publishDate),
          summary: article.excerpt ?? "",
          tag: "Articolo",
          locked: article.isPremium ?? false,
          slug: article.slug,
          type: "article" as const,
        })),
      ].sort(sortByDateDesc)
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-white">Archivio</h1>
        <p className="mt-2 text-zinc-400">
          Cerca o esplora tutti i contenuti di Capibara Media
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <Search className="h-5 w-5 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca episodi, podcast, newsletter o articoli..."
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-black transition hover:bg-white disabled:opacity-50"
          >
            {loading ? "Cercando..." : "Cerca"}
          </button>
        </div>
      </form>

      {showInitialHub && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-900/40 to-zinc-900/0 p-6 md:p-8">
            <p className="text-sm text-zinc-300 md:text-base">
              Inizia a digitare per cercare tra tutti i contenuti, oppure
              scorri la lista unificata qui sotto.
            </p>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Tutti i contenuti recenti
              </h2>
              <span className="text-xs text-zinc-500">
                {initialUnifiedList.length} elementi
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {initialUnifiedList.map((item) => (
                <ContentListItem
                  key={item.id}
                  item={{
                    title: item.title,
                    date: item.date,
                    summary: item.summary,
                    tag: item.tag,
                    locked: item.locked,
                    slug: item.slug,
                    type: item.type,
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {!showInitialHub && results && (
        <div className="space-y-6">
          {!hasSearchResults || !searchUnifiedList || searchUnifiedList.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 p-12 text-center">
              <p className="text-zinc-400">
                Nessun risultato trovato per &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                    Risultati ricerca
                  </h2>
                  <p className="text-xs text-zinc-500">
                    per &quot;{query}&quot;
                  </p>
                </div>
                <span className="text-xs text-zinc-500">
                  {searchUnifiedList.length} elementi
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {searchUnifiedList.map((item) => (
                  <ContentListItem
                    key={item.id}
                    item={{
                      title: item.title,
                      date: item.date,
                      summary: item.summary,
                      tag: item.tag,
                      locked: item.locked,
                      slug: item.slug,
                      type: item.type,
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default ArchivioContent;


