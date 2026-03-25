export interface UcdpConflictMetadata {
  conflictId: string | number;
  datasetVersion: string;
  label?: string;
  typeOfConflict: number;
  incompatibility: number;
  territoryName?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  bestEstimate?: number;
}

export interface Conflict {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  startDate: string;
  status: 'active' | 'escalating' | 'de-escalating';
  description: string;
  parties: string[];
  casualties?: {
    estimated: number;
    lastUpdated: string;
  };
  sources: string[];
  ucdp?: UcdpConflictMetadata;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface ConflictDetails extends Conflict {
  news: NewsArticle[];
  lastUpdated: string;
}

export interface EconomicArmsFlow {
  id: string;
  origin: string;
  destination: string;
  startCoordinates: {
    lat: number;
    lng: number;
  };
  endCoordinates: {
    lat: number;
    lng: number;
  };
  volumeBillionUSD: number;
  trend: 'rising' | 'stable' | 'falling';
  description: string;
  lastUpdated: string;
  sources: string[];
  timeframe: string;
  confidence: 'low' | 'medium' | 'high';
  coverageNotes?: string;
  waypoints?: Array<{
    lat: number;
    lng: number;
  }>;
}

export interface CommodityPriceShock {
  id: string;
  commodity: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  priceChangePct: number;
  driver: string;
  timeframe: string;
  sources: string[];
  confidence: 'low' | 'medium' | 'high';
}

export interface ClimateStressZone {
  id: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  severity: 1 | 2 | 3 | 4 | 5;
  driver: 'drought' | 'water' | 'fire' | 'co2';
  description: string;
  timeframe: string;
  linkageToConflict: string;
  sources: string[];
  indicator: string;
  value: number;
  unit: string;
  trend: 'worsening' | 'stable' | 'improving';
}

export interface MigrationFlow {
  id: string;
  origin: string;
  destination: string;
  startCoordinates: {
    lat: number;
    lng: number;
  };
  endCoordinates: {
    lat: number;
    lng: number;
  };
  peopleDisplaced: number;
  status: 'increasing' | 'stable' | 'decreasing';
  lastUpdate: string;
  period: string;
  causes: string;
  sources: string[];
  movementType: 'internal' | 'cross-border';
  confidence: 'low' | 'medium' | 'high';
  waypoints?: Array<{
    lat: number;
    lng: number;
  }>;
}

export interface MediaSentimentNode {
  id: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  localSentiment: number; // range -1..1
  internationalSentiment: number; // range -1..1
  divergence: string;
  keyTopics: string[];
  lastUpdate: string;
  sources: string[];
  timeframe: string;
  coverageSources: number;
  sampleSize?: number;
  confidence: 'low' | 'medium' | 'high';
}
