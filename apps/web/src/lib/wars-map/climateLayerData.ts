import { ClimateStressZone } from './types';

const climateStressZones: ClimateStressZone[] = [
  {
    id: 'horn-africa-drought',
    region: 'Corno d’Africa',
    coordinates: { lat: 8.9806, lng: 38.7578 },
    severity: 5,
    driver: 'drought',
    description: 'Quinto anno consecutivo di piogge scarse, raccolti -60% e pozzi prosciugati.',
    timeframe: 'Q1 2024',
    linkageToConflict: 'Competizione per pascoli e acqua alimenta scontri tra comunità in Etiopia, Kenya e Somalia.',
    indicator: 'Deficit piovoso',
    value: -58,
    unit: '% rispetto media',
    trend: 'worsening',
    sources: ['ICPAC', 'FEWS NET', 'UNOCHA']
  },
  {
    id: 'iraq-water-stress',
    region: 'Bacino Tigri-Eufrate',
    coordinates: { lat: 33.3152, lng: 44.3661 },
    severity: 4,
    driver: 'water',
    description: 'Portata dei fiumi ridotta del 40% per dighe a monte e ondate di calore sopra 45°C.',
    timeframe: 'Dic 2023 - Gen 2024',
    linkageToConflict: 'Milizie e agricoltori in Iraq meridionale lottano per irrigazione → proteste e blocchi.',
    indicator: 'Portata fiume',
    value: -42,
    unit: '% rispetto 10 anni',
    trend: 'worsening',
    sources: ['Iraqi Ministry of Water', 'UNEP', 'Chatham House']
  },
  {
    id: 'amazonas-fire',
    region: 'Amazzonia Brasiliana',
    coordinates: { lat: -3.4653, lng: -62.2159 },
    severity: 3,
    driver: 'fire',
    description: 'Incendi e deforestazione record, fumo denso su corridoi logistici.',
    timeframe: 'Estate 2023',
    linkageToConflict: 'Conflitti tra comunità indigene e squadre illegali di estrazione oro/legname.',
    indicator: 'Focolai attivi',
    value: 3120,
    unit: 'Satellite VIIRS',
    trend: 'worsening',
    sources: ['INPE', 'Greenpeace', 'MapBiomas']
  },
  {
    id: 'south-asia-co2',
    region: 'Nord India / Pakistan',
    coordinates: { lat: 28.6448, lng: 77.2167 },
    severity: 3,
    driver: 'co2',
    description: 'Concentrazioni CO₂ e PM2.5 oltre 200 AQI per 30+ giorni consecutivi.',
    timeframe: 'Inverno 2023',
    linkageToConflict: 'Tensioni sociali per chiusure scuole e limiti industriali; cortei anti-smog repressi.',
    indicator: 'PM2.5 medio',
    value: 212,
    unit: 'AQI',
    trend: 'stable',
    sources: ['WAQI', 'SAFAR India', 'WHO']
  },
  {
    id: 'mediterranean-drought',
    region: 'Spagna sudorientale',
    coordinates: { lat: 38.3452, lng: -0.4815 }, // Alicante
    severity: 4,
    driver: 'drought',
    description: 'Bacini idrici di Murcia e Valencia al 28% della capacità; razionamenti agricoli in vigore.',
    timeframe: 'Q1 2024',
    linkageToConflict: 'Tensioni tra agricoltori e autorità sui diritti idrici e proteste contro i tagli.',
    indicator: 'Riempimento bacini',
    value: 28,
    unit: '% capacità',
    trend: 'worsening',
    sources: ['Confederación Hidrográfica del Segura', 'Copernicus', 'Ministerio Transición Ecológica']
  },
  {
    id: 'mekong-water',
    region: 'Delta del Mekong',
    coordinates: { lat: 10.0338, lng: 105.7855 },
    severity: 3,
    driver: 'water',
    description: 'Salinizzazione record e livello fiume -1,2m rispetto alla media impediscono semine di riso.',
    timeframe: 'Dic 2023 - Gen 2024',
    linkageToConflict: 'Comunità fluviali vietnamite e cambogiane esportano forza lavoro o occupano terre altrui.',
    indicator: 'Livello Mekong',
    value: -1.2,
    unit: 'm rispetto media',
    trend: 'worsening',
    sources: ['Mekong River Commission', 'Vietnam DRR', 'FAO']
  },
  {
    id: 'canada-fire-risk',
    region: 'Columbia Britannica / Alberta',
    coordinates: { lat: 53.7267, lng: -127.6476 },
    severity: 4,
    driver: 'fire',
    description: 'Fuel dryness code a livelli record e vento di föhn; comunità indigene evacuate preventivamente.',
    timeframe: 'Gen 2024',
    linkageToConflict: 'Disputes sulle concessioni forestali e proteste contro gli impianti LNG in costruzione.',
    indicator: 'Canadian Fire Weather Index',
    value: 86,
    unit: 'FWI',
    trend: 'worsening',
    sources: ['Natural Resources Canada', 'NOAA', 'First Nations Emergency']
  },
  {
    id: 'philippines-coastal-flood',
    region: 'Visayas orientali',
    coordinates: { lat: 11.2400, lng: 124.9999 }, // Leyte
    severity: 3,
    driver: 'water',
    description: 'Ondate di tempeste e marea di tempesta post-tifone inondano città costiere e basi militari.',
    timeframe: 'Nov 2023 - Gen 2024',
    linkageToConflict: 'Base navale di Guiuan usata per operazioni nel Mar Cinese Meridionale, tensioni con comunità di pescatori.',
    indicator: 'Anomalia livello mare',
    value: 0.42,
    unit: 'm sopra media',
    trend: 'worsening',
    sources: ['PAGASA', 'JRC Global Flood', 'ADB']
  }
];

export function getClimateStressZones(): ClimateStressZone[] {
  return climateStressZones;
}

