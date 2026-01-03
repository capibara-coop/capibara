import { Conflict } from './types';
import { generatedConflicts } from './conflictsData.generated';

/**
 * Dati iniziali sui conflitti in corso
 * Questi dati possono essere aggiornati tramite API o scraping
 */
const legacyConflicts: Conflict[] = [
  {
    id: 'ukraine-russia',
    name: 'Guerra in Ucraina',
    country: 'Ucraina',
    region: 'Europa',
    coordinates: { lat: 50.4501, lng: 30.5234 }, // Kyiv
    startDate: '2022-02-24',
    status: 'active',
    description: 'Conflitto armato tra Russia e Ucraina iniziato con l\'invasione russa del territorio ucraino.',
    parties: ['Russia', 'Ucraina'],
    casualties: {
      estimated: 500000,
      lastUpdated: '2024-01-15'
    },
    sources: ['UN', 'OSCE']
  },
  {
    id: 'gaza-israel',
    name: 'Conflitto Gaza-Israele',
    country: 'Palestina/Israele',
    region: 'Medio Oriente',
    coordinates: { lat: 31.3547, lng: 34.3088 }, // Gaza
    startDate: '2023-10-07',
    status: 'active',
    description: 'Conflitto tra Israele e Hamas nella Striscia di Gaza.',
    parties: ['Israele', 'Hamas'],
    casualties: {
      estimated: 30000,
      lastUpdated: '2024-01-15'
    },
    sources: ['UN', 'WHO']
  },
  {
    id: 'sudan',
    name: 'Guerra Civile in Sudan',
    country: 'Sudan',
    region: 'Africa',
    coordinates: { lat: 15.5007, lng: 32.5599 }, // Khartoum
    startDate: '2023-04-15',
    status: 'active',
    description: 'Conflitto armato tra le Forze Armate del Sudan e le Forze di Supporto Rapido.',
    parties: ['Forze Armate del Sudan', 'Forze di Supporto Rapido'],
    casualties: {
      estimated: 12000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'myanmar',
    name: 'Conflitto in Myanmar',
    country: 'Myanmar',
    region: 'Asia',
    coordinates: { lat: 16.8661, lng: 96.1951 }, // Yangon
    startDate: '2021-02-01',
    status: 'active',
    description: 'Conflitto civile seguito al colpo di stato militare del 2021.',
    parties: ['Tatmadaw', 'Forze di opposizione'],
    casualties: {
      estimated: 5000,
      lastUpdated: '2024-01-12'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'syria',
    name: 'Guerra Civile Siriana',
    country: 'Siria',
    region: 'Medio Oriente',
    coordinates: { lat: 33.5138, lng: 36.2765 }, // Damascus
    startDate: '2011-03-15',
    status: 'active',
    description: 'Conflitto civile in corso con multiple fazioni coinvolte.',
    parties: ['Governo Siriano', 'Opposizione', 'ISIS', 'Curdi'],
    casualties: {
      estimated: 500000,
      lastUpdated: '2024-01-01'
    },
    sources: ['UN', 'SOHR']
  },
  {
    id: 'yemen',
    name: 'Guerra Civile in Yemen',
    country: 'Yemen',
    region: 'Medio Oriente',
    coordinates: { lat: 15.3694, lng: 44.1910 }, // Sana\'a
    startDate: '2014-09-21',
    status: 'active',
    description: 'Conflitto tra il governo yemenita e i ribelli Houthi.',
    parties: ['Governo Yemenita', 'Houthi', 'Coalizione Saudita'],
    casualties: {
      estimated: 377000,
      lastUpdated: '2023-12-20'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'ethiopia-tigray',
    name: 'Conflitto in Etiopia',
    country: 'Etiopia',
    region: 'Africa',
    coordinates: { lat: 9.1450, lng: 38.7617 }, // Addis Ababa
    startDate: '2020-11-04',
    status: 'active',
    description: 'Conflitto tra il governo etiope e il Fronte di Liberazione del Popolo del Tigrè, con tensioni in altre regioni.',
    parties: ['Governo Etiope', 'TPLF', 'Fronte Amhara'],
    casualties: {
      estimated: 600000,
      lastUpdated: '2024-01-05'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'mali',
    name: 'Conflitto in Mali',
    country: 'Mali',
    region: 'Africa',
    coordinates: { lat: 12.6392, lng: -8.0029 }, // Bamako
    startDate: '2012-01-16',
    status: 'active',
    description: 'Conflitto tra governo, gruppi jihadisti e milizie separatiste nel nord del paese.',
    parties: ['Governo del Mali', 'JNIM', 'ISIS', 'Tuareg'],
    casualties: {
      estimated: 15000,
      lastUpdated: '2024-01-08'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'niger',
    name: 'Conflitto in Niger',
    country: 'Niger',
    region: 'Africa',
    coordinates: { lat: 13.5127, lng: 2.1124 }, // Niamey
    startDate: '2011-01-01',
    status: 'active',
    description: 'Conflitto con gruppi jihadisti nel Sahel, intensificato dopo il colpo di stato del 2023.',
    parties: ['Governo del Niger', 'ISIS', 'Boko Haram'],
    casualties: {
      estimated: 5000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'congo-drc',
    name: 'Conflitto nella RDC',
    country: 'Repubblica Democratica del Congo',
    region: 'Africa',
    coordinates: { lat: -4.4419, lng: 15.2663 }, // Kinshasa
    startDate: '1996-10-24',
    status: 'active',
    description: 'Conflitto complesso con multiple milizie e gruppi armati, specialmente nella regione del Kivu.',
    parties: ['Governo RDC', 'M23', 'ADF', 'FDLR', 'Mai-Mai'],
    casualties: {
      estimated: 6000000,
      lastUpdated: '2024-01-12'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'somalia',
    name: 'Conflitto in Somalia',
    country: 'Somalia',
    region: 'Africa',
    coordinates: { lat: 2.0469, lng: 45.3182 }, // Mogadishu
    startDate: '1991-01-26',
    status: 'active',
    description: 'Conflitto tra governo somalo, Al-Shabaab e altre milizie.',
    parties: ['Governo Somalo', 'Al-Shabaab', 'AMISOM'],
    casualties: {
      estimated: 500000,
      lastUpdated: '2024-01-05'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'libya',
    name: 'Conflitto in Libia',
    country: 'Libia',
    region: 'Africa',
    coordinates: { lat: 32.8872, lng: 13.1913 }, // Tripoli
    startDate: '2011-02-15',
    status: 'active',
    description: 'Conflitto civile tra fazioni rivali e milizie dopo la caduta di Gheddafi.',
    parties: ['Governo di Tripoli', 'Esercito Nazionale Libico', 'LNA'],
    casualties: {
      estimated: 25000,
      lastUpdated: '2024-01-08'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'afghanistan',
    name: 'Conflitto in Afghanistan',
    country: 'Afghanistan',
    region: 'Asia',
    coordinates: { lat: 34.5553, lng: 69.2075 }, // Kabul
    startDate: '1978-04-27',
    status: 'active',
    description: 'Conflitto continuo con attacchi di gruppi armati contro il governo talebano.',
    parties: ['Taliban', 'ISIS-K', 'Resistenza Nazionale'],
    casualties: {
      estimated: 2000000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'pakistan',
    name: 'Conflitto in Pakistan',
    country: 'Pakistan',
    region: 'Asia',
    coordinates: { lat: 33.6844, lng: 73.0479 }, // Islamabad
    startDate: '2004-03-16',
    status: 'active',
    description: 'Conflitto con gruppi terroristici e separatisti, specialmente nelle regioni di frontiera.',
    parties: ['Governo Pakistano', 'TTP', 'Baloch Separatisti'],
    casualties: {
      estimated: 80000,
      lastUpdated: '2024-01-08'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'iraq',
    name: 'Conflitto in Iraq',
    country: 'Iraq',
    region: 'Medio Oriente',
    coordinates: { lat: 33.3152, lng: 44.3661 }, // Baghdad
    startDate: '2003-03-20',
    status: 'active',
    description: 'Conflitto continuo con ISIS e altri gruppi armati nonostante la sconfitta territoriale del Califfato.',
    parties: ['Governo Iracheno', 'ISIS', 'Milizie Sciite'],
    casualties: {
      estimated: 500000,
      lastUpdated: '2024-01-05'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'cameroon',
    name: 'Conflitto in Camerun',
    country: 'Camerun',
    region: 'Africa',
    coordinates: { lat: 3.8480, lng: 11.5021 }, // Yaoundé
    startDate: '2017-10-01',
    status: 'active',
    description: 'Conflitto separatista nelle regioni anglofone del Camerun.',
    parties: ['Governo del Camerun', 'Separatisti Anglofoni'],
    casualties: {
      estimated: 6000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'mozambique',
    name: 'Conflitto in Mozambico',
    country: 'Mozambico',
    region: 'Africa',
    coordinates: { lat: -25.9692, lng: 32.5732 }, // Maputo
    startDate: '2017-10-05',
    status: 'active',
    description: 'Conflitto con gruppi jihadisti nella provincia di Cabo Delgado.',
    parties: ['Governo del Mozambico', 'Ansar al-Sunna', 'ISIS-Mozambique'],
    casualties: {
      estimated: 5000,
      lastUpdated: '2024-01-08'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'burkina-faso',
    name: 'Conflitto in Burkina Faso',
    country: 'Burkina Faso',
    region: 'Africa',
    coordinates: { lat: 12.3714, lng: -1.5197 }, // Ouagadougou
    startDate: '2015-04-15',
    status: 'active',
    description: 'Conflitto con gruppi jihadisti che controllano vaste aree del paese.',
    parties: ['Governo del Burkina Faso', 'JNIM', 'ISIS'],
    casualties: {
      estimated: 20000,
      lastUpdated: '2024-01-12'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'nagorno-karabakh',
    name: 'Conflitto Nagorno-Karabakh',
    country: 'Azerbaigian/Armenia',
    region: 'Asia',
    coordinates: { lat: 39.8200, lng: 46.7500 }, // Nagorno-Karabakh
    startDate: '1988-02-20',
    status: 'active',
    description: 'Conflitto territoriale tra Armenia e Azerbaigian per il controllo del Nagorno-Karabakh.',
    parties: ['Armenia', 'Azerbaigian'],
    casualties: {
      estimated: 30000,
      lastUpdated: '2024-01-15'
    },
    sources: ['UN', 'OSCE']
  },
  {
    id: 'colombia',
    name: 'Conflitto in Colombia',
    country: 'Colombia',
    region: 'America Latina',
    coordinates: { lat: 4.7110, lng: -74.0721 }, // Bogotá
    startDate: '1964-05-27',
    status: 'active',
    description: 'Conflitto continuo con gruppi guerriglieri e paramilitari nonostante gli accordi di pace.',
    parties: ['Governo Colombiano', 'ELN', 'FARC dissidenti', 'Paramilitari'],
    casualties: {
      estimated: 260000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'mexico',
    name: 'Guerra alle Droghe in Messico',
    country: 'Messico',
    region: 'America Latina',
    coordinates: { lat: 19.4326, lng: -99.1332 }, // Città del Messico
    startDate: '2006-12-11',
    status: 'active',
    description: 'Conflitto tra cartelli della droga e forze di sicurezza messicane.',
    parties: ['Governo Messicano', 'Cartelli della Droga'],
    casualties: {
      estimated: 350000,
      lastUpdated: '2024-01-12'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'philippines',
    name: 'Conflitto nelle Filippine',
    country: 'Filippine',
    region: 'Asia',
    coordinates: { lat: 14.5995, lng: 120.9842 }, // Manila
    startDate: '1969-03-29',
    status: 'active',
    description: 'Conflitto con gruppi comunisti e islamisti in varie regioni.',
    parties: ['Governo delle Filippine', 'NPA', 'MILF', 'Abu Sayyaf'],
    casualties: {
      estimated: 120000,
      lastUpdated: '2024-01-08'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'india-kashmir',
    name: 'Conflitto in Kashmir',
    country: 'India/Pakistan',
    region: 'Asia',
    coordinates: { lat: 34.0837, lng: 74.7973 }, // Srinagar
    startDate: '1947-10-22',
    status: 'active',
    description: 'Conflitto territoriale e separatista nella regione del Kashmir.',
    parties: ['India', 'Pakistan', 'Separatisti Kashmiri'],
    casualties: {
      estimated: 100000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'nigeria',
    name: 'Conflitto in Nigeria',
    country: 'Nigeria',
    region: 'Africa',
    coordinates: { lat: 9.0765, lng: 7.3986 }, // Abuja
    startDate: '2009-07-26',
    status: 'active',
    description: 'Conflitto con Boko Haram, banditismo e violenze intercomunitarie nel nord e centro del paese.',
    parties: ['Governo Nigeriano', 'Boko Haram', 'ISWAP', 'Banditi'],
    casualties: {
      estimated: 350000,
      lastUpdated: '2024-01-12'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'central-african-republic',
    name: 'Conflitto nella RCA',
    country: 'Repubblica Centrafricana',
    region: 'Africa',
    coordinates: { lat: 4.3947, lng: 18.5582 }, // Bangui
    startDate: '2012-12-10',
    status: 'active',
    description: 'Conflitto civile tra governo e gruppi ribelli, con intervento di peacekeepers internazionali.',
    parties: ['Governo RCA', 'Séléka', 'Anti-balaka', 'MINUSCA'],
    casualties: {
      estimated: 14000,
      lastUpdated: '2024-01-08'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'chad',
    name: 'Conflitto in Ciad',
    country: 'Ciad',
    region: 'Africa',
    coordinates: { lat: 12.1348, lng: 15.0557 }, // N\'Djamena
    startDate: '2005-12-18',
    status: 'active',
    description: 'Conflitto con gruppi ribelli e incursioni da paesi confinanti.',
    parties: ['Governo del Ciad', 'Ribelli', 'Boko Haram'],
    casualties: {
      estimated: 5000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'kenya',
    name: 'Conflitto in Kenya',
    country: 'Kenya',
    region: 'Africa',
    coordinates: { lat: -1.2921, lng: 36.8219 }, // Nairobi
    startDate: '2011-10-16',
    status: 'active',
    description: 'Attacchi di Al-Shabaab e violenze intercomunitarie nelle regioni di frontiera.',
    parties: ['Governo Keniota', 'Al-Shabaab'],
    casualties: {
      estimated: 4000,
      lastUpdated: '2024-01-08'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'senegal',
    name: 'Conflitto in Casamance',
    country: 'Senegal',
    region: 'Africa',
    coordinates: { lat: 12.3714, lng: -16.2563 }, // Ziguinchor
    startDate: '1982-12-26',
    status: 'active',
    description: 'Conflitto separatista nella regione della Casamance.',
    parties: ['Governo del Senegal', 'MFDC'],
    casualties: {
      estimated: 5000,
      lastUpdated: '2024-01-05'
    },
    sources: ['UN', 'ACLED']
  },
  {
    id: 'egypt',
    name: 'Conflitto nel Sinai',
    country: 'Egitto',
    region: 'Medio Oriente',
    coordinates: { lat: 30.0444, lng: 31.2357 }, // Cairo
    startDate: '2011-01-25',
    status: 'active',
    description: 'Conflitto con gruppi militanti islamisti nella penisola del Sinai.',
    parties: ['Governo Egiziano', 'ISIS-Sinai', 'Ansar Bait al-Maqdis'],
    casualties: {
      estimated: 5000,
      lastUpdated: '2024-01-10'
    },
    sources: ['UN', 'ACLED']
  }
];

/**
 * Funzione per fare merge intelligente tra conflitti generati da UCDP e conflitti legacy.
 * Aggiunge i conflitti legacy importanti che non sono già presenti nei dati generati.
 */
function mergeConflicts(generated: Conflict[], legacy: Conflict[]): Conflict[] {
  // Se non ci sono conflitti generati, usa solo quelli legacy
  if (generated.length === 0) {
    return legacy;
  }

  // Conflitti legacy importanti da assicurare che siano sempre presenti
  const criticalLegacyIds = ['ukraine-russia', 'gaza-israel'];

  // Normalizza il nome per confronto (rimuove accenti, lowercase, etc.)
  function normalizeName(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '');
  }

  // Normalizza anche il nome della regione (mappa "Middle East" -> "Medio Oriente", etc.)
  function normalizeRegion(region: string): string {
    const normalized = normalizeName(region);
    const regionMap: Record<string, string> = {
      'middleeast': 'Medio Oriente',
      'middle east': 'Medio Oriente',
      'europe': 'Europa',
      'africa': 'Africa',
      'asia': 'Asia',
      'americalatina': 'America Latina',
      'latinamerica': 'America Latina',
    };
    return regionMap[normalized] || region;
  }

  // Crea un set di paesi normalizzati già presenti nei conflitti generati
  const generatedCountries = new Set(
    generated.map(c => normalizeName(c.country))
  );

  // Crea un set di ID già presenti
  const generatedIds = new Set(generated.map(c => c.id));

  // Trova i conflitti legacy da aggiungere
  const conflictsToAdd: Conflict[] = [];

  for (const legacyConflict of legacy) {
    const isCritical = criticalLegacyIds.includes(legacyConflict.id);
    const countryNormalized = normalizeName(legacyConflict.country);
    const isAlreadyPresent = generatedIds.has(legacyConflict.id) ||
                           generatedCountries.has(countryNormalized);

    // Aggiungi se è un conflitto critico (sempre) o se non è già presente
    if (isCritical || !isAlreadyPresent) {
      // Normalizza la regione per coerenza
      const conflictToAdd = {
        ...legacyConflict,
        region: normalizeRegion(legacyConflict.region),
      };
      conflictsToAdd.push(conflictToAdd);
    }
  }

  // Normalizza anche le regioni dei conflitti generati per coerenza
  const normalizedGenerated = generated.map(c => ({
    ...c,
    region: normalizeRegion(c.region),
  }));

  // Combina: prima i conflitti generati (priorità), poi quelli legacy aggiuntivi
  return [...normalizedGenerated, ...conflictsToAdd];
}

export const conflictsData: Conflict[] = mergeConflicts(generatedConflicts, legacyConflicts);

/**
 * Ottiene un conflitto per ID
 */
export function getConflictById(id: string): Conflict | undefined {
  return conflictsData.find(conflict => conflict.id === id);
}

/**
 * Ottiene tutti i conflitti
 */
export function getAllConflicts(): Conflict[] {
  return conflictsData;
}
