import { notFound } from "next/navigation";
import { getVideoEpisodeBySlug } from "@/lib/api";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import { toYoutubeEmbedUrl } from "@/lib/youtube";

export default async function VideoEpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = await getVideoEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
        >
          ← Torna alla home
        </Link>

        <article className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-wide text-zinc-400">
              <span>Video</span>
              {episode.isPremium && (
                <span className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs text-amber-200">
                  Abbonati
                </span>
              )}
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white">
              {episode.title}
            </h1>
            {episode.publishDate && (
              <p className="mt-4 text-sm uppercase tracking-wide text-zinc-500">
                {new Date(episode.publishDate).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          {episode.synopsis && (
            <p className="text-lg text-zinc-300">{episode.synopsis}</p>
          )}

          {toYoutubeEmbedUrl(episode.videoUrl) && (
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                src={toYoutubeEmbedUrl(episode.videoUrl) ?? undefined}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {episode.summary && (
            <div className="prose prose-invert max-w-none text-zinc-300">
              <p>{episode.summary}</p>
            </div>
          )}
        </article>
      </div>
    </MainLayout>
  );
}

