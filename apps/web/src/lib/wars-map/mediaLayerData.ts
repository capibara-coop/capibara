import { MediaSentimentNode } from './types';

const mediaNodes: MediaSentimentNode[] = [
  {
    id: 'kyiv-media',
    location: 'Kyiv, Ucraina',
    coordinates: { lat: 50.4501, lng: 30.5234 },
    localSentiment: -0.4,
    internationalSentiment: 0.2,
    divergence: 'Media locali parlano di logoramento e leva; media occidentali celebrano nuovi pacchetti militari.',
    keyTopics: ['Leva obbligatoria', 'Pacchetti NATO', 'Ricostruzione'],
    lastUpdate: '2024-01-19',
    timeframe: 'Gen 2024 (settimana 3)',
    coverageSources: 16,
    sampleSize: 180,
    confidence: 'high',
    sources: ['Kyiv Independent', 'Politico', 'NYT']
  },
  {
    id: 'bamako-media',
    location: 'Bamako, Mali',
    coordinates: { lat: 12.6392, lng: -8.0029 },
    localSentiment: 0.1,
    internationalSentiment: -0.5,
    divergence: 'TV statali celebrano partnership con Russia, media internazionali evidenziano abusi diritti umani.',
    keyTopics: ['Wagner', 'Sicurezza Sahel', 'Diritti civili'],
    lastUpdate: '2024-01-12',
    timeframe: 'Gen 2024 (settimana 2)',
    coverageSources: 11,
    sampleSize: 95,
    confidence: 'medium',
    sources: ['ORTM', 'RFI', 'HRW']
  },
  {
    id: 'gaza-media',
    location: 'Gaza City',
    coordinates: { lat: 31.5, lng: 34.4667 },
    localSentiment: -0.9,
    internationalSentiment: -0.3,
    divergence: 'Reporter locali raccontano collasso umanitario totale; parte dei media globali enfatizza negoziati.',
    keyTopics: ['Corridoi umanitari', 'Cessate il fuoco', 'Detenuti'],
    lastUpdate: '2024-01-16',
    timeframe: 'Gen 2024 (settimana 3)',
    coverageSources: 22,
    sampleSize: 210,
    confidence: 'high',
    sources: ['Al Jazeera Arabic', 'Reuters', 'AP']
  },
  {
    id: 'bogota-media',
    location: 'Bogotá, Colombia',
    coordinates: { lat: 4.711, lng: -74.0721 },
    localSentiment: -0.1,
    internationalSentiment: 0.3,
    divergence: 'Media locali critici sulla riforma agraria; stampa internazionale esalta dialogo governo-ELN.',
    keyTopics: ['Riforma agraria', 'Processo di pace', 'Economia rurale'],
    lastUpdate: '2024-01-08',
    timeframe: 'Gen 2024 (settimana 1)',
    coverageSources: 13,
    sampleSize: 120,
    confidence: 'medium',
    sources: ['El Tiempo', 'Semana', 'BBC']
  },
  {
    id: 'delhi-media',
    location: 'Nuova Delhi, India',
    coordinates: { lat: 28.6139, lng: 77.209 },
    localSentiment: -0.2,
    internationalSentiment: 0.1,
    divergence: 'Stampa locale denuncia restrizioni internet e proteste agricoltori; media globali guardano al ruolo dell’India nel G20.',
    keyTopics: ['Proteste agricoltori', 'Censura digital', 'G20'],
    lastUpdate: '2024-01-14',
    timeframe: 'Gen 2024 (settimana 2)',
    coverageSources: 19,
    sampleSize: 160,
    confidence: 'high',
    sources: ['The Hindu', 'Scroll.in', 'Financial Times']
  },
  {
    id: 'istanbul-media',
    location: 'Istanbul, Turchia',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    localSentiment: 0.2,
    internationalSentiment: -0.2,
    divergence: 'Media turchi celebrano vittoria diplomatica sul corridoio del grano; media europei parlano di ambiguità sulla NATO.',
    keyTopics: ['Corridoio del Mar Nero', 'Elezioni locali', 'NATO'],
    lastUpdate: '2024-01-11',
    timeframe: 'Gen 2024 (settimana 2)',
    coverageSources: 14,
    sampleSize: 130,
    confidence: 'medium',
    sources: ['Anadolu Agency', 'Der Spiegel', 'Le Monde']
  },
  {
    id: 'jakarta-media',
    location: 'Jakarta, Indonesia',
    coordinates: { lat: -6.2088, lng: 106.8456 },
    localSentiment: 0.4,
    internationalSentiment: -0.1,
    divergence: 'Media locali ottimisti sul passaggio di capitale a Nusantara; osservatori stranieri evidenziano costi e rischi ambientali.',
    keyTopics: ['Nuova capitale', 'Foresta del Borneo', 'Elezioni 2024'],
    lastUpdate: '2024-01-09',
    timeframe: 'Gen 2024 (settimana 1)',
    coverageSources: 15,
    sampleSize: 110,
    confidence: 'medium',
    sources: ['Kompas', 'Tempo', 'Bloomberg']
  },
  {
    id: 'manila-media',
    location: 'Manila, Filippine',
    coordinates: { lat: 14.5995, lng: 120.9842 },
    localSentiment: -0.3,
    internationalSentiment: 0.2,
    divergence: 'Televisioni locali denunciano tensioni nel Mar Cinese Meridionale; media statunitensi sottolineano rafforzamento alleanza con Washington.',
    keyTopics: ['Mar Cinese Meridionale', 'Visiting Forces Agreement', 'Elezioni'],
    lastUpdate: '2024-01-18',
    timeframe: 'Gen 2024 (settimana 3)',
    coverageSources: 17,
    sampleSize: 140,
    confidence: 'high',
    sources: ['ABS-CBN', 'Inquirer', 'Washington Post']
  }
];

export function getMediaSentimentNodes(): MediaSentimentNode[] {
  return mediaNodes;
}

