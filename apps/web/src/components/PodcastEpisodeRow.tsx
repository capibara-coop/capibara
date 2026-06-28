import Link from "next/link";
import Image from "next/image";
import { formatDuration, extractPodcastEpisodeImage } from "@/lib/api";
import { formatDate } from "@/components/ContentCard";
import type { PodcastEpisode } from "@/lib/api";
import { Lock } from "lucide-react";

type PodcastEpisodeRowProps = {
  episode: PodcastEpisode;
  index: number;
  coverUrl?: string | null;
  coverAlt?: string | null;
};

export default function PodcastEpisodeRow({
  episode,
  index,
  coverUrl: coverUrlProp,
  coverAlt: coverAltProp,
}: PodcastEpisodeRowProps) {
  const duration = formatDuration(episode.durationSeconds);
  const extracted = extractPodcastEpisodeImage(episode);
  const coverUrl = coverUrlProp ?? extracted.url;
  const coverAlt = coverAltProp ?? extracted.alt;

  return (
    <Link
      href={`/podcast/${episode.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5"
    >
      <span className="w-8 shrink-0 text-center text-sm tabular-nums text-zinc-500 group-hover:text-teal-400">
        {index}
      </span>
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-teal-500/10">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={coverAlt ?? episode.title}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-500/30 to-blue-900/40" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium group-hover:text-teal-300 transition-colors">
            {episode.title}
          </h3>
          {episode.isPremium && (
            <Lock className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
          )}
        </div>
        {(episode.summary || episode.synopsis) && (
          <p className="mt-0.5 truncate text-sm text-zinc-500">
            {episode.summary ?? episode.synopsis}
          </p>
        )}
      </div>
      <div className="hidden shrink-0 text-right sm:block">
        {episode.publishDate && (
          <p className="text-xs text-zinc-500">{formatDate(episode.publishDate)}</p>
        )}
        {duration && (
          <p className="text-xs tabular-nums text-zinc-600">{duration}</p>
        )}
      </div>
    </Link>
  );
}
