'use client';

import { useMemo } from 'react';
import { getAllConflicts } from '@/lib/wars-map/conflictsData';

type HeaderProps = {
  className?: string;
  theme?: 'light' | 'dark';
};

export default function Header({ className = '', theme = 'light' }: HeaderProps) {
  const conflicts = getAllConflicts();
  const isDark = theme === 'dark';

  // Mostra sempre tutti i conflitti (senza filtro anno)
  const visibleConflicts = conflicts;

  const totalConflicts = visibleConflicts.length;

  return (
    <div className={className}>
      <header
        className={`mx-auto flex w-full max-w-2xl items-center justify-between gap-2 rounded-2xl border px-4 py-3 shadow-md backdrop-blur ${
          isDark ? 'border-white/15 bg-[#060608]/90 text-gray-100 shadow-black/40' : 'border-white/40 bg-white/90 text-gray-900'
        }`}
      >
        <div className="flex-shrink-0">
          <p className={`text-[10px] uppercase tracking-[0.4em] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Wars Map</p>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Mappa globale dei conflitti</p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className={`text-[9px] uppercase tracking-[0.35em] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Conflitti attivi</p>
            <p className={`text-2xl font-semibold ${isDark ? 'text-red-300' : 'text-red-600'}`}>{totalConflicts}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

