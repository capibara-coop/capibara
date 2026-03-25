'use client';

import { memo } from 'react';
import { CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import { getCommodityPriceShocks, getEconomicArmsFlows } from '@/lib/wars-map/economicLayerData';
import { generateAutoPath, generatePathWithWaypoints } from '@/lib/wars-map/routePathGenerator';

const ARMS_FLOW_COLOR = '#f97316';
const COMMODITY_COLOR = '#0ea5e9';

interface EconomicLayerProps {
  visible: boolean;
}

function EconomicLayer({ visible }: EconomicLayerProps) {
  if (!visible) {
    return null;
  }

  const armsFlows = getEconomicArmsFlows();
  const commodityShocks = getCommodityPriceShocks();

  return (
    <>
      {armsFlows.map((flow) => {
        const positions = flow.waypoints && flow.waypoints.length > 0
          ? generatePathWithWaypoints(
              [flow.startCoordinates, ...flow.waypoints, flow.endCoordinates],
              30
            )
          : generateAutoPath(
              flow.startCoordinates,
              flow.endCoordinates
            );

        return (
          <Polyline
            key={flow.id}
            positions={positions}
            pathOptions={{
              color: ARMS_FLOW_COLOR,
              weight: Math.min(6, 2 + flow.volumeBillionUSD / 20),
              opacity: 0.75,
              dashArray: '8 6'
            }}
          >
            <Tooltip direction="top" sticky>
              <div className="text-xs w-full max-w-sm">
                <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 rounded-t-xl">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-gray-900">Flusso di armi</p>
                    <span className="inline-flex items-center rounded-full bg-orange-50 border border-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700 shadow-sm">
                      ${flow.volumeBillionUSD.toFixed(1)}B
                    </span>
                  </div>
                  <p className="text-gray-600 mt-0.5 font-medium">
                    {flow.origin} → {flow.destination}
                  </p>
                </div>
                <div className="p-3 space-y-2.5 max-h-64 overflow-y-auto">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-gray-700">
                    <span>Trend:</span>
                    <span className={`px-1.5 py-0.5 rounded-md ${flow.trend === 'rising' ? 'bg-red-50 text-red-700 ring-1 ring-red-600/10' : flow.trend === 'falling' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/10' : 'bg-gray-100 text-gray-700 ring-1 ring-gray-600/10'}`}>
                      {flow.trend === 'rising' ? 'In aumento ↗' : flow.trend === 'falling' ? 'In calo ↘' : 'Stabile →'}
                    </span>
                  </div>
                  <div className="rounded-lg bg-gray-50 border border-gray-100 p-2.5">
                    <p className="text-gray-700 text-[11px] leading-relaxed">{flow.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                    <div className="rounded-lg bg-white border border-gray-200 p-2">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Finestra</p>
                      <p className="font-semibold text-gray-700">{flow.timeframe}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-gray-200 p-2">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Affidabilità</p>
                      <p className="font-semibold text-gray-700 capitalize">{flow.confidence}</p>
                    </div>
                  </div>
                  {flow.coverageNotes ? (
                    <div className="rounded-lg bg-gray-50 border border-dashed border-gray-200 p-2">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Copertura</p>
                      <p className="text-gray-600 text-[11px]">{flow.coverageNotes}</p>
                    </div>
                  ) : null}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium">
                      Aggiornato {new Date(flow.lastUpdated).toLocaleDateString('it-IT')} · Fonti: {flow.sources.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Polyline>
        );
      })}

      {commodityShocks.map((shock) => (
        <CircleMarker
          key={shock.id}
          center={[shock.coordinates.lat, shock.coordinates.lng]}
          radius={8 + Math.min(8, Math.abs(shock.priceChangePct) / 5)}
          pathOptions={{
            color: COMMODITY_COLOR,
            fillColor: COMMODITY_COLOR,
            fillOpacity: 0.35,
            weight: 1.5
          }}
        >
          <Tooltip direction="top" sticky>
            <div className="text-xs w-full">
              <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 rounded-t-xl">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-gray-900">Shock commodity</p>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium shadow-sm ${shock.priceChangePct > 0 ? 'bg-red-50 border-red-100 text-red-700' : 'bg-green-50 border-green-100 text-green-700'}`}>
                    {shock.priceChangePct > 0 ? '+' : ''}{shock.priceChangePct}%
                  </span>
                </div>
                <p className="text-gray-600 mt-0.5 font-medium">
                  {shock.commodity} · {shock.country}
                </p>
              </div>
              <div className="p-3 space-y-2.5">
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-2">
                  <p className="text-gray-600 text-[11px] font-medium">Driver: {shock.driver}</p>
                </div>
                <div className="pt-2 border-t border-gray-100 space-y-0.5">
                  <p className="text-[10px] text-gray-500 font-medium">
                    Periodo {shock.timeframe} · Affidabilità {shock.confidence}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Fonti: {shock.sources.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}

export default memo(EconomicLayer);

