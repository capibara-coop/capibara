import { ConflictDetails } from './types';
import { getConflictById } from './conflictsData';
import { fetchNewsForConflict } from './newsApi';

/**
 * API client per ottenere i dettagli completi di un conflitto
 * In produzione, questo potrebbe essere un endpoint API route di Next.js
 */
export async function fetchConflictDetails(
  conflictId: string
): Promise<ConflictDetails> {
  const conflict = getConflictById(conflictId);
  
  if (!conflict) {
    throw new Error(`Conflitto con ID ${conflictId} non trovato`);
  }

  // Fetch notizie aggiornate
  const news = await fetchNewsForConflict(conflict.name, conflict.country);

  return {
    ...conflict,
    news,
    lastUpdated: new Date().toISOString(),
  };
}

