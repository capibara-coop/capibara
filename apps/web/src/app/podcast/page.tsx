import { getPodcastShows, getPodcastEpisodes } from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import ShowCard from "@/components/ShowCard";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.media";
  const { data: shows } = await getPodcastShows(1, 1);

  let ogImage = `${siteUrl}/logo_capibara.png`;
  const firstShow = shows[0];
  if (firstShow?.cover?.data?.attributes?.url) {
    const url = firstShow.cover.data.attributes.url;
    ogImage = url.startsWith("http") ? url : `${siteUrl}${url}`;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: "Podcast",
    description:
      "I podcast di Capibara: approfondimenti, interviste e storie su lavoro, diritti e conflitti sociali.",
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: `${siteUrl}/podcast`,
      siteName: "Capibara",
      title: "Podcast | Capibara",
      description:
        "I podcast di Capibara: approfondimenti, interviste e storie su lavoro, diritti e conflitti sociali.",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Podcast Capibara" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Podcast | Capibara",
      description:
        "I podcast di Capibara: approfondimenti, interviste e storie su lavoro, diritti e conflitti sociali.",
      images: [ogImage],
    },
  };
}

export default async function PodcastPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  const [{ data: shows, pagination }, { data: allEpisodes }] = await Promise.all([
    getPodcastShows(page, 24),
    getPodcastEpisodes(1, 200),
  ]);

  const episodeCountByShow = allEpisodes.reduce<Record<string, number>>((acc, ep) => {
    const showSlug = ep.show?.data?.attributes?.slug;
    if (showSlug) {
      acc[showSlug] = (acc[showSlug] ?? 0) + 1;
    }
    return acc;
  }, {});

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="page-title text-4xl font-semibold">Podcast</h1>
          <p className="body-text mt-2">
            Scegli uno show e ascolta gli episodi direttamente qui.
          </p>
        </div>

        {shows.length === 0 ? (
          <div className="content-box p-12 text-center">
            <p className="body-text">Nessuno show podcast disponibile al momento.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {shows.map((show) => (
                <ShowCard
                  key={show.slug}
                  show={show}
                  href={`/podcast/show/${show.slug}`}
                  episodeCount={episodeCountByShow[show.slug]}
                />
              ))}
            </div>

            {pagination.pageCount > 1 && (
              <div className="flex items-center justify-center gap-4">
                {pagination.page > 1 && (
                  <Link
                    href={`/podcast?page=${pagination.page - 1}`}
                    className="pagination-button"
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
                    className="pagination-button"
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
