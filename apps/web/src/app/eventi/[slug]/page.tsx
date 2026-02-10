import { notFound } from "next/navigation";
import { getEventBySlug, getStrapiMediaUrl, extractHeroImage } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdown";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import ShareButton from "@/components/ShareButton";
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  ExternalLink,
  Users,
  Star,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Evento non trovato" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.media";
  const eventUrl = `${siteUrl}/eventi/${slug}`;

  const ensureAbsoluteUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return url.startsWith("/") ? `${siteUrl}${url}` : `${siteUrl}/${url}`;
  };

  const seoImageUrl = event.seo?.metaImage?.data?.attributes?.url
    ? ensureAbsoluteUrl(getStrapiMediaUrl(event.seo.metaImage.data.attributes.url))
    : null;
  const { url: heroImageUrl } = extractHeroImage(event.heroImage);
  const imageUrl =
    seoImageUrl || ensureAbsoluteUrl(heroImageUrl) || `${siteUrl}/logo_capibara.png`;

  const metaTitle = event.seo?.metaTitle || event.title;
  const description =
    event.seo?.metaDescription ||
    event.description ||
    event.body?.substring(0, 160) ||
    "Evento su Capibara";

  const seoKeywords = event.seo?.keywords
    ? event.seo.keywords
        .split(",")
        .map((k: string) => k.trim())
        .filter(Boolean)
    : [];
  const tagKeywords =
    event.tags?.data?.map((tag: any) => tag.attributes?.name || tag.name) || [];
  const keywords = seoKeywords.length > 0 ? seoKeywords : tagKeywords;

  const robots = event.seo?.preventIndexing
    ? { index: false, follow: false }
    : { index: true, follow: true };

  return {
    metadataBase: new URL(siteUrl),
    title: metaTitle,
    description,
    keywords,
    robots,
    openGraph: {
      type: "article",
      locale: "it_IT",
      url: eventUrl,
      siteName: "Capibara",
      title: metaTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt:
            event.seo?.metaImage?.data?.attributes?.alternativeText ||
            event.heroImage?.data?.attributes?.alternativeText ||
            event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: eventUrl,
    },
  };
}

function formatFullDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isEventPast(event: { startDate: string; endDate?: string | null }) {
  const checkDate = event.endDate
    ? new Date(event.endDate)
    : new Date(event.startDate);
  return checkDate < new Date();
}

function isSameDay(d1: string, d2: string) {
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.media";
  const eventUrl = `${siteUrl}/eventi/${slug}`;
  const imageUrl = event.heroImage?.data?.attributes?.url
    ? getStrapiMediaUrl(event.heroImage.data.attributes.url) ||
      `${siteUrl}${event.heroImage.data.attributes.url}`
    : `${siteUrl}/logo_capibara.png`;

  const isPast = isEventPast(event);
  const isMultiDay =
    event.endDate && !isSameDay(event.startDate, event.endDate);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description || event.body?.substring(0, 160) || "",
    image: imageUrl,
    startDate: event.startDate,
    endDate: event.endDate || undefined,
    eventStatus: isPast
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: event.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: event.isOnline
      ? {
          "@type": "VirtualLocation",
          url: event.onlineUrl || eventUrl,
        }
      : event.location
        ? {
            "@type": "Place",
            name: event.location,
            address: event.address || event.location,
          }
        : undefined,
    organizer: event.organizer
      ? {
          "@type": "Organization",
          name: event.organizer,
        }
      : {
          "@type": "Organization",
          name: "Capibara",
        },
    url: event.externalUrl || eventUrl,
  };

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <Link href="/eventi" className="back-link">
          ← Torna agli eventi
        </Link>

        <article className="space-y-8">
          {/* Header */}
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm uppercase tracking-wide meta-text">
              <span>Evento</span>
              {event.isFeatured && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                  <Star className="h-3 w-3" />
                  In evidenza
                </span>
              )}
              {event.isOnline ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                  <Globe className="h-3 w-3" />
                  Online
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800">
                  <MapPin className="h-3 w-3" />
                  In presenza
                </span>
              )}
              {isPast && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  Concluso
                </span>
              )}
            </div>
            <h1 className="page-title text-4xl font-semibold leading-tight">
              {event.title}
            </h1>
            {event.organizer && (
              <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                Organizzato da{" "}
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {event.organizer}
                </span>
              </p>
            )}
          </div>

          {/* Info box: data, ora, luogo */}
          <div className="content-box p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Data */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <Calendar className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {isMultiDay ? "Date" : "Data"}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                    {formatFullDate(event.startDate)}
                  </p>
                  {isMultiDay && event.endDate && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                      → {formatFullDate(event.endDate)}
                    </p>
                  )}
                </div>
              </div>

              {/* Orario */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <Clock className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Orario</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {formatTime(event.startDate)}
                    {event.endDate && ` – ${formatTime(event.endDate)}`}
                  </p>
                </div>
              </div>

              {/* Luogo */}
              {!event.isOnline && event.location && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    <MapPin className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Luogo</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {event.location}
                    </p>
                    {event.address && (
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                        {event.address}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Link online */}
              {event.isOnline && event.onlineUrl && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Partecipa online</p>
                    <a
                      href={event.onlineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Apri link
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* CTA: Link esterno / iscrizione */}
            {event.externalUrl && !isPast && (
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <a
                  href={event.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                >
                  <span>Iscriviti / Partecipa</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          {/* Descrizione */}
          {event.description && (
            <p className="article-excerpt">{event.description}</p>
          )}

          {/* Hero image */}
          {event.heroImage?.data?.attributes?.url && (
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <img
                src={
                  getStrapiMediaUrl(event.heroImage.data.attributes.url) ??
                  event.heroImage.data.attributes.url
                }
                alt={
                  event.heroImage.data.attributes.alternativeText || event.title
                }
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Body content */}
          {event.body ? (
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(event.body) }}
            />
          ) : null}

          {/* Tags */}
          {event.tags?.data && event.tags.data.length > 0 && (
            <div className="article-tags-container">
              {event.tags.data.map((tag: any) => (
                <span
                  key={tag.attributes?.slug || tag.slug}
                  className="article-tag"
                >
                  {tag.attributes?.name || tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
            <ShareButton url={eventUrl} title={event.title} />
          </div>
        </article>
      </div>
    </MainLayout>
  );
}
