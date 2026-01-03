import { NewsArticle } from './types';

/**
 * Simula il fetch di notizie da API esterne
 * In produzione, integrare con NewsAPI, Guardian API, o altre fonti
 */
export async function fetchNewsForConflict(
  conflictName: string,
  country: string
): Promise<NewsArticle[]> {
  // TODO: Integrare con API reali come:
  // - NewsAPI (https://newsapi.org/)
  // - Guardian API
  // - BBC News API
  
  // Per ora restituiamo dati mock
  // In produzione, fare chiamate API reali
  
  return [
    {
      title: `Ultime notizie su ${conflictName}`,
      description: `Aggiornamenti recenti sul conflitto in ${country}. Le ultime sviluppi includono...`,
      url: `https://example.com/news/${conflictName}`,
      source: 'BBC News',
      publishedAt: new Date().toISOString(),
      imageUrl: 'https://via.placeholder.com/400x250'
    },
    {
      title: `Analisi del conflitto in ${country}`,
      description: `Esperti analizzano le cause e le conseguenze del conflitto in corso.`,
      url: `https://example.com/analysis/${conflictName}`,
      source: 'The Guardian',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      imageUrl: 'https://via.placeholder.com/400x250'
    }
  ];
}

/**
 * Integrazione con NewsAPI (richiede API key)
 * Esempio di implementazione:
 */
export async function fetchNewsFromNewsAPI(
  query: string,
  apiKey?: string
): Promise<NewsArticle[]> {
  if (!apiKey) {
    console.warn('NewsAPI key non configurata, usando dati mock');
    return fetchNewsForConflict(query, '');
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=it&apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Errore nel fetch delle notizie');
    }
    
    const data = await response.json();
    
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      imageUrl: article.urlToImage
    }));
  } catch (error) {
    console.error('Errore nel fetch delle notizie:', error);
    return fetchNewsForConflict(query, '');
  }
}

