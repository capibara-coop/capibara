'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ArrowLeftRight, CloudSun, Info, LineChart, Newspaper, Minus, Plus, Globe, Map, Moon, Sun, MapPin, Satellite } from 'lucide-react';
import { getAllConflicts } from '@/lib/wars-map/conflictsData';
import { ConflictDetails } from '@/lib/wars-map/types';
import { fetchConflictDetails } from '@/lib/wars-map/api';
import EconomicLayer from './EconomicLayer';
import ClimateLayer from './ClimateLayer';
import MigrationLayer from './MigrationLayer';
import MediaLayer from './MediaLayer';

// Fix per l'icona marker di Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Funzione per creare icone con opacità personalizzate
function createConflictIcon(opacity: number = 1.0): L.Icon {
  const svgIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="white" stroke-width="2" opacity="${opacity}"/>
  </svg>`;
  // Codifica l'SVG in base64 per usarlo come data URI
  const encodedSvg = encodeURIComponent(svgIcon);
  
  return new L.Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${encodedSvg}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}

// Icona di default per i conflitti (opacità piena)
const conflictIcon = createConflictIcon(1.0);

interface MapComponentProps {
  onConflictSelect: (conflict: ConflictDetails) => void;
  isPanelOpen?: boolean;
  onThemeChange?: (theme: 'light' | 'dark') => void;
  theme?: 'light' | 'dark';
}

interface MapControllerProps {
  selectedConflictId: string | null;
  conflictCoords?: { lat: number; lng: number };
}

function MapController({ selectedConflictId, conflictCoords }: MapControllerProps) {
  const map = useMap();
  
  useEffect(() => {
    // Imposta la vista iniziale sul mondo intero solo al primo render
    if (!selectedConflictId) {
      map.setView([20, 0], 2);
    }
  }, [map]); // Rimosso selectedConflictId dalla dipendenza per evitare reset continui

  useEffect(() => {
    // Quando un conflitto viene selezionato, zoom e centra su di esso
    if (selectedConflictId && conflictCoords) {
      map.flyTo([conflictCoords.lat, conflictCoords.lng], 6, {
        animate: true,
        duration: 1.0,
      });
    }
  }, [map, selectedConflictId, conflictCoords]);

  return null;
}

// Stili di mappa disponibili
const mapStyles = {
  dark: {
    name: 'Stile Scuro',
    description: 'Tema scuro per evidenziare i conflitti',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    Icon: Moon,
  },
  light: {
    name: 'Stile Chiaro',
    description: 'Tema chiaro e minimalista',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    Icon: Sun,
  },
  standard: {
    name: 'OpenStreetMap',
    description: 'Stile classico OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    Icon: MapPin,
  },
  satellite: {
    name: 'Satellitare',
    description: 'Immagini satellitari ad alta risoluzione',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
    Icon: Satellite,
  },
} as const;

type MapStyleKey = keyof typeof mapStyles;

export default function MapComponent({
  onConflictSelect,
  isPanelOpen = false,
  onThemeChange,
  theme = 'dark',
}: MapComponentProps) {
  const conflicts = getAllConflicts();
  type LayerKey = 'economic' | 'climate' | 'migration' | 'media';
  const [layerVisibility, setLayerVisibility] = useState<Record<LayerKey, boolean>>({
    economic: true,
    climate: false,
    migration: false,
    media: false,
  });
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [showLegend, setShowLegend] = useState(true);
  const [selectedConflictId, setSelectedConflictId] = useState<string | null>(null);
  const [showMapStylePanel, setShowMapStylePanel] = useState(false);

  // Imposta automaticamente lo stile della mappa basato sul tema globale
  const mapStyle: MapStyleKey = theme === 'dark' ? 'dark' : 'light';
  const isDarkTheme = theme === 'dark';

  // Sempre mostrare tutti i conflitti (nessun filtro anno)
  const selectedYear = 'all';

  // Reset della selezione quando il pannello viene chiuso
  useEffect(() => {
    if (!isPanelOpen) {
      setSelectedConflictId(null);
    }
  }, [isPanelOpen]);

  // Chiudi il pannello stile mappa quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showMapStylePanel && !target.closest('[data-map-style-panel]')) {
        setShowMapStylePanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMapStylePanel]);

  // Il tema ora è controllato automaticamente dal prop theme

  const toggleLayer = (layer: LayerKey) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  const layerList = useMemo(
    () => [
      {
        key: 'economic' as LayerKey,
        label: 'Layer economico',
        description: 'Flussi di armi + shock prezzi materie prime',
        available: true,
      },
      {
        key: 'climate' as LayerKey,
        label: 'Layer climatico',
        description: 'Siccita, stress idrico, incendi',
        available: true,
      },
      {
        key: 'migration' as LayerKey,
        label: 'Layer migratorio',
        description: 'Corridoi dei profughi in tempo quasi reale',
        available: true,
      },
      {
        key: 'media' as LayerKey,
        label: 'Layer mediatico',
        description: 'Divergenza tra media locali e internazionali',
        available: true,
      },
    ],
    []
  );


  // Mostra sempre tutti i conflitti (senza filtro anno)
  const visibleConflicts = conflicts;

  const handleZoomIn = () => mapInstance?.zoomIn();
  const handleZoomOut = () => mapInstance?.zoomOut();
  const handleResetView = () => {
    setSelectedConflictId(null);
    mapInstance?.flyTo([20, 0], 2, { animate: true, duration: 1.0 });
  };

  const legendItems = useMemo(
    () => [
      {
        key: 'economic' as LayerKey,
        label: 'Economia',
        description: 'Corridoi armi & shock prezzi',
        accent: 'bg-orange-400',
        active: layerVisibility.economic,
      },
      {
        key: 'climate' as LayerKey,
        label: 'Clima',
        description: 'Stress idrico, incendi, CO₂',
        accent: 'bg-amber-400',
        active: layerVisibility.climate,
      },
      {
        key: 'migration' as LayerKey,
        label: 'Migrazioni',
        description: 'Flussi popolazione',
        accent: 'bg-yellow-400',
        active: layerVisibility.migration,
      },
      {
        key: 'media' as LayerKey,
        label: 'Media',
        description: 'Sentiment locale vs globale',
        accent: 'bg-blue-400',
        active: layerVisibility.media,
      },
    ],
    [layerVisibility]
  );

  const handleMarkerClick = async (conflictId: string) => {
    try {
      setSelectedConflictId(conflictId);
      const details = await fetchConflictDetails(conflictId);
      onConflictSelect(details);
    } catch (error) {
      console.error('Errore nel caricamento dei dettagli:', error);
    }
  };

  // Trova le coordinate del conflitto selezionato
  const selectedConflictCoords = selectedConflictId
    ? conflicts.find((c) => c.id === selectedConflictId)?.coordinates
    : undefined;

  // Funzione per ottenere l'opacità di un marker
  const getMarkerOpacity = (conflictId: string): number => {
    if (!selectedConflictId) return 1.0;
    return conflictId === selectedConflictId ? 1.0 : 0.3;
  };

  const controlBarClass = `pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-full px-3 py-2 transition ${
    isDarkTheme
      ? 'border border-white/15 bg-[#0a0a0d]/90 text-gray-100 shadow-2xl shadow-black/60'
      : 'border border-gray-200 bg-white/95 text-gray-900 shadow-xl'
  }`;

  const baseCircleButton = isDarkTheme
    ? 'rounded-full border border-white/15 bg-transparent p-1.5 text-gray-200 transition hover:bg-white/10 hover:text-white'
    : 'rounded-full border border-gray-200 p-1.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900';

  const layerButtonClass = (active: boolean, available: boolean) =>
    `flex h-10 w-10 items-center justify-center rounded-2xl border text-sm transition ${
      active
        ? isDarkTheme
          ? 'border-white/40 bg-white/10 text-white'
          : 'border-emerald-400 bg-emerald-50 text-emerald-700'
        : isDarkTheme
          ? 'border-white/15 bg-transparent text-gray-400 hover:text-white'
          : 'border-gray-200 bg-white/80 text-gray-500 hover:text-gray-800'
    } ${!available ? 'cursor-not-allowed opacity-40' : ''}`;

  const styleButtonClass = (active: boolean) =>
    `rounded-full border p-1.5 transition flex items-center gap-1.5 ${
      active
        ? isDarkTheme
          ? 'border-white/35 bg-[#0f0f12]/80 text-white'
          : 'border-gray-300 bg-gray-50 text-gray-800'
        : isDarkTheme
          ? 'border-white/15 bg-transparent text-gray-300 hover:text-white'
          : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900'
    }`;

  const panelSurfaceClass = `pointer-events-auto absolute bottom-full right-0 mb-2 w-72 rounded-2xl border p-3 shadow-xl backdrop-blur ${
    isDarkTheme ? 'border-white/15 bg-[#050505]/95 text-gray-100' : 'border-gray-200 bg-white/95 text-gray-900'
  }`;

  const legendContainerClass = `pointer-events-auto rounded-3xl border p-4 text-sm shadow-xl backdrop-blur ${
    isDarkTheme ? 'border-white/15 bg-[#0a0a0d]/85 text-gray-100' : 'border-white/50 bg-white/90 text-gray-800'
  }`;

  const legendItemClass = (active: boolean) =>
    `flex items-center gap-3 rounded-2xl border px-3 py-2 ${
      active
        ? isDarkTheme
          ? 'border-white/25 bg-white/5 text-gray-100'
          : 'border-gray-200 bg-white text-gray-900'
        : isDarkTheme
          ? 'border-white/10 bg-transparent text-gray-400'
          : 'border-gray-100 bg-white/60 text-gray-500'
    }`;

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
        whenReady={() => setMapInstance}
      >
        <MapController 
          selectedConflictId={selectedConflictId}
          conflictCoords={selectedConflictCoords}
        />
        <TileLayer
          attribution={mapStyles[mapStyle].attribution}
          url={mapStyles[mapStyle].url}
        />
        <EconomicLayer visible={layerVisibility.economic} />
        <ClimateLayer visible={layerVisibility.climate} />
        <MigrationLayer visible={layerVisibility.migration} />
        <MediaLayer visible={layerVisibility.media} />
        {visibleConflicts.map((conflict) => {
          const opacity = getMarkerOpacity(conflict.id);
          const icon = createConflictIcon(opacity);
          return (
            <Marker
              key={`${conflict.id}-${selectedConflictId || 'none'}`}
              position={[conflict.coordinates.lat, conflict.coordinates.lng]}
              icon={icon}
              eventHandlers={{
                click: () => handleMarkerClick(conflict.id),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm mb-1">{conflict.name}</h3>
                  <p className="text-xs text-gray-600">{conflict.country}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Clicca per maggiori dettagli
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[999] flex w-full justify-center px-4">
        <div className={controlBarClass}>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleResetView}
              className={baseCircleButton}
              aria-label="Reset vista"
            >
              <Globe size={16} />
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className={baseCircleButton}
              aria-label="Zoom in"
            >
              <Plus size={16} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className={baseCircleButton}
              aria-label="Zoom out"
            >
              <Minus size={16} />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-1.5">
            {layerList.map((layer) => {
              const active = layerVisibility[layer.key];
              const Icon =
                layer.key === 'economic'
                  ? LineChart
                  : layer.key === 'climate'
                    ? CloudSun
                    : layer.key === 'migration'
                      ? ArrowLeftRight
                      : Newspaper;
              return (
                <button
                  key={layer.key}
                  type="button"
                  disabled={!layer.available}
                  onClick={() => toggleLayer(layer.key)}
                  className={layerButtonClass(active, layer.available)}
                  aria-label={layer.label}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Stile mappa controllato automaticamente dal tema globale */}
            <button
              type="button"
              onClick={() => setShowLegend((prev) => !prev)}
              className={showLegend ? styleButtonClass(true) : styleButtonClass(false)}
              aria-label="Mostra/Nascondi legenda"
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>

      {showLegend && (
        <div className="pointer-events-none absolute left-4 top-1/2 z-[999] w-72 -translate-y-1/2">
          <div className={legendContainerClass}>
            <p className={`text-xs uppercase tracking-[0.3em] ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Legenda</p>
            <div className="mt-3 space-y-3">
              {legendItems.map((item) => (
                <div
                  key={item.key}
                  className={legendItemClass(item.active)}
                >
                  <span className={`h-2 w-2 rounded-full ${item.accent}`}></span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

