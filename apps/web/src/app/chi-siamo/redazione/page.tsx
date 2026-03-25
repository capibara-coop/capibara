import MainLayout from "@/components/MainLayout";
import Image from "next/image";
import { extractHeroImage, getAuthors, type Author } from "@/lib/api";

// Social Media Icons
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function AuthorSocialLinks({ author }: { author: Author }) {
  const { instagram, tiktok, linkedin, website } = author;
  const hasAny =
    !!instagram || !!tiktok || !!linkedin || !!website;

  if (!hasAny) return null;

  return (
    <div className="flex items-center gap-3 pt-2">
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          aria-label="Instagram"
        >
          <InstagramIcon className="w-5 h-5" />
        </a>
      )}
      {tiktok && (
        <a
          href={tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          aria-label="TikTok"
        >
          <TikTokIcon className="w-5 h-5" />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="w-5 h-5" />
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 underline decoration-dotted underline-offset-4"
          aria-label="Sito personale"
        >
          Sito
        </a>
      )}
    </div>
  );
}

export default async function RedazionePage() {
  const authors = await getAuthors();

  return (
    <MainLayout>
      <div className="space-y-12">
        <section className="space-y-4">
          <p className="eyebrow eyebrow--page">Redazione</p>
          <h1 className="page-title text-4xl font-semibold">
            La nostra redazione
          </h1>
          <p className="body-text-lg max-w-3xl">
            Una rete di giornaliste e giornalisti distribuiti sul territorio,
            unite e uniti dalla passione per un&apos;informazione indipendente
            e di parte.
          </p>
        </section>

        {authors.length === 0 ? (
          <section className="content-box p-8 text-center">
            <p className="body-text">
              Nessun autore configurato al momento. Aggiungi autori nel CMS per
              popolare automaticamente questa pagina.
            </p>
          </section>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {authors.map((author, index) => {
              const { url: avatarUrl, alt: avatarAlt } = extractHeroImage(
                author.avatar,
              );

              return (
                <div
                  key={index}
                  className="content-box p-6 space-y-4 flex flex-col items-center text-center"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={avatarAlt || author.name}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full p-2"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xl font-semibold">
                        {author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="page-heading text-lg font-semibold author-name">
                      {author.name}
                    </h3>
                    {author.location && (
                      <p className="body-text-sm text-zinc-900 dark:text-zinc-400">
                        {author.location}
                      </p>
                    )}
                    {author.bio && (
                      <p className="text-xs author-bio">
                        {author.bio}
                      </p>
                    )}
                    {author.columns?.data?.length ? (
                      <p className="text-[11px] text-zinc-900 dark:text-zinc-400 pt-1">
                        {author.columns.data.length === 1
                          ? "Cura 1 rubrica"
                          : `Cura ${author.columns.data.length} rubriche`}
                      </p>
                    ) : null}
                  </div>
                  <AuthorSocialLinks author={author} />
                </div>
              );
            })}
          </section>
        )}
      </div>
    </MainLayout>
  );
}

