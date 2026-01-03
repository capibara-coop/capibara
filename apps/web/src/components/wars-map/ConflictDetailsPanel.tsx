'use client';

import { ConflictDetails } from '@/lib/wars-map/types';
import {
  Activity,
  Calendar,
  ExternalLink,
  MapPin,
  Newspaper,
  Target,
  Users,
  X,
} from 'lucide-react';

interface ConflictDetailsPanelProps {
  conflict: ConflictDetails;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

const statusClassMap: Record<string, string> = {
  active: 'bg-red-100 text-red-800',
  escalating: 'bg-orange-100 text-orange-800',
  'de-escalating': 'bg-yellow-100 text-yellow-800',
};

function getStatusLabel(status: string) {
  switch (status) {
    case 'active':
      return 'Attivo';
    case 'escalating':
      return 'In escalation';
    case 'de-escalating':
      return 'In de-escalation';
    default:
      return status;
  }
}

function conflictTypeLabel(type?: number) {
  switch (type) {
    case 1:
      return 'Stato vs Stato';
    case 2:
      return 'Stato vs Territorio';
    case 3:
      return 'Stato vs Movimento armato';
    case 4:
      return 'Conflitto internazionale localizzato';
    default:
      return type ? `Tipo ${type}` : 'n/d';
  }
}

export default function ConflictDetailsPanel({ conflict, onClose, theme = 'light' }: ConflictDetailsPanelProps) {
  const isDark = theme === 'dark';
  const panelSurface =
    'pointer-events-auto h-full overflow-y-auto rounded-3xl border shadow-2xl backdrop-blur-xl ' +
    (isDark ? 'border-white/15 bg-[#050505]/90 text-gray-100' : 'border-white/30 bg-white/95 text-gray-900');
  const headerSurface =
    'sticky top-0 flex items-start justify-between gap-4 rounded-t-3xl border-b px-6 py-5 backdrop-blur-xl ' +
    (isDark ? 'border-white/10 bg-[#050505]/95' : 'border-white/50 bg-white/95');
  const cardBase = (extra = '') =>
    `rounded-2xl border p-3 ${extra} ${
      isDark ? 'border-white/10 bg-[#101010]/75 text-gray-100' : 'border-gray-200 bg-white text-gray-900'
    }`;
  const mutedText = isDark ? 'text-gray-400' : 'text-gray-500';
  const secondaryText = isDark ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={`rounded-3xl border overflow-hidden h-fit max-h-[70vh] overflow-y-auto ${
      isDark ? 'border-gray-800 bg-[#020202]' : 'border-gray-200 bg-white'
    }`}>
      <div className={`px-6 py-4 border-b ${
        isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={`mb-1 text-xs uppercase tracking-[0.35em] ${mutedText}`}>Conflitto</p>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{conflict.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi pannello"
            className={`rounded-full border p-2 transition ml-4 flex-shrink-0 ${
              isDark
                ? 'border-white/15 text-gray-300 hover:bg-white/10 hover:text-white'
                : 'border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className={cardBase()}>
              <p className={`text-[10px] uppercase tracking-[0.3em] ${mutedText}`}>Status</p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isDark
                      ? 'border border-white/20 bg-[#1f1f24] text-gray-100'
                      : statusClassMap[conflict.status] ?? 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <Activity size={12} />
                  {getStatusLabel(conflict.status)}
                </span>
              </div>
              <p className={`mt-1 text-[11px] ${mutedText}`}>
                Agg. {new Date(conflict.lastUpdated).toLocaleDateString('it-IT')}
              </p>
            </div>
            <div className={cardBase()}>
              <p className={`text-[10px] uppercase tracking-[0.3em] ${mutedText}`}>Timeline</p>
              <div className={`mt-2 flex items-center gap-2 text-sm ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                <Calendar size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                {new Date(conflict.startDate).toLocaleDateString('it-IT')}
              </div>
              <p className={`mt-1 text-[11px] ${mutedText}`}>Registrato nel dataset UCDP</p>
            </div>
          </div>

          <div className={cardBase('p-4 space-y-2')}>
            <div className="flex items-start gap-2">
              <MapPin className={`mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} size={18} />
              <div>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{conflict.country}</p>
                <p className={`text-xs ${mutedText}`}>{conflict.region}</p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${secondaryText}`}>{conflict.description}</p>
          </div>

          <div className={cardBase('p-4')}>
            <div className="mb-3 flex items-center gap-2">
              <Users size={16} className={isDark ? 'text-gray-300' : 'text-gray-500'} />
              <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Parti coinvolte</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {conflict.parties.map((party) => (
                <span
                  key={party}
                  className={`rounded-full px-3 py-1 text-sm ${
                    isDark ? 'bg-[#1c1c1c] text-gray-200' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {party}
                </span>
              ))}
            </div>
          </div>

          {conflict.casualties && (
            <div
              className={`rounded-2xl border p-4 ${
                isDark ? 'border-red-500/30 bg-red-600/10 text-red-100' : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Target size={16} className="text-red-300" />
                <h3 className="text-sm font-semibold text-red-100">Morti stimati</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-red-200">
                {conflict.casualties.estimated.toLocaleString('it-IT')}
              </p>
              <p className="mt-1 text-xs text-red-200/80">
                Ultimo update {new Date(conflict.casualties.lastUpdated).toLocaleDateString('it-IT')}
              </p>
            </div>
          )}

          {conflict.ucdp && (
            <div className={cardBase('p-4 space-y-2 text-sm')}>
              <div className="flex items-center gap-2">
                <Activity size={16} className={isDark ? 'text-gray-300' : 'text-gray-500'} />
                <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Indicatori UCDP</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={`text-[11px] uppercase tracking-[0.2em] ${mutedText}`}>Tipo</p>
                  <p className="font-semibold">{conflictTypeLabel(conflict.ucdp.typeOfConflict)}</p>
                </div>
                <div>
                  <p className={`text-[11px] uppercase tracking-[0.2em] ${mutedText}`}>Morti (best)</p>
                  <p className="font-semibold">
                    {conflict.ucdp.bestEstimate
                      ? conflict.ucdp.bestEstimate.toLocaleString('it-IT')
                      : 'n/d'}
                  </p>
                </div>
              </div>
              <p className={`text-xs ${mutedText}`}>
                Fonte: {conflict.ucdp.label
                  ? `${conflict.ucdp.label} · v${conflict.ucdp.datasetVersion}`
                  : `UCDP v${conflict.ucdp.datasetVersion}`}
              </p>
            </div>
          )}

          {conflict.news && conflict.news.length > 0 && (
            <div className={cardBase('p-4')}>
              <div className="mb-3 flex items-center gap-2">
                <Newspaper size={16} className={isDark ? 'text-gray-300' : 'text-gray-500'} />
                <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Notizie recenti</h3>
              </div>
              <div className="space-y-3">
                {conflict.news.map((article) => (
                  <a
                    key={article.url}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  className={`block rounded-xl border p-3 transition ${
                    isDark
                      ? 'border-white/15 bg-[#121212] hover:border-white/30 hover:bg-[#1a1a1a]'
                      : 'border-gray-200 bg-gray-50/80 hover:border-purple-300 hover:bg-white'
                  }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className={`text-sm font-semibold line-clamp-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                          {article.title}
                        </p>
                        <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {article.description}
                        </p>
                      </div>
                      <ExternalLink size={16} className={isDark ? 'text-gray-400 mt-0.5' : 'text-gray-400 mt-0.5'} />
                    </div>
                    <div className={`mt-2 flex items-center justify-between text-[11px] ${mutedText}`}>
                      <span>{article.source}</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString('it-IT', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {conflict.sources && conflict.sources.length > 0 && (
            <div className={cardBase('p-4')}>
              <div className="mb-2 flex items-center gap-2">
                <Activity size={16} className={isDark ? 'text-gray-300' : 'text-gray-500'} />
                <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Fonti</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {conflict.sources.map((source) => (
                  <span
                    key={source}
                    className={`rounded-full px-2 py-1 text-xs ${
                      isDark ? 'bg-[#1b1b1f] text-gray-200' : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
