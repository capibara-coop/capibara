import { CommodityPriceShock, EconomicArmsFlow } from './types';

const armsFlows: EconomicArmsFlow[] = [
  {
    id: 'arms-eu-ukr',
    origin: 'Stati Uniti / UE',
    destination: 'Ucraina',
    startCoordinates: { lat: 50.1109, lng: 8.6821 },
    endCoordinates: { lat: 50.4501, lng: 30.5234 },
    volumeBillionUSD: 78,
    trend: 'rising',
    description:
      'Trasferimenti di sistemi Patriot, IRIS-T, NASAMS, artiglierie da 155mm e veicoli Bradley/Leopard attraverso hub ferroviari di Rzeszów e Magdeburgo. Il 2024 vede un focus su difesa aerea stratificata e munizioni a lungo raggio.',
    lastUpdated: '2024-01-20',
    timeframe: 'Q4 2023 - Gen 2024',
    confidence: 'high',
    coverageNotes: 'Licenze export UE, report drawdown USA, logistica ferroviaria polacca.',
    sources: ['SIPRI', 'NATO STAT', 'U.S. DoD', 'Bundeswehr', 'UK MoD']
  },
  {
    id: 'arms-rus-africa',
    origin: 'Russia',
    destination: 'Sahel (Mali, Burkina Faso, Niger)',
    startCoordinates: { lat: 55.7558, lng: 37.6173 },
    endCoordinates: { lat: 13.5317, lng: -2.4604 },
    waypoints: [
      { lat: 45.4642, lng: 9.19 },
      { lat: 43.7696, lng: 11.2558 },
      { lat: 41.9028, lng: 12.4964 },
      { lat: 40.8518, lng: 14.2681 },
      { lat: 37.5079, lng: 15.083 }
    ],
    volumeBillionUSD: 4.2,
    trend: 'rising',
    description:
      'Invio di sistemi Pantsir/Tor, elicotteri Mi-24 e blindati leggeri con il supporto del contingente Africa Corps (ex Wagner). Rotte miste aeree/marittime che toccano la Sicilia e poi Algeria/Libia prima del Sahel.',
    lastUpdated: '2024-01-12',
    timeframe: 'Set 2023 - Gen 2024',
    confidence: 'medium',
    coverageNotes: 'OSINT voli cargo, contratti noti delle giunte, panel ONU Sahel.',
    sources: ['ACLED', 'SIPRI', 'Think Africa', 'UN Panel of Experts', 'International Crisis Group']
  },
  {
    id: 'arms-iran-yemen',
    origin: 'Iran',
    destination: 'Yemen (Houthi)',
    startCoordinates: { lat: 27.1832, lng: 56.2666 },
    endCoordinates: { lat: 15.5527, lng: 48.5164 },
    volumeBillionUSD: 1.1,
    trend: 'stable',
    description:
      'Componenti per missili Qiam/Burkan, droni Shahed e armi anticarro spediti via dhow nel Golfo di Aden o smistati via Oman. Cresce la complessità dei payload nonostante l’embargo ONU.',
    lastUpdated: '2024-01-05',
    timeframe: '2023 - Gen 2024',
    confidence: 'medium',
    coverageNotes: 'Sequestri Combined Maritime Forces, analisi detriti ONU, tracciamento dhow.',
    sources: ['UN Panel of Experts', 'C4ADS', 'Royal Navy', 'U.S. CENTCOM', "Jane's Defence"]
  },
  {
    id: 'arms-china-myanmar',
    origin: 'Cina',
    destination: 'Myanmar',
    startCoordinates: { lat: 22.5431, lng: 114.0579 },
    endCoordinates: { lat: 21.9588, lng: 96.0891 },
    volumeBillionUSD: 2.8,
    trend: 'rising',
    description:
      'Flusso di droni CH-3, sistemi di sorveglianza, kit cyber e visori notturni lungo il corridoio Yunnan–Muse–Mandalay, usati da Tatmadaw e milizie filogovernative.',
    lastUpdated: '2024-01-18',
    timeframe: 'Q3 2023 - Gen 2024',
    confidence: 'medium',
    coverageNotes: 'Registri doganali Yunnan + report Amnesty Tech + testimonianze ONG di confine.',
    sources: ['UN Comtrade', 'Amnesty Tech', 'SIPRI', 'Human Rights Watch', 'Myanmar Witness']
  },
  {
    id: 'arms-israel-azerbaijan',
    origin: 'Israele',
    destination: 'Azerbaijan',
    startCoordinates: { lat: 32.0853, lng: 34.7818 },
    endCoordinates: { lat: 40.4093, lng: 49.8671 },
    volumeBillionUSD: 1.7,
    trend: 'rising',
    description:
      'Consegne di radar Green Pine, droni Harop e munizioni guidate destinate al fronte Nagorno-Karabakh con scali tattici a Tbilisi e voli cargo monitorati da ADS-B.',
    lastUpdated: '2024-01-14',
    timeframe: 'Ago 2023 - Gen 2024',
    confidence: 'medium',
    coverageNotes: 'Flight tracking, documenti parlamentari israeliani, bilanci MOD azero.',
    sources: ['FlightRadar OSINT', 'Haaretz', 'Baku Research Institute']
  },
  {
    id: 'arms-uae-libya',
    origin: 'EAU (Abu Dhabi)',
    destination: 'Libia occidentale',
    startCoordinates: { lat: 24.4539, lng: 54.3773 },
    endCoordinates: { lat: 32.8872, lng: 13.1913 },
    volumeBillionUSD: 0.9,
    trend: 'stable',
    description:
      'Componenti per droni Wing Loong, sistemi anti-UAV e blindati Nimr diretti a milizie filo-Haftar attraverso gli aeroporti di Al Khadim e Benina o via nave verso Bengasi.',
    lastUpdated: '2024-01-09',
    timeframe: 'Q2 2023 - Gen 2024',
    confidence: 'low',
    coverageNotes: 'Immagini satellitari Planet, panel ONU Libia, registri portuali.',
    sources: ['UN Panel Libya', 'IISS', 'Janes', 'Satellite Sentinel']
  }
];

