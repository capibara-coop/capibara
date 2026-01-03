'use client';

import { memo } from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import { getMediaSentimentNodes } from '@/lib/wars-map/mediaLayerData';

interface MediaLayerProps {
  visible: boolean;
}

interface DivergenceConfig {
  key: 'local-positive' | 'international-positive' | 'balanced';
  color: string;
  label: string;
  subtitle: string;
}

function getDivergenceConfig(local: number, international: number): DivergenceConfig {
  const delta = local - international;
  if (delta > 0.4) {
    return {
      key: 'local-positive',
      color: '#10b981',
      label: 'Narrativa locale',
      subtitle: '+',
    };
  }
  if (delta < -0.4) {
    return {
      key: 'international-positive',
      color: '#ef4444',
      label: 'Narrativa esterna',
      subtitle: '-',
    };
  }
  return {
    key: 'balanced',
    color: '#3b82f6',
    label: 'Allineati',
    subtitle: '≈',
  };
}

function buildSentimentBadge(local: number, international: number, color: string) {
  const localHeight = 32 + local * 12;
  const intlHeight = 32 + international * 12;
  const divergence = Math.round((local - international) * 100);

  return `
    <div style="
      width:44px;
      height:44px;
      border-radius:14px;
      background:linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.75));
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:4px;
      padding:6px;
    ">
      <div style="
        width:100%;
        height:16px;
        display:flex;
        align-items:flex-end;
        gap:4px;
      ">
        <div style="
          flex:1;
          height:${Math.max(6, Math.min(16, localHeight / 4))}px;
          background:${color};
          border-radius:3px;
          opacity:0.9;
        "></div>
        <div style="
          flex:1;
          height:${Math.max(6, Math.min(16, intlHeight / 4))}px;
          background:rgba(148,163,184,0.6);
          border-radius:3px;
        "></div>
      </div>
      <div style="
        width:100%;
        height:14px;
        border-radius:999px;
        border:1px solid rgba(148,163,184,0.3);
        color:${color};
        font-weight:600;
        font-size:10px;
        text-align:center;
        letter-spacing:0.5px;
      ">
        ${divergence > 0 ? '+' : ''}${divergence}
      </div>
    </div>
  `;
}

function createMediaIcon(local: number, international: number) {
  const config = getDivergenceConfig(local, international);
  const intensity = Math.min(1, Math.abs(local - international));
  const size = 42 + intensity * 8;
  const badge = buildSentimentBadge(local, international, config.color);

  return L.divIcon({
    html: `
      <div
        style="
          width:${size}px;
          min-width:${size}px;
          height:${size}px;
          padding:3px;
          border-radius:16px;
          background:rgba(2, 6, 23, 0.95);
          border:2px solid ${config.color};
          box-shadow:0 16px 34px rgba(15,23,42,0.45);
          display:flex;
          align-items:center;
          justify-content:center;
          backdrop-filter: blur(8px);
        "
      >
        ${badge}
      </div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function MediaLayer({ visible }: MediaLayerProps) {
  if (!visible) return null;

  const nodes = getMediaSentimentNodes();

  return (
    <>
      {nodes.map((node) => {
        const icon = createMediaIcon(node.localSentiment, node.internationalSentiment);
        return (
          <Marker
            key={node.id}
            position={[node.coordinates.lat, node.coordinates.lng]}
            icon={icon}
          >
            <Tooltip direction="top" sticky>
              <div className="text-xs w-full">
                <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 rounded-t-xl">
                  <p className="font-bold text-gray-900">{node.location}</p>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <div className="bg-white border border-gray-200 rounded px-2 py-1 text-center shadow-sm">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Locale</p>
                      <p className={`font-bold ${node.localSentiment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(node.localSentiment * 100).toFixed(0)}
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded px-2 py-1 text-center shadow-sm">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Int'l</p>
                      <p className={`font-bold ${node.internationalSentiment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(node.internationalSentiment * 100).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 space-y-2.5">
                  <p className="text-gray-600 leading-snug">{node.divergence}</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                    <div className="rounded-md bg-gray-50 border border-gray-100 px-2 py-1">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Copertura</p>
                      <p className="font-semibold text-gray-700">{node.coverageSources} fonti</p>
                    </div>
                    <div className="rounded-md bg-gray-50 border border-gray-100 px-2 py-1">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Articoli</p>
                      <p className="font-semibold text-gray-700">
                        {node.sampleSize ? `${node.sampleSize}` : 'n/d'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {node.keyTopics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-100 space-y-0.5">
                    <p className="text-[10px] text-gray-500 font-medium">
                      {node.timeframe} · Affidabilità {node.confidence}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Aggiornato {node.lastUpdate} · Fonti: {node.sources.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}

export default memo(MediaLayer);

