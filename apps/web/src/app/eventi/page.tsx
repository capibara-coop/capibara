import { getEvents, getUpcomingEvents, extractHeroImage } from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, MapPin, Globe, Clock, Star } from "lucide-react";
import EventiClient from "./EventiClient";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capibara.media";

  const ensureAbsoluteUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return url.startsWith("/") ? `${siteUrl}${url}` : `${siteUrl}/${url}`;
  };

  const upcomingEvents = await getUpcomingEvents(1);
  let ogImage = `${siteUrl}/logo_capibara.png`;

  if (upcomingEvents.length > 0 && upcomingEvents[0]?.heroImage) {
    const { url } = extractHeroImage(upcomingEvents[0].heroImage);
    const absoluteUrl = ensureAbsoluteUrl(url);
    if (absoluteUrl) ogImage = absoluteUrl;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: "Eventi",
    description:
      "Calendario eventi di Capibara: incontri, dibattiti, presentazioni e appuntamenti su lavoro, diritti e conflitti sociali.",
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: `${siteUrl}/eventi`,
      siteName: "Capibara",
      title: "Eventi | Capibara",
      description:
        "Calendario eventi di Capibara: incontri, dibattiti, presentazioni e appuntamenti su lavoro, diritti e conflitti sociali.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Eventi Capibara",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Eventi | Capibara",
      description:
        "Calendario eventi di Capibara: incontri, dibattiti, presentazioni e appuntamenti.",
      images: [ogImage],
    },
  };
}

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatEventTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isEventPast(event: { startDate: string; endDate?: string | null }) {
  const checkDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  return checkDate < new Date();
}

export default async function EventiPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; view?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const view = params.view || "list";
  const { data: events, pagination } = await getEvents(page, 12);
  const upcomingEvents = await getUpcomingEvents(50);

  // Separa eventi futuri e passati
  const futureEvents = events.filter((e) => !isEventPast(e));
  const pastEvents = events.filter((e) => isEventPast(e));

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="page-title text-4xl font-semibold">Eventi</h1>
          <p className="body-text mt-2">
            Incontri, dibattiti, presentazioni e appuntamenti della community
          </p>
        </div>

        {/* Vista tabs: Calendario / Lista */}
        <EventiClient events={upcomingEvents} />

        {/* Prossimi eventi */}
        {futureEvents.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              Prossimi eventi
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {futureEvents.map((event) => {
                const { url, alt } = extractHeroImage(event.heroImage);
                const isPast = isEventPast(event);

                return (
                  <Link
                    key={event.slug}
                    href={`/eventi/${event.slug}`}
                    className="content-box overflow-hidden hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-200 group block p-0"
                  >
                    {url && (
                      <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                        <img
                          src={url}
                          alt={alt ?? event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {event.isFeatured && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 text-black text-[10px] font-bold uppercase tracking-wide">
                            <Star className="h-3 w-3" />
                            In evidenza
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-5 space-y-3">
                      {/* Data e tipo */}
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        <time dateTime={event.startDate}>
                          {formatEventDate(event.startDate)}
                        </time>
                        <span>•</span>
                        {event.isOnline ? (
                          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            <Globe className="h-3 w-3" />
                            Online
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <MapPin className="h-3 w-3" />
                            In presenza
                          </span>
                        )}
                      </div>

                      {/* Titolo */}
                      <h3 className="font-bold text-xl leading-tight group-hover:underline decoration-2 underline-offset-4">
                        {event.title ?? "Untitled"}
                      </h3>

                      {/* Descrizione */}
                      {event.description && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatEventTime(event.startDate)}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.location}
                          </span>
                        )}
                        {event.organizer && (
                          <span className="truncate">
                            di {event.organizer}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      {event.tags?.data && event.tags.data.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {event.tags.data.slice(0, 3).map((tag) => (
                            <span
                              key={tag.attributes?.slug || (tag as any).slug}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                            >
                              {tag.attributes?.name || (tag as any).name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Eventi passati */}
        {pastEvents.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-500 dark:text-zinc-400">
              Eventi passati
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => {
                const { url, alt } = extractHeroImage(event.heroImage);

                return (
                  <Link
                    key={event.slug}
                    href={`/eventi/${event.slug}`}
                    className="content-box overflow-hidden hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-200 group block p-0 opacity-70 hover:opacity-100"
                  >
                    {url && (
                      <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                        <img
                          src={url}
                          alt={alt ?? event.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-zinc-900/70 text-white text-[10px] font-bold uppercase tracking-wide">
                          Concluso
                        </div>
                      </div>
                    )}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        <time dateTime={event.startDate}>
                          {formatEventDate(event.startDate)}
                        </time>
                        <span>•</span>
                        {event.isOnline ? (
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            Online
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location || "In presenza"}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg leading-tight group-hover:underline decoration-2 underline-offset-4">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Stato vuoto */}
        {events.length === 0 && (
          <div className="content-box p-12 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-zinc-300 dark:text-zinc-600" />
            <p className="body-text text-lg">Nessun evento disponibile al momento.</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Torna a trovarci per scoprire i prossimi appuntamenti.
            </p>
          </div>
        )}

        {/* Paginazione */}
        {pagination.pageCount > 1 && (
          <div className="flex items-center justify-center gap-4">
            {pagination.page > 1 && (
              <Link
                href={`/eventi?page=${pagination.page - 1}`}
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
                href={`/eventi?page=${pagination.page + 1}`}
                className="pagination-button"
              >
                Successiva →
              </Link>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