const commodityShocks: CommodityPriceShock[] = [
  {
    id: 'grain-black-sea',
    commodity: 'Grano',
    country: 'Ucraina',
    coordinates: { lat: 46.4825, lng: 30.7233 },
    priceChangePct: 34,
    driver: 'Blocchi al corridoio del Mar Nero e attacchi ai porti fluviali.',
    timeframe: 'Q4 2023 - Q1 2024',
    confidence: 'high',
    sources: ['FAO', 'Black Sea Grain Initiative']
  },
  {
    id: 'oil-red-sea',
    commodity: 'Petrolio',
    country: 'Yemen / Mar Rosso',
    coordinates: { lat: 15.3229, lng: 38.9251 },
    priceChangePct: 18,
    driver: 'Rischi di shipping nel Mar Rosso e premi assicurativi su rotte alternative.',
    timeframe: 'Dic 2023 - Gen 2024',
    confidence: 'medium',
    sources: ['BloombergNEF', "Lloyd's List"]
  },
  {
    id: 'cobalt-drc',
    commodity: 'Cobalto',
    country: 'RDC',
    coordinates: { lat: -10.714, lng: 25.485 },
    priceChangePct: 22,
    driver: 'Interruzioni della supply chain per insicurezza nelle miniere artigianali.',
    timeframe: 'Gen 2024',
    confidence: 'medium',
    sources: ['Benchmark Minerals', 'UNEP']
  },
  {
    id: 'gas-europe',
    commodity: 'Gas naturale',
    country: 'Europa',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    priceChangePct: 15,
    driver: 'Tagli alle forniture russe e domanda invernale anomala.',
    timeframe: 'Dic 2023',
    confidence: 'high',
    sources: ['ICE TTF', 'IEA']
  },
  {
    id: 'wheat-horn',
    commodity: 'Grano',
    country: "Corno d'Africa",
    coordinates: { lat: 9.0108, lng: 38.7613 },
    priceChangePct: 41,
    driver: 'Conflitti in Sudan e Etiopia combinati con El Niño che devasta i raccolti.',
    timeframe: 'Nov 2023 - Gen 2024',
    confidence: 'medium',
    sources: ['WFP', 'FEWS NET']
  },
  {
    id: 'rice-seasia',
    commodity: 'Riso bianco',
    country: 'Sud-est asiatico',
    coordinates: { lat: 15.87, lng: 100.9925 },
    priceChangePct: 28,
    driver: "El Niño riduce i raccolti in Thailandia/Vietnam mentre l'India mantiene il ban export.",
    timeframe: 'Q4 2023',
    confidence: 'medium',
    sources: ['USDA', 'Thai Rice Exporters', 'Bloomberg']
  },
  {
    id: 'coffee-brazil',
    commodity: 'Caffè arabica',
    country: 'Brasile',
    coordinates: { lat: -20.75, lng: -42.88 },
    priceChangePct: 19,
    driver: 'Ondata di calore e siccità nei cinturoni di Minas Gerais ed Espírito Santo.',
    timeframe: 'Dic 2023 - Gen 2024',
    confidence: 'medium',
    sources: ['CONAB', 'ICO', 'Rabobank']
  },
  {
    id: 'fertilizer-black-sea',
    commodity: 'Fertilizzanti azotati',
    country: 'Mar Nero / UE',
    coordinates: { lat: 45.9432, lng: 24.9668 },
    priceChangePct: 24,
    driver: 'Restringimenti logistici nei porti del Mar Nero + rialzo gas che colpisce produttori romeni e polacchi.',
    timeframe: 'Gen 2024',
    confidence: 'low',
    sources: ['CRU Group', 'BloombergNEF', 'Eurostat']
  }
];

export function getEconomicArmsFlows(): EconomicArmsFlow[] {
  return armsFlows;
}

export function getCommodityPriceShocks(): CommodityPriceShock[] {
  return commodityShocks;
}

