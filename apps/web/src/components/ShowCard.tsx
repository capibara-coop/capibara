import Link from "next/link";
import Image from "next/image";
import { getKindAccent } from "@/components/ContentCard";
import { extractHeroImage } from "@/lib/api";
import type { Show } from "@/lib/api";

type ShowCardProps = {
  show: Show;
  episodeCount?: number;
  href: string;
};

export default function ShowCard({ show, episodeCount, href }: ShowCardProps) {
  const accent = getKindAccent("podcast");
  const { url: coverUrl, alt: coverAlt } = extractHeroImage(show.cover);

  return (
    <Link href={href} className="group block">
      <article className="content-card h-full transition-transform group-hover:scale-[1.02]">
        <div
          className={`relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${accent}`}
        >
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={coverAlt ?? show.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-5xl opacity-30">🎙</span>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h2 className="text-lg font-semibold leading-snug group-hover:text-teal-400 transition-colors">
            {show.title}
          </h2>
          {show.tagline && (
            <p className="text-sm text-zinc-400 line-clamp-2">{show.tagline}</p>
          )}
          {episodeCount !== undefined && episodeCount > 0 && (
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {episodeCount} {episodeCount === 1 ? "episodio" : "episodi"}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
