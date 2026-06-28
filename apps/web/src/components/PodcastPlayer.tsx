"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Loader2,
} from "lucide-react";
import { formatDuration } from "@/lib/api";

type PodcastPlayerProps = {
  audioUrl: string;
  title: string;
  durationSeconds?: number | null;
};

const SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PodcastPlayer({
  audioUrl,
  title,
  durationSeconds,
}: PodcastPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSeconds ?? 0);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [error, setError] = useState<string | null>(null);

  const togglePlay = useCallback(() => {
    wavesurferRef.current?.playPause();
  }, []);

  const skip = useCallback((seconds: number) => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    ws.setTime(Math.max(0, Math.min(ws.getDuration(), ws.getCurrentTime() + seconds)));
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeed((prev) => {
      const idx = SPEEDS.indexOf(prev);
      const next = SPEEDS[(idx + 1) % SPEEDS.length];
      wavesurferRef.current?.setPlaybackRate(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current || !audioUrl) return;

    setIsLoading(true);
    setIsReady(false);
    setError(null);

    const ws = WaveSurfer.create({
      container: containerRef.current,
      url: audioUrl,
      height: 72,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      cursorWidth: 2,
      cursorColor: "#2dd4bf",
      waveColor: "rgba(161, 161, 170, 0.4)",
      progressColor: "#14b8a6",
      normalize: true,
      interact: true,
    });

    wavesurferRef.current = ws;

    ws.on("ready", () => {
      setIsLoading(false);
      setIsReady(true);
      setDuration(ws.getDuration());
      ws.setPlaybackRate(speed);
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("timeupdate", (time) => setCurrentTime(time));
    ws.on("finish", () => setIsPlaying(false));
    ws.on("error", () => {
      setIsLoading(false);
      setError("Impossibile caricare l'audio. Riprova più tardi.");
    });

    return () => {
      ws.destroy();
      wavesurferRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  useEffect(() => {
    wavesurferRef.current?.setPlaybackRate(speed);
  }, [speed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay]);

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-center text-sm text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 space-y-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 truncate">
        {title}
      </p>

      <div className="relative">
        <div ref={containerRef} className="w-full" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 rounded-xl">
            <Loader2 className="h-6 w-6 animate-spin text-teal-400" />
            <span className="ml-2 text-sm text-zinc-400">Caricamento audio…</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs tabular-nums text-zinc-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration || durationSeconds || 0)}</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => skip(-15)}
          disabled={!isReady}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
          aria-label="Indietro 15 secondi"
        >
          <RotateCcw className="h-5 w-5" />
          <span className="sr-only">-15s</span>
        </button>

        <button
          type="button"
          onClick={togglePlay}
          disabled={!isReady && !isLoading}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-105 disabled:opacity-50"
          aria-label={isPlaying ? "Pausa" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 fill-current ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => skip(30)}
          disabled={!isReady}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
          aria-label="Avanti 30 secondi"
        >
          <RotateCw className="h-5 w-5" />
          <span className="sr-only">+30s</span>
        </button>

        <button
          type="button"
          onClick={cycleSpeed}
          disabled={!isReady}
          className="ml-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold tabular-nums text-zinc-400 transition-colors hover:border-teal-500/50 hover:text-teal-400 disabled:opacity-40"
          aria-label="Velocità riproduzione"
        >
          {speed}x
        </button>
      </div>

      {!isReady && !isLoading && durationSeconds ? (
        <p className="text-center text-xs text-zinc-500">
          Durata: {formatDuration(durationSeconds)}
        </p>
      ) : null}
    </div>
  );
}
