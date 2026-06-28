import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import PodcastEpisodeRow from "@/components/PodcastEpisodeRow";
import { getPodcastShowBySlug, extractHeroImage } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdown";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = await getPodcastShowBySlug(slug);

  if (!show) {
    return { title: "Show non trovato" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.media";
  const { url: coverUrl } = extractHeroImage(show.cover);
  const ogImage = coverUrl ?? `${siteUrl}/logo_capibara.png`;
  const description =
    show.tagline ??
    "Ascolta gli episodi podcast di Capibara.";

  return {
    metadataBase: new URL(siteUrl),
    title: show.title,
    description,
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: `${siteUrl}/podcast/show/${slug}`,
      siteName: "Capibara",
      title: `${show.title} | Podcast Capibara`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: show.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${show.title} | Podcast Capibara`,
      description,
      images: [ogImage],
    },
  };
}

function renderDescription(description?: string | null): string {
  if (!description) return "";
  if (/<[a-z][\s\S]*>/i.test(description)) return description;
  return markdownToHtml(description);
}

export default async function PodcastShowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await getPodcastShowBySlug(slug);

  if (!show) {
    notFound();
  }

  const { url: coverUrl, alt: coverAlt } = extractHeroImage(show.cover);
  const descriptionHtml = renderDescription(show.description);

  return (
    <MainLayout>
      <div className="space-y-8">
        <Link href="/podcast" className="back-link">
          ← Tutti i podcast
        </Link>

        <header className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/30 via-sky-500/20 to-blue-900/40 shadow-xl">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={coverAlt ?? show.title}
                fill
                className="object-cover"
                sizes="192px"
                priority
              />
            ) : null}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-400">
              Podcast
            </p>
            <h1 className="page-title text-3xl font-semibold sm:text-4xl">
              {show.title}
            </h1>
            {show.tagline && (
              <p className="text-lg text-zinc-400">{show.tagline}</p>
            )}
            <p className="text-sm text-zinc-500">
              {show.episodes.length}{" "}
              {show.episodes.length === 1 ? "episodio" : "episodi"}
            </p>
          </div>
        </header>

        {descriptionHtml && (
          <div
            className="article-prose max-w-3xl text-zinc-400"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Episodi
          </h2>
          {show.episodes.length === 0 ? (
            <div className="content-box p-8 text-center">
              <p className="body-text">Nessun episodio pubblicato per questo show.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {show.episodes.map((episode, i) => (
                <PodcastEpisodeRow
                  key={episode.slug}
                  episode={episode}
                  index={i + 1}
                  coverUrl={coverUrl}
                  coverAlt={coverAlt ?? show.title}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
