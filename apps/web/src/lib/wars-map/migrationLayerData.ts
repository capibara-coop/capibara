import { MigrationFlow } from './types';

const migrationFlows: MigrationFlow[] = [
  {
    id: 'sudan-chad-2024',
    origin: 'Darfur (Sudan)',
    destination: 'Ciad orientale',
    startCoordinates: { lat: 13.6405, lng: 25.3539 }, // El Fasher
    endCoordinates: { lat: 13.4241, lng: 22.0781 }, // Adré
    peopleDisplaced: 470000,
    status: 'increasing',
    lastUpdate: '2024-01-18',
    period: 'Ott 2023 - Gen 2024',
    movementType: 'cross-border',
    confidence: 'high',
    causes: 'Offensive sistematiche delle Rapid Support Forces (RSF) contro comunità non-arabe nel Darfur. Villaggi completamente distrutti, violenze etniche mirate, collasso totale dei servizi sanitari e idrici. I rifugiati attraversano il confine a piedi attraverso il deserto, molti muoiono durante il viaggio. I campi profughi in Ciad sono sovraffollati e mancano di risorse essenziali. La stagione delle piogge peggiora le condizioni sanitarie.',
    sources: ['UNHCR', 'MSF', 'IOM DTM', 'ACLED']
  },
  {
    id: 'gaza-egypt',
    origin: 'Gaza',
    destination: 'Sinai / Egitto',
    startCoordinates: { lat: 31.3547, lng: 34.3088 },
    endCoordinates: { lat: 30.857, lng: 32.316 }, // Rafah/Sinai
    peopleDisplaced: 250000,
    status: 'increasing',
    lastUpdate: '2024-01-15',
    period: 'Dic 2023 - Gen 2024',
    movementType: 'cross-border',
    confidence: 'medium',
    causes: 'Offensive militari urbane intensive con bombardamenti aerei e terrestri su aree densamente popolate. Blackout totale di comunicazioni e internet per settimane, rendendo impossibile la coordinazione umanitaria. Distruzione sistematica di infrastrutture civili (ospedali, scuole, moschee). Famiglie cercano disperatamente di attraversare il valico di Rafah, ma i controlli sono estremamente restrittivi. Molti rimangono bloccati nella striscia senza accesso a cibo, acqua e medicine.',
    sources: ['UNOCHA', 'ACAPS', 'UNRWA', 'Palestinian Red Crescent']
  },
  {
    id: 'venezuela-andes',
    origin: 'Venezuela',
    destination: 'Colombia/Perù/Ecuador',
    startCoordinates: { lat: 8.615, lng: -71.65 }, // Confine Táchira
    endCoordinates: { lat: -12.0464, lng: -77.0428 }, // Lima come proxy
    waypoints: [
      { lat: 7.9, lng: -72.5 }, // Cúcuta
      { lat: 0.1807, lng: -78.4678 } // Quito
    ],
    peopleDisplaced: 7000000,
    status: 'stable',
    lastUpdate: '2024-01-05',
    period: '2018 - Gen 2024',
    movementType: 'cross-border',
    confidence: 'high',
    causes: 'Crisi economica pluriennale con iperinflazione (oltre 300% annuo), collasso del sistema sanitario, carenza cronica di cibo e medicine. Repressione politica sistematica contro opposizione e giornalisti. Persecuzione di dissidenti e professionisti qualificati. La diaspora attraversa principalmente a piedi il confine colombiano attraverso passaggi informali (trochas), poi continua verso Ecuador e Perù. Molti viaggiano per migliaia di chilometri a piedi, esposti a violenze, traffico di esseri umani e condizioni climatiche estreme. I paesi di destinazione stanno implementando restrizioni ai visti.',
    sources: ['R4V Platform', 'IOM', 'UNHCR', 'World Bank', 'Amnesty International']
  },
  {
    id: 'myanmar-thailand',
    origin: 'Myanmar nord-occidentale',
    destination: 'Thailandia',
    startCoordinates: { lat: 23.903, lng: 94.0964 }, // Sagaing
    endCoordinates: { lat: 18.7883, lng: 98.9853 }, // Chiang Mai
    peopleDisplaced: 120000,
    status: 'increasing',
    lastUpdate: '2024-01-10',
    period: 'Nov 2023 - Gen 2024',
    movementType: 'cross-border',
    confidence: 'medium',
    causes: "Bombardamenti aerei indiscriminati dell'aviazione militare (Tatmadaw) su villaggi nelle regioni ribelli del Sagaing e Chin. Tattiche di terra bruciata: villaggi completamente rasi al suolo, raccolti distrutti, bestiame ucciso. Blocchi internet prolungati per isolare le comunità e impedire la documentazione delle violazioni. Arresti arbitrari e esecuzioni extragiudiziali. I rifugiati attraversano la giungla e i fiumi al confine thailandese, spesso con l'aiuto di trafficanti. Molti vengono respinti alla frontiera. Le comunità etniche (Chin, Kachin) sono particolarmente colpite.",
    sources: ['UNOCHA', 'Fortify Rights', 'Human Rights Watch', 'Karen Human Rights Group']
  },
  {
    id: 'ukraine-poland',
    origin: 'Ucraina orientale',
    destination: 'Polonia meridionale',
    startCoordinates: { lat: 49.8397, lng: 24.0297 }, // Leopoli
    endCoordinates: { lat: 50.0412, lng: 19.9711 }, // Cracovia
    peopleDisplaced: 1030000,
    status: 'stable',
    lastUpdate: '2024-01-17',
    period: 'Feb 2022 - Gen 2024',
    movementType: 'cross-border',
    confidence: 'high',
    causes: 'Bombardamenti continui su infrastrutture energetiche e civili spingono ulteriori ondate verso i centri logistici polacchi. La permanenza si allunga per le famiglie senza scuole o servizi essenziali in patria.',
    sources: ['UNHCR', 'Polish Border Guard', 'EC Monitoring']
  },
  {
    id: 'syria-turkey-idlib',
    origin: 'Idlib e Aleppo nord',
    destination: 'Hatay (Turchia)',
    startCoordinates: { lat: 36.2119, lng: 36.1603 },
    endCoordinates: { lat: 36.2, lng: 36.15 },
    waypoints: [
      { lat: 35.993, lng: 36.674 },
      { lat: 36.124, lng: 36.274 }
    ],
    peopleDisplaced: 80000,
    status: 'increasing',
    lastUpdate: '2024-01-13',
    period: 'Dic 2023 - Gen 2024',
    movementType: 'cross-border',
    confidence: 'medium',
    causes: 'Ripresa di bombardamenti dell’artiglieria siriana e ritorsioni russe su cluster urbani di Idlib. Ospedali da campo colpiti, interruzione corridoi ONU Bab al-Hawa, famiglie cercano passaggi illegali verso Hatay.',
    sources: ['UNOCHA', 'Syrian Observatory', 'IFRC']
  },
  {
    id: 'rohingya-bangladesh',
    origin: 'Stato di Rakhine (Myanmar)',
    destination: 'Cox’s Bazar (Bangladesh)',
    startCoordinates: { lat: 20.1325, lng: 92.8726 },
    endCoordinates: { lat: 21.4339, lng: 91.98703 },
    peopleDisplaced: 35000,
    status: 'increasing',
    lastUpdate: '2024-01-07',
    period: 'Nov 2023 - Gen 2024',
    movementType: 'cross-border',
    confidence: 'medium',
    causes: 'Scontri tra esercito birmano e Arakan Army riaccendono incendi di villaggi Rohingya. Nuove restrizioni su aiuti e cicloni rendono invivibili i campi interni, spingendo famiglie a traversate improvvisate verso Teknaf.',
    sources: ['UNHCR', 'Norwegian Refugee Council', 'Fortify Rights']
  },
  {
    id: 'drc-internal-ituri',
    origin: 'Nord Kivu / Ituri',
    destination: 'Goma e Bunia (RDC)',
    startCoordinates: { lat: 0.5153, lng: 29.3117 },
    endCoordinates: { lat: -1.678, lng: 29.2218 },
    peopleDisplaced: 520000,
    status: 'increasing',
    lastUpdate: '2024-01-03',
    period: 'Set 2023 - Gen 2024',
    movementType: 'internal',
    confidence: 'medium',
    causes: 'Offensive M23 e ADF su corridoi minerari costringono comunità a spostarsi verso i centri urbani protetti da MONUSCO. Campi di sfollati saturi, epidemie di morbillo e colera in aumento.',
    sources: ['UNOCHA', 'MONUSCO', "Médecins du Monde"]
  }
];

export function getMigrationFlows(): MigrationFlow[] {
  return migrationFlows;
}

