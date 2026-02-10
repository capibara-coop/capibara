"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Event } from "@/lib/api";

const MONTH_NAMES = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
];

const DAY_NAMES = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Lunedì = 0, Domenica = 6
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isEventOnDay(event: Event, day: Date) {
  const start = new Date(event.startDate);
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());

  if (event.endDate) {
    const end = new Date(event.endDate);
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const checkDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return checkDay >= startDay && checkDay <= endDay;
  }

  return isSameDay(startDay, day);
}

type EventCalendarProps = {
  events: Event[];
  onMonthChange?: (year: number, month: number) => void;
  onDayClick?: (date: Date, dayEvents: Event[]) => void;
  selectedDate?: Date | null;
};

export default function EventCalendar({
  events,
  onMonthChange,
  onDayClick,
  selectedDate,
}: EventCalendarProps) {
  // Stato montato per evitare mismatch SSR / client con new Date()
  const [mounted, setMounted] = React.useState(false);
  const now = React.useRef(new Date());

  React.useEffect(() => {
    now.current = new Date();
    setMounted(true);
  }, []);

  const today = now.current;
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const goToPrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newYear, newMonth);
  };

  const goToNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newYear, newMonth);
  };

  const goToToday = () => {
    const t = new Date();
    now.current = t;
    setCurrentMonth(t.getMonth());
    setCurrentYear(t.getFullYear());
    onMonthChange?.(t.getFullYear(), t.getMonth());
  };

  // Costruiamo la griglia dei giorni — riempiendo anche l'ultima riga
  const cells: (number | null)[] = [];
  // Celle vuote iniziali (prima del giorno 1)
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  // Giorni del mese
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  // Celle vuote finali per completare l'ultima riga (multiplo di 7)
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  // Placeholder durante SSR per evitare hydration mismatch
  if (!mounted) {
    return (
      <div className="content-box p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-7 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 rounded-xl bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
            <div className="h-8 w-8 rounded-xl bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 py-2">
              {DAY_NAMES[i]}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="h-12 sm:h-14 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="content-box p-4 sm:p-6">
      {/* Header: navigazione mese */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl font-semibold">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={goToToday}
            className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Oggi
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevMonth}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Mese precedente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Mese successivo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Intestazioni giorni della settimana */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 py-2"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Griglia giorni */}
      <div className="grid grid-cols-7 gap-px rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-700">
        {cells.map((day, idx) => {
          if (day === null) {
            return (
              <div
                key={`empty-${idx}`}
                className="bg-zinc-50 dark:bg-zinc-900/50 h-12 sm:h-14"
              />
            );
          }

          const date = new Date(currentYear, currentMonth, day);
          const dayEvents = events.filter((e) => isEventOnDay(e, date));
          const hasEvents = dayEvents.length > 0;
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isPast =
            date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => onDayClick?.(date, dayEvents)}
              className={[
                "relative h-12 sm:h-14 p-1 sm:p-1.5",
                "flex flex-col items-center justify-start",
                "transition-colors duration-150",
                "bg-white dark:bg-zinc-900",
                hasEvents
                  ? "cursor-pointer hover:bg-red-50 dark:hover:bg-zinc-800"
                  : "cursor-default",
                isSelected
                  ? "ring-2 ring-inset ring-red-500 dark:ring-red-400 bg-red-50/50 dark:bg-red-950/20"
                  : "",
                isPast && !hasEvents ? "opacity-40" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                className={[
                  "text-xs sm:text-sm font-medium w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full leading-none",
                  isToday
                    ? "bg-red-600 text-white font-bold"
                    : isSelected
                      ? "text-red-600 dark:text-red-400 font-bold"
                      : "text-zinc-700 dark:text-zinc-300",
                ].join(" ")}
              >
                {day}
              </span>

              {/* Indicatori eventi */}
              {hasEvents && (
                <div className="flex items-center gap-0.5 mt-0.5">
                  {dayEvents.slice(0, 3).map((evt, i) => (
                    <span
                      key={i}
                      className={[
                        "w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full",
                        evt.isFeatured
                          ? "bg-amber-500"
                          : evt.isOnline
                            ? "bg-blue-500"
                            : "bg-red-500",
                      ].join(" ")}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[9px] text-zinc-400 ml-0.5">
                      +{dayEvents.length - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>In presenza</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Online</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>In evidenza</span>
        </div>
      </div>
    </div>
  );
}
