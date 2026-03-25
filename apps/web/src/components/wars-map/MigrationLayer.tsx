'use client';

import { memo } from 'react';
import { CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import { getMigrationFlows } from '@/lib/wars-map/migrationLayerData';
import { generateAutoPath, generatePathWithWaypoints } from '@/lib/wars-map/routePathGenerator';

const FLOW_COLOR = '#facc15';
const DESTINATION_COLOR = '#fde047';

interface MigrationLayerProps {
  visible: boolean;
}

function MigrationLayer({ visible }: MigrationLayerProps) {
  if (!visible) return null;

  const flows = getMigrationFlows();

  return (
    <>
      {flows.map((flow) => {
        const positions = flow.waypoints && flow.waypoints.length > 0
          ? generatePathWithWaypoints(
              [flow.startCoordinates, ...flow.waypoints, flow.endCoordinates],
              30
            )
          : generateAutoPath(
              flow.startCoordinates,
              flow.endCoordinates
            );
        const peopleInHundredsK = Math.max(1, flow.peopleDisplaced / 100000);

        return (
          <Polyline
            key={flow.id}
            positions={positions}
            pathOptions={{
              color: FLOW_COLOR,
              weight: Math.min(10, 1 + peopleInHundredsK),
              opacity: 0.8,
            }}
          >
            <Tooltip direction="top" sticky>
              <div className="text-xs w-full max-w-sm">
                <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 rounded-t-xl">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-gray-900">Migrazione</p>
                    <span className="inline-flex items-center rounded-full bg-yellow-50 border border-yellow-200 px-2 py-0.5 text-[10px] font-medium text-yellow-800 shadow-sm">
                      ~{(flow.peopleDisplaced / 1000).toFixed(0)}k persone
                    </span>
                  </div>
                  <p className="text-gray-600 mt-0.5 font-medium">
                    {flow.origin} → {flow.destination}
                  </p>
                </div>
                <div className="p-3 space-y-2.5 max-h-64 overflow-y-auto">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600">
                    <span>Status:</span>
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-inset ring-gray-500/10 capitalize">
                      {flow.status}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[11px] font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {flow.movementType === 'internal' ? 'Interno' : 'Transfrontaliero'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                    <div className="rounded-lg bg-gray-50 border border-gray-100 p-2">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Periodo</p>
                      <p className="font-semibold text-gray-700">{flow.period}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 border border-gray-100 p-2">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Affidabilità</p>
                      <p className="font-semibold text-gray-700 capitalize">{flow.confidence}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 border border-gray-100 p-2.5">
                    <p className="text-gray-700 text-[11px] leading-relaxed font-medium">
                      <span className="font-semibold text-gray-600">Cause:</span> {flow.causes}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium">
                      Aggiornato {flow.lastUpdate} · Fonti: {flow.sources.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </Tooltip>
            <CircleMarker
              center={[flow.endCoordinates.lat, flow.endCoordinates.lng]}
              radius={6 + Math.min(10, peopleInHundredsK)}
              pathOptions={{
                color: FLOW_COLOR,
                fillColor: DESTINATION_COLOR,
                fillOpacity: 0.6,
                weight: 1,
              }}
            />
          </Polyline>
        );
      })}
    </>
  );
}

export default memo(MigrationLayer);

