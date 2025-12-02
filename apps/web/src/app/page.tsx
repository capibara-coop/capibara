import {
  getLatestPodcastEpisodes,
  getLatestVideoEpisodes,
  getPremiumNewsletterIssues,
  getLatestArticles,
  type Show,
} from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import ContentCard, { formatDate, getKindAccent } from "@/components/ContentCard";
import Link from "next/link";

export default async function Home() {
  const [videoEpisodes, podcastDrops, premiumLetters, articles] = await Promise.all([
    getLatestVideoEpisodes(3),
    getLatestPodcastEpisodes(4),
    getPremiumNewsletterIssues(3),
    getLatestArticles(3),
  ]);

  // Filter out any undefined/null episodes
  const validVideoEpisodes = videoEpisodes.filter((ep) => ep != null);
  const validPodcastDrops = podcastDrops.filter((ep) => ep != null);
  const validPremiumLetters = premiumLetters.filter((ep) => ep != null);
  const validArticles = articles.filter((art) => art != null);

  return (
    <MainLayout>
      <header className="hero flex flex-col rounded-3xl border p-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-end">
          <div className="flex-1">
            <p className="eyebrow">
              Capibara • informazione
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
              Storie, analisi e inchieste per chi guarda il mondo dal basso.
            </h2>
            <p className="mt-4 max-w-xl">
              Capibara è una media company indipendente: video, podcast, articoli e newsletter
              per raccontare lavoro, diritti, conflitti sociali e nuove forme di organizzazione.
              Niente terzismi: scegliamo un punto di vista, quello di chi non ha potere.
            </p>
          </div>
          <div className="mt-6 flex w-full justify-start lg:mt-0 lg:w-auto lg:justify-end">
            <div className="flex flex-col gap-3 text-sm text-zinc-300 sm:flex-row sm:items-center">
              <Link
                href="/abbonamenti"
                className="rounded-full bg-white/90 px-6 py-3 text-center font-semibold text-black transition hover:bg-white"
              >
                Abbonati ora
              </Link>
              <button className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white/70">
                Accedi
              </button>
            </div>
          </div>
        </div>
      </header>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Capibara Originals</p>
                <h3 className="section-heading text-2xl font-semibold">
                  Storied Network
                </h3>
              </div>
              <Link
                href="/video"
                className="text-sm text-zinc-300 transition hover:text-white"
              >
                Vedi tutto
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {validVideoEpisodes.map((episode) => {
                const showData = episode.show?.data;
                const showKind = 
                  (showData?.attributes?.kind as Show["kind"]) ?? "video";
                const accent = getKindAccent(showKind);

                return (
                  <ContentCard
                    key={episode.slug}
                    entry={{
                      title: episode.title ?? "Untitled",
                      date: formatDate(episode.publishDate),
                      summary: episode.synopsis ?? episode.summary ?? "",
                      tag: "Video",
                      accent,
                      locked: episode.isPremium ?? false,
                      slug: episode.slug,
                      type: "video",
                    }}
                  />
                );
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6 rounded-3xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Podcast</p>
                  <h3 className="section-heading text-2xl font-semibold">
                    VentiQuaranta
                  </h3>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-200">
                  Feed RSS
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
              {validPodcastDrops.map((podcast) => (
                <ContentCard
                  key={podcast.slug}
                  entry={{
                    title: podcast.title ?? "Untitled",
                    date: formatDate(podcast.publishDate),
                    summary: podcast.summary ?? podcast.synopsis ?? "",
                    tag: "Podcast",
                    accent: getKindAccent("podcast"),
                    locked: podcast.isPremium ?? false,
                    slug: podcast.slug,
                    type: "podcast",
                  }}
                />
              ))}
              </div>
            </div>
            <div className="space-y-6 rounded-3xl border border-white/10 p-6">
              <div>
                <p className="eyebrow">Newsletter</p>
                <h3 className="section-heading text-2xl font-semibold">
                  Area riservata
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Inchieste lunghe, approfondimenti teorici e strumenti pratici per chi vuole
                  organizzarsi nei luoghi di lavoro, nelle città, nei movimenti. Sostieni
                  un progetto editoriale che non dipende da partiti né da grandi gruppi.
                </p>
              </div>
              <div className="space-y-4">
              {validPremiumLetters.map((letter) => (
                <ContentCard
                  key={letter.slug}
                  entry={{
                    title: letter.title ?? "Untitled",
                    date: formatDate(letter.publishDate),
                    summary: letter.excerpt ?? letter.summary ?? "",
                    tag: "Newsletter",
                    accent: getKindAccent("newsletter"),
                    locked: letter.isPremium ?? true,
                    slug: letter.slug,
                    type: "newsletter",
                  }}
                />
              ))}
              </div>
              <button className="w-full rounded-2xl border border-white/20 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-white/50 hover:text-white">
                Esplora i benefit per gli abbonati →
              </button>
            </div>
          </section>

          {validArticles.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Editoriale</p>
                  <h3 className="section-heading text-2xl font-semibold">
                    Articoli e approfondimenti di parte
                  </h3>
                </div>
                <Link
                  href="/articoli"
                  className="text-sm text-zinc-300 transition hover:text-white"
                >
                  Vedi tutto
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {validArticles.map((article) => (
                  <ContentCard
                    key={article.slug}
                    entry={{
                      title: article.title ?? "Untitled",
                      date: formatDate(article.publishDate),
                      summary: article.excerpt ?? "",
                      tag: "Articolo",
                      accent: "from-blue-500/30 via-indigo-500/20 to-purple-900/40",
                      locked: article.isPremium ?? false,
                      slug: article.slug,
                      type: "article",
                    }}
                  />
                ))}
              </div>
            </section>
          )}
    </MainLayout>
  );
}
