'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ConflictDetails } from '@/lib/wars-map/types';
import ConflictDetailsPanel from '@/components/wars-map/ConflictDetailsPanel';
import { getAllConflicts } from '@/lib/wars-map/conflictsData';
import MainLayout from '@/components/MainLayout';

// Dynamic import per evitare problemi SSR con Leaflet
const MapComponent = dynamic(() => import('@/components/wars-map/MapComponent'), {
  ssr: false,
});

// Data di ultimo aggiornamento del database UCDP (UCDP GED v25.1 - 2024)
const lastUpdateDate = 'Dicembre 2024';

export default function ConflittiPage() {
  const conflicts = getAllConflicts();
  const totalConflicts = conflicts.length;

  const [selectedConflict, setSelectedConflict] = useState<ConflictDetails | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isDarkTheme = theme === 'dark';

  const handleConflictSelect = (conflict: ConflictDetails) => {
    setSelectedConflict(conflict);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedConflict(null);
  };

  return (
    <MainLayout>
      {/* Hero Section per la pagina conflitti */}
      <header className="hero flex flex-col rounded-3xl border p-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-end">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <p className="eyebrow eyebrow--brand">
                Capibara • Conflitti
              </p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                🔬 In Sperimentazione
              </span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Mappa Interattiva dei Conflitti Mondiali
            </h2>
            <div className="mt-4 space-y-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300">
                {totalConflicts} conflitti attivi tracciati
              </span>
              <p className="text-xs text-zinc-500">
                Dati aggiornati al {lastUpdateDate} (UCDP GED v25.1)
              </p>
            </div>
            <p className="mt-4 max-w-xl">
              Visualizza tutti i conflitti armati attivi nel mondo su una mappa interattiva.
              I dati sono estratti dal database dell'
              <a
                href="https://www.uu.se/en/department/peace-and-conflict-research/research"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Uppsala Conflict Data Program (UCDP)
              </a>
              , il principale centro di ricerca sui conflitti armati dell'Università di Uppsala.
              Clicca sui marker rossi per vedere dettagli, cause, parti coinvolte e vittime stimate.
            </p>
          </div>
        </div>
      </header>

      {/* Contenuto principale con la mappa */}
      <section className="relative">
        {/* Layout principale: mappa e pannello dettagli */}
        <div className={`grid gap-6 transition-all duration-300 ${
          isPanelOpen ? 'md:grid-cols-[1fr_420px]' : 'grid-cols-1'
        }`}>
          {/* Container della mappa */}
          <div className={`relative rounded-3xl border overflow-hidden transition-colors duration-300 ${
            isDarkTheme ? 'bg-[#020202] border-gray-800' : 'bg-slate-50 border-gray-200'
          }`}>
            <div className="relative h-[70vh] w-full">
              <MapComponent
                onConflictSelect={handleConflictSelect}
                isPanelOpen={isPanelOpen}
                onThemeChange={setTheme}
                theme={theme}
              />
            </div>
          </div>

          {/* Pannello dettagli conflitto per desktop/tablet */}
          {isPanelOpen && selectedConflict && (
            <div className="hidden md:block">
              <ConflictDetailsPanel
                conflict={selectedConflict}
                onClose={handleClosePanel}
                theme={theme}
              />
            </div>
          )}
        </div>

        {/* Overlay mobile per pannello dettagli conflitto */}
        {isPanelOpen && selectedConflict && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClosePanel}
            />
            <div className="absolute inset-x-4 bottom-4 top-20">
              <ConflictDetailsPanel
                conflict={selectedConflict}
                onClose={handleClosePanel}
                theme={theme}
              />
            </div>
          </div>
        )}

        {/* Informazioni aggiuntive */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-500/20 p-2">
                <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Conflitti Attivi</h3>
                <p className="text-sm text-zinc-400">50+ conflitti mappati</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-500/20 p-2">
                <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Layer Tematici</h3>
                <p className="text-sm text-zinc-400">Economici, climatici, migratori</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-500/20 p-2">
                <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Notizie Aggiornate</h3>
                <p className="text-sm text-zinc-400">Fonti giornalistiche integrate</p>
              </div>
            </div>
          </div>

            <div className="rounded-3xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-500/20 p-2">
                  <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div>
                  <a
                    href="https://www.uu.se/en/department/peace-and-conflict-research/research"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Uppsala Conflict Data Program
                  </a>
                  <p className="text-sm text-zinc-400">Dipartimento di Ricerca sulla Pace e il Conflitto</p>
                  <p className="text-xs text-zinc-500 mt-1">Università di Uppsala, Svezia</p>
                </div>
              </div>
            </div>
        </div>
      </section>
    </MainLayout>
  );
}
