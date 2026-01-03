'use client';

import { memo } from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import { getClimateStressZones } from '@/lib/wars-map/climateLayerData';

type ClimateDriver = 'drought' | 'water' | 'fire' | 'co2';

const DRIVER_CONFIG: Record<
  ClimateDriver,
  { color: string; icon: string; label: string; description: string }
> = {
  drought: {
    color: '#facc15',
    icon: 'drought',
    label: 'Siccità',
    description: 'Stress idrico',
  },
  water: {
    color: '#0ea5e9',
    icon: 'water',
    label: 'Acqua',
    description: 'Stress idrico',
  },
  fire: {
    color: '#fb923c',
    icon: 'fire',
    label: 'Incendi',
    description: 'Fire risk',
  },
  co2: {
    color: '#a855f7',
    icon: 'co2',
    label: 'Smog',
    description: 'CO₂ / Smog',
  },
};

function getDriverSvg(driver: ClimateDriver, color: string) {
  switch (driver) {
    case 'drought':
      return `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 30L18 24L21 30" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 18C14 16 15 13 18 10C21 13 22 16 24 18C26 20 27 24 18 24C9 24 10 20 12 18Z" stroke="${color}" stroke-width="2" fill="rgba(250,204,21,0.1)"/>
          <circle cx="11" cy="9" r="1.5" fill="${color}" />
          <circle cx="24" cy="6" r="1" fill="${color}" />
        </svg>
      `;
    case 'water':
      return `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 7C18 7 10 16 10 22C10 26.4183 13.5817 30 18 30C22.4183 30 26 26.4183 26 22C26 16 18 7 18 7Z" fill="rgba(14,165,233,0.12)" stroke="${color}" stroke-width="2"/>
          <path d="M14 22C15.2 23.2 16.8 24 18.5 24C20.2 24 21.8 23.2 23 22" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    case 'fire':
      return `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 30C11 27 11 24 12 22C13 20 17 19 18 14C20 16 22.5 18 23 21C26 19 26 17 25 14C30 19 28 26 26 28C22 32 17 33 13 30Z" fill="rgba(251,146,60,0.15)" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
          <path d="M18 25C17.2 24 17 23 17.5 22C18 21 19.5 20.5 20 18.5C20.8333 19.1667 21.6667 20 22 21.5C23.5 20.5 23.5 19.5 23 18" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    case 'co2':
      return `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 23C6 20 8 17 10 16C11 12 15 11 17 12C18 9 22 9 24 12C27 11 30 13 30 16C33 17 33 21 30 23H8Z" fill="rgba(168,85,247,0.12)" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="25" r="1.8" fill="${color}" opacity="0.6"/>
          <circle cx="16.5" cy="27" r="1.4" fill="${color}" opacity="0.5"/>
          <circle cx="21" cy="25.5" r="1.2" fill="${color}" opacity="0.6"/>
        </svg>
      `;
    default:
      return '';
  }
}

function createClimateIcon(driver: ClimateDriver, severity: number) {
  const config = DRIVER_CONFIG[driver];
  const size = 44 + severity * 3;
  const svg = getDriverSvg(driver, config.color);

  return L.divIcon({
    html: `
      <div
        style="
          width:${size}px;
          min-width:${size}px;
          height:${size + 14}px;
          padding:6px 8px 8px;
          border-radius:18px;
          background:rgba(2, 6, 23, 0.9);
          border:2px solid ${config.color};
          box-shadow:0 12px 35px rgba(15,23,42,0.55);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color:#f8fafc;
          text-transform:uppercase;
          backdrop-filter: blur(6px);
        "
      >
        <div style="width:32px;height:32px;margin-bottom:4px;">
          ${svg}
        </div>
        <div style="font-size:10px; font-weight:700; letter-spacing:0.4px;">${config.label}</div>
        <div style="font-size:9px; font-weight:600; color:${config.color}; margin-top:2px;">S${severity}</div>
      </div>
    `,
    className: '',
    iconSize: [size, size + 14],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

interface ClimateLayerProps {
  visible: boolean;
}

function ClimateLayer({ visible }: ClimateLayerProps) {
  if (!visible) return null;

  const zones = getClimateStressZones();

  return (
    <>
      {zones.map((zone) => {
        const icon = createClimateIcon(zone.driver, zone.severity);
        return (
          <Marker
            key={zone.id}
            position={[zone.coordinates.lat, zone.coordinates.lng]}
            icon={icon}
          >
            <Tooltip direction="top" sticky>
              <div className="text-xs w-full">
                <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 rounded-t-xl">
                  <p className="font-bold text-gray-900">{zone.region}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center rounded-full bg-white border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-700 capitalize shadow-sm">
                      {DRIVER_CONFIG[zone.driver].description}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">Severità {zone.severity}/5</span>
                  </div>
                </div>
                <div className="p-3 space-y-2.5">
                  <p className="text-gray-700 leading-snug">{zone.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                    <div className="rounded-lg bg-gray-50 border border-gray-100 p-2">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Indicatore</p>
                      <p className="font-semibold text-gray-700">{zone.indicator}</p>
                      <p className="text-gray-500">
                        {zone.value}
                        <span className="text-gray-400"> {zone.unit}</span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 border border-gray-100 p-2">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Trend</p>
                      <p className="font-semibold text-gray-700 capitalize">
                        {zone.trend === 'worsening' ? 'In peggioramento' : zone.trend === 'improving' ? 'In miglioramento' : 'Stabile'}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 border border-gray-100 p-2">
                    <p className="text-gray-600 italic text-[11px]">{zone.linkageToConflict}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium">
                      {zone.timeframe} · Fonti: {zone.sources.join(', ')}
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

export default memo(ClimateLayer);

