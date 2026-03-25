"use client";

import { Music, Podcast, Youtube } from "lucide-react";

type PodcastPlatformButtonsProps = {
  spotifyLink?: string | null;
  appleLink?: string | null;
  youtubeLink?: string | null;
};

export default function PodcastPlatformButtons({
  spotifyLink,
  appleLink,
  youtubeLink,
}: PodcastPlatformButtonsProps) {
  const platforms = [
    {
      name: "Spotify",
      link: spotifyLink,
      icon: Music,
      className: "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20",
    },
    {
      name: "Apple Podcasts",
      link: appleLink,
      icon: Podcast,
      className: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm",
    },
    {
      name: "YouTube",
      link: youtubeLink,
      icon: Youtube,
      className: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20",
    },
  ].filter((platform) => platform.link);

  if (platforms.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-4">
        Ascolta su
      </p>
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <a
              key={platform.name}
              href={platform.link || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm transition-transform hover:scale-105 ${platform.className}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{platform.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

