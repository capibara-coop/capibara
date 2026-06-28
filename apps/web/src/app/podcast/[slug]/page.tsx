import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getPodcastEpisodeBySlug,
  extractMedia,
  extractPodcastEpisodeImage,
  formatDuration,
  getStrapiMediaUrl,
} from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import PodcastPlatformButtons from "@/components/PodcastPlatformButtons";
import PodcastPlayer from "@/components/PodcastPlayer";
import { formatDate } from "@/components/ContentCard";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getPodcastEpisodeBySlug(slug);

  if (!episode) {
    return { title: "Podcast non trovato" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.media";
  const podcastUrl = `${siteUrl}/podcast/${slug}`;

  const ensureAbsoluteUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return url.startsWith("/") ? `${siteUrl}${url}` : `${siteUrl}/${url}`;
  };

  const seoImageUrl = episode.seo?.metaImage?.data?.attributes?.url
    ? ensureAbsoluteUrl(getStrapiMediaUrl(episode.seo.metaImage.data.attributes.url))
    : null;

  const { url: showCoverUrl } = extractPodcastEpisodeImage(episode);
  const finalImageUrl =
    seoImageUrl ??
    ensureAbsoluteUrl(showCoverUrl) ??
    `${siteUrl}/logo_capibara.png`;

  const metaTitle = episode.seo?.metaTitle || episode.title;
  const description =
    episode.seo?.metaDescription ||
    episode.synopsis ||
    episode.summary ||
    "Ascolta il podcast completo su Capibara";

  const robots = episode.seo?.preventIndexing
    ? { index: false, follow: false }
    : { index: true, follow: true };

  return {
    metadataBase: new URL(siteUrl),
    title: metaTitle,
    description,
    robots,
    openGraph: {
      type: "music.song",
      locale: "it_IT",
      url: podcastUrl,
      siteName: "Capibara",
      title: metaTitle,
      description,
      images: [
        {
          url: finalImageUrl,
          width: 1200,
          height: 630,
          alt: episode.seo?.metaImage?.data?.attributes?.alternativeText || episode.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [finalImageUrl],
    },
    alternates: { canonical: podcastUrl },
  };
}

export default async function PodcastEpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = await getPodcastEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const showSlug = episode.show?.data?.attributes?.slug;
  const showTitle = episode.show?.data?.attributes?.title;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.media";
  const { url: audioUrl } = extractMedia(episode.audioFile);
  const { url: coverUrl, alt: coverAlt } = extractPodcastEpisodeImage(episode);
  const episodeImage = coverUrl ?? `${siteUrl}/logo_capibara.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.synopsis || episode.summary || "",
    image: episodeImage,
    datePublished: episode.publishDate || undefined,
    duration: episode.durationSeconds
      ? `PT${Math.floor(episode.durationSeconds / 60)}M${episode.durationSeconds % 60}S`
      : undefined,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: showTitle || "Capibara Podcast",
    },
    publisher: {
      "@type": "Organization",
      name: "Capibara",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo_capibara.png` },
    },
    ...(audioUrl && {
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: audioUrl,
        encodingFormat: "audio/mpeg",
      },
    }),
  };

  const hasExternalLinks =
    episode.spotifyLink || episode.appleLink || episode.youtubeLink;

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        {showSlug ? (
          <Link href={`/podcast/show/${showSlug}`} className="back-link">
            ← {showTitle ?? "Torna allo show"}
          </Link>
        ) : (
          <Link href="/podcast" className="back-link">
            ← Tutti i podcast
          </Link>
        )}

        <article className="space-y-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/30 via-sky-500/20 to-blue-900/40 shadow-lg">
              <Image
                src={episodeImage}
                alt={coverAlt ?? showTitle ?? episode.title}
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center gap-2 text-sm uppercase tracking-wide meta-text">
                <span>Podcast</span>
                {showTitle && (
                  <>
                    <span className="text-zinc-600">·</span>
                    <span className="text-teal-400">{showTitle}</span>
                  </>
                )}
                {episode.isPremium && (
                  <span className="locked-badge">Abbonati</span>
                )}
              </div>
              <h1 className="page-title text-3xl font-semibold leading-tight sm:text-4xl">
                {episode.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                {episode.publishDate && (
                  <p>{formatDate(episode.publishDate)}</p>
                )}
                {episode.durationSeconds ? (
                  <p>{formatDuration(episode.durationSeconds)}</p>
                ) : null}
              </div>
            </div>
          </div>

          {episode.summary && (
            <p className="article-excerpt text-lg">{episode.summary}</p>
          )}

          {audioUrl ? (
            <PodcastPlayer
              audioUrl={audioUrl}
              title={episode.title}
              durationSeconds={episode.durationSeconds}
            />
          ) : (
            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 text-center">
              <p className="body-text text-sm">
                L&apos;audio non è ancora disponibile su Capibara.
                {hasExternalLinks
                  ? " Ascolta l'episodio su una delle piattaforme qui sotto."
                  : ""}
              </p>
            </div>
          )}

          {hasExternalLinks && (
            <PodcastPlatformButtons
              spotifyLink={episode.spotifyLink}
              appleLink={episode.appleLink}
              youtubeLink={episode.youtubeLink}
            />
          )}
        </article>
      </div>
    </MainLayout>
  );
}
