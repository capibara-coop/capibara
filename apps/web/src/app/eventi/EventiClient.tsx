"use client";

import React from "react";
import EventCalendar from "@/components/EventCalendar";
import type { Event } from "@/lib/api";
import { extractHeroImage } from "@/lib/api";
import Link from "next/link";
import { Calendar, MapPin, Globe, Clock, X } from "lucide-react";

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    weekday: "long",
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

type EventiClientProps = {
  events: Event[];
};

export default function EventiClient({ events }: EventiClientProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = React.useState<Event[]>([]);

  const handleDayClick = (date: Date, dayEvents: Event[]) => {
    if (dayEvents.length === 0) {
      setSelectedDate(null);
      setSelectedDayEvents([]);
      return;
    }
    setSelectedDate(date);
    setSelectedDayEvents(dayEvents);
  };

  const clearSelection = () => {
    setSelectedDate(null);
    setSelectedDayEvents([]);
  };

  return (
    <div className="space-y-6">
      {/* Calendario */}
      <EventCalendar
        events={events}
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
      />

      {/* Dettaglio giorno selezionato */}
      {selectedDate && selectedDayEvents.length > 0 && (
        <div className="content-box p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              {formatEventDate(selectedDate.toISOString())}
            </h3>
            <button
              onClick={clearSelection}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Chiudi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {selectedDayEvents.map((event) => {
              const { url } = extractHeroImage(event.heroImage);
              return (
                <Link
                  key={event.slug}
                  href={`/eventi/${event.slug}`}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition group"
                >
                  {url && (
                    <img
                      src={url}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-semibold text-sm group-hover:underline decoration-2 underline-offset-2 truncate">
                      {event.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatEventTime(event.startDate)}
                        {event.endDate && ` – ${formatEventTime(event.endDate)}`}
                      </span>
                      {event.isOnline ? (
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                          <Globe className="h-3 w-3" />
                          Online
                        </span>
                      ) : event.location ? (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      ) : null}
                    </div>
                    {event.description && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
