"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, BookOpen, User, Calendar, CalendarDays, Clock, Sparkles, Search } from "lucide-react";
import CustomDropdown from "./CustomDropdown";
import { useCallback, useEffect, useRef, useState } from "react";
import { extractHeroImage } from "@/lib/api";

interface Column {
  title: string;
  slug: string;
}

interface Author {
  name: string;
  avatar?: any;
}

interface RubricheFiltersProps {
  columns: Column[];
  authors: Author[];
  selectedColumn?: string;
  selectedAuthor?: string;
  selectedDate?: string;
  searchQuery?: string;
}

export default function RubricheFilters({
  columns,
  authors,
  selectedColumn,
  selectedAuthor,
  selectedDate,
  searchQuery,
}: RubricheFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Stato locale per il campo di ricerca (per evitare aggiornamenti immediati dell'URL)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");

  // Ref per il timeout del debouncing
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sincronizza lo stato locale quando cambia searchQuery dall'esterno (es. navigazione)
  useEffect(() => {
    setLocalSearchQuery(searchQuery || "");
  }, [searchQuery]);

  // Cleanup del timeout quando il componente viene smontato
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleFilterChange = (filterType: "column" | "author" | "date", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Ensure we're in "all" view
    params.set("rubriche", "all");

    if (value === "all") {
      if (filterType === "column") {
        params.delete("filterColumn");
      } else if (filterType === "author") {
        params.delete("filterAuthor");
      } else if (filterType === "date") {
        params.delete("filterDate");
      }
    } else {
      if (filterType === "column") {
        params.set("filterColumn", value);
      } else if (filterType === "author") {
        params.set("filterAuthor", value);
      } else if (filterType === "date") {
        params.set("filterDate", value);
      }
    }

    // Reset to first page when filtering
    params.set("rubrichePage", "1");

    router.push(`/newsroom?${params.toString()}`);
  };

  const handleSearchChange = useCallback((query: string) => {
    // Aggiorna lo stato locale immediatamente per una risposta visiva istantanea
    setLocalSearchQuery(query);

    // Cancella il timeout precedente
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Imposta un nuovo timeout per aggiornare l'URL dopo 300ms di inattività
    searchTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("rubriche", "all");
      if (query.trim()) {
        params.set("search", query.trim());
      } else {
        params.delete("search");
      }
      params.set("rubrichePage", "1");
      router.push(`/newsroom?${params.toString()}`);
    }, 300);
  }, [router, searchParams]);

  // Get unique authors (remove duplicates)
  const uniqueAuthors = Array.from(
    new Map(authors.map(author => [author.name, author])).values()
  );

  // Prepare column options with icons
  const columnOptions = [
    { value: "all", label: "Tutte le rubriche", icon: BookOpen },
    ...columns.map((column) => ({
      value: column.slug,
      label: column.title,
      icon: BookOpen,
    })),
  ];

  // Prepare author options with avatars
  const authorOptions = [
    { value: "all", label: "Tutti gli autori", icon: User },
    ...uniqueAuthors.map((author) => ({
      value: author.name,
      label: author.name,
      avatar: author.avatar ? extractHeroImage(author.avatar).url : undefined,
    })),
  ];

  // Prepare date options with icons
  const dateOptions = [
    { value: "all", label: "Tutte le date", icon: Calendar },
    { value: "today", label: "Oggi", icon: Sparkles },
    { value: "7days", label: "Ultimi 7 giorni", icon: Clock },
    { value: "30days", label: "Ultimi 30 giorni", icon: CalendarDays },
    { value: "90days", label: "Ultimi 3 mesi", icon: Calendar },
    { value: "6months", label: "Ultimi 6 mesi", icon: Calendar },
  ];

  return (
    <div className="rubriche-filters-box flex flex-wrap items-center gap-4 mb-6 p-4 rounded-lg">
      <div className="rubriche-filters-label flex items-center gap-2 text-sm font-medium">
        <Filter className="h-4 w-4" />
        <span>Filtra per:</span>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <label className="rubriche-filters-dropdown-label text-sm mb-1 block">
            Cerca
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cerca nelle rubriche..."
              className="rubriche-filters-search-input w-full pl-10 pr-3 py-1.5 text-sm border rounded-md transition-colors"
            />
          </div>
        </div>

        {/* Rubrica Filter */}
        <CustomDropdown
          label="Rubrica"
          options={columnOptions}
          value={selectedColumn}
          onChange={(value) => handleFilterChange("column", value)}
          placeholder="Tutte le rubriche"
        />

        {/* Author Filter */}
        <CustomDropdown
          label="Autore"
          options={authorOptions}
          value={selectedAuthor}
          onChange={(value) => handleFilterChange("author", value)}
          placeholder="Tutti gli autori"
        />

        {/* Date Filter */}
        <CustomDropdown
          label="Periodo"
          options={dateOptions}
          value={selectedDate}
          onChange={(value) => handleFilterChange("date", value)}
          placeholder="Tutte le date"
        />

        {/* Reset filters button */}
        {(selectedColumn || selectedAuthor || selectedDate || searchQuery) && (
          <div className="flex items-end">
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("rubriche", "all");
                params.delete("filterColumn");
                params.delete("filterAuthor");
                params.delete("filterDate");
                params.delete("search");
                params.set("rubrichePage", "1");
                router.push(`/newsroom?${params.toString()}`);
              }}
              className="rubriche-filters-reset px-3 py-1.5 text-sm underline underline-offset-2 whitespace-nowrap"
            >
              Rimuovi filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

