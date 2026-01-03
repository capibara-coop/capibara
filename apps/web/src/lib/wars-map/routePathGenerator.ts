/**
 * Generatore di percorsi realistici per flussi migratori e corridoi armi.
 * Utilizza spline Catmull-Rom e waypoint intelligenti per creare traiettorie
 * che seguono rotte logiche simili a strade o rotte reali.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calcola la distanza tra due punti in gradi (approssimazione per piccole distanze).
 */
function calculateDistance(p1: Coordinates, p2: Coordinates): number {
  const latDiff = p2.lat - p1.lat;
  const lngDiff = p2.lng - p1.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

/**
 * Determina se un percorso attraversa un oceano basandosi sulla geografia.
 * Migliorato per essere più preciso e conservativo.
 */
function crossesOcean(start: Coordinates, end: Coordinates): boolean {
  const latDiff = Math.abs(end.lat - start.lat);
  const lngDiff = Math.abs(end.lng - start.lng);
  const distance = calculateDistance(start, end);

  // Attraversamenti oceanici chiari
  // Oceano Atlantico (attraversamento est-ovest tra Americhe ed Europa/Africa)
  if (
    ((start.lng < -50 && end.lng > 20) || (start.lng > 20 && end.lng < -50)) &&
    Math.abs(start.lat) < 70 &&
    Math.abs(end.lat) < 70 &&
    distance > 30
  ) {
    return true;
  }
  
  // Oceano Pacifico (attraversamento est-ovest attraverso il Pacifico)
  if (
    ((start.lng > 120 && end.lng < -100) || (start.lng < -100 && end.lng > 120)) &&
    distance > 30
  ) {
    return true;
  }

  // Grandi distanze che chiaramente attraversano oceani
  if (distance > 50) {
    return true;
  }

  // Attraversamenti di grandi corpi d'acqua (es. Mediterraneo, Mar Rosso)
  // Ma solo se la distanza è significativa
  if (distance > 15 && lngDiff > 40) {
    // Potrebbe essere un attraversamento oceanico
    return true;
  }

  return false;
}

/**
 * Determina se un percorso è principalmente terrestre basandosi sulla geografia.
 */
function isLandRoute(start: Coordinates, end: Coordinates): boolean {
  const distance = calculateDistance(start, end);
  
  // Percorsi molto corti sono sempre terrestri
  if (distance < 5) {
    return true;
  }

  // Se non attraversa un oceano, probabilmente è terrestre
  if (!crossesOcean(start, end)) {
    return true;
  }

  return false;
}

/**
 * Genera waypoint intermedi intelligenti basati sulla geografia.
 * Versione migliorata con curve più conservative e realistiche.
 */
function generateIntelligentWaypoints(
  start: Coordinates,
  end: Coordinates,
  numWaypoints: number = 3
): Coordinates[] {
  const waypoints: Coordinates[] = [];
  const distance = calculateDistance(start, end);
  const isOceanic = crossesOcean(start, end);
  const isLand = isLandRoute(start, end);

  // Per distanze molto piccole, non aggiungere waypoint o usarne solo 1
  if (distance < 1.0) {
    return waypoints;
  }

  const latDiff = end.lat - start.lat;
  const lngDiff = end.lng - start.lng;

  // Calcola la direzione principale
  const angle = Math.atan2(latDiff, lngDiff);
  const perpAngle = angle + Math.PI / 2;

  for (let i = 1; i <= numWaypoints; i++) {
    const t = i / (numWaypoints + 1);
    
    // Posizione base lungo il percorso
    let lat = start.lat + latDiff * t;
    let lng = start.lng + lngDiff * t;

    if (isOceanic && !isLand) {
      // Per rotte oceaniche/aeree, crea un arco moderato che simula rotte circumpolari
      const arcHeight = distance * 0.25; // Ridotto da 0.4 per essere più conservativo
      const curvePhase = t * Math.PI;
      
      // Crea un arco che segue la curvatura terrestre
      const offset = Math.sin(curvePhase) * arcHeight;
      
      // Applica l'offset perpendicolarmente alla direzione
      lat += Math.cos(perpAngle) * offset;
      lng += Math.sin(perpAngle) * offset;
    } else {
      // Per rotte terrestri, crea waypoint con curve molto più sottili e naturali
      // L'intensità della curva diminuisce con la distanza per percorsi corti
      const baseCurveIntensity = Math.min(distance * 0.08, 2.0); // Limita a max 2 gradi
      
      // Per percorsi molto corti (< 2 gradi), usa curve molto leggere
      const curveIntensity = distance < 2 
        ? baseCurveIntensity * 0.3 
        : baseCurveIntensity;
      
      // Crea una curva sinusoidale principale molto più leggera
      // Usa una frequenza più bassa per curve più ampie e naturali
      const mainWave = Math.sin(t * Math.PI * 1.2) * curveIntensity;
      
      // Aggiungi una seconda onda molto più sottile per variazioni minime
      const detailWave = Math.sin(t * Math.PI * 2.8) * (curveIntensity * 0.15);
      
      // Applica le onde perpendicolarmente alla direzione principale
      const perpLat = Math.cos(perpAngle) * (mainWave + detailWave);
      const perpLng = Math.sin(perpAngle) * (mainWave + detailWave);
      
      lat += perpLat;
      lng += perpLng;
      
      // Variazioni organiche molto più sottili
      const organicVariation = Math.min(distance * 0.02, 0.5); // Limita a max 0.5 gradi
      const organicPhase = t * Math.PI * 3.5;
      const organicOffset = Math.sin(organicPhase) * organicVariation;
      
      // Applica l'offset in una direzione leggermente diversa
      const organicAngle = perpAngle + Math.PI / 8;
      lat += Math.cos(organicAngle) * organicOffset * 0.4;
      lng += Math.sin(organicAngle) * organicOffset * 0.4;
    }

    waypoints.push({ lat, lng });
  }

  return waypoints;
}

/**
 * Calcola un punto su una spline Catmull-Rom.
 * Le spline Catmull-Rom passano attraverso tutti i punti di controllo,
 * rendendo i percorsi più naturali e fluidi.
 */
function catmullRomSpline(
  p0: Coordinates,
  p1: Coordinates,
  p2: Coordinates,
  p3: Coordinates,
  t: number
): Coordinates {
  const t2 = t * t;
  const t3 = t2 * t;

  // Coefficienti Catmull-Rom
  const c0 = -0.5 * t3 + t2 - 0.5 * t;
  const c1 = 1.5 * t3 - 2.5 * t2 + 1.0;
  const c2 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
  const c3 = 0.5 * t3 - 0.5 * t2;

  return {
    lat: c0 * p0.lat + c1 * p1.lat + c2 * p2.lat + c3 * p3.lat,
    lng: c0 * p0.lng + c1 * p1.lng + c2 * p2.lng + c3 * p3.lng,
  };
}

/**
 * Genera punti intermedi tra due waypoint usando spline Catmull-Rom.
 */
function interpolateSegment(
  p0: Coordinates,
  p1: Coordinates,
  p2: Coordinates,
  p3: Coordinates,
  numPoints: number
): [number, number][] {
  const points: [number, number][] = [];

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const point = catmullRomSpline(p0, p1, p2, p3, t);
    points.push([point.lat, point.lng]);
  }

  return points;
}

/**
 * Genera un percorso realistico usando spline Catmull-Rom attraverso waypoint.
 * 
 * @param waypoints Array di waypoint che definiscono il percorso
 * @param pointsPerSegment Numero di punti da generare tra ogni coppia di waypoint
 * @returns Array di coordinate che formano il percorso fluido
 */
function generateSplinePath(
  waypoints: Coordinates[],
  pointsPerSegment: number = 25
): [number, number][] {
  if (waypoints.length < 2) {
    return waypoints.map((w) => [w.lat, w.lng]);
  }

  if (waypoints.length === 2) {
    // Per solo 2 punti, usa una curva molto leggera
    const [p0, p1] = waypoints;
    const distance = calculateDistance(p0, p1);
    
    // Per percorsi molto corti, usa una curva minima
    const curveFactor = distance < 1 ? 0.1 : 0.2;
    
    // Crea punti virtuali per la spline con curvatura minima
    const virtualP0 = {
      lat: p0.lat - (p1.lat - p0.lat) * curveFactor,
      lng: p0.lng - (p1.lng - p0.lng) * curveFactor,
    };
    const virtualP3 = {
      lat: p1.lat + (p1.lat - p0.lat) * curveFactor,
      lng: p1.lng + (p1.lng - p0.lng) * curveFactor,
    };
    return interpolateSegment(virtualP0, p0, p1, virtualP3, pointsPerSegment);
  }

  const fullPath: [number, number][] = [];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const p0 = i > 0 ? waypoints[i - 1] : waypoints[i];
    const p1 = waypoints[i];
    const p2 = waypoints[i + 1];
    const p3 = i < waypoints.length - 2 ? waypoints[i + 2] : waypoints[i + 1];

    const segment = interpolateSegment(p0, p1, p2, p3, pointsPerSegment);

    if (i === 0) {
      fullPath.push(...segment);
    } else {
      // Salta il primo punto per evitare duplicati
      fullPath.push(...segment.slice(1));
    }
  }

  return fullPath;
}

/**
 * Genera un percorso automatico con waypoint intelligenti.
 * Analizza la distanza e la geografia per decidere il numero e la posizione dei waypoint.
 * Versione migliorata con logica più conservativa.
 */
export function generateAutoPath(
  start: Coordinates,
  end: Coordinates
): [number, number][] {
  const distance = calculateDistance(start, end);

  // Per distanze molto piccole, ritorna una linea quasi retta
  if (distance < 0.2) {
    return [
      [start.lat, start.lng],
      [end.lat, end.lng],
    ];
  }

  // Determina il numero di waypoint in base alla distanza
  // Più conservativo: meno waypoint per percorsi corti
  let numWaypoints = 1;
  if (distance > 1.5) numWaypoints = 2;
  if (distance > 4) numWaypoints = 3;
  if (distance > 10) numWaypoints = 4;
  if (distance > 20) numWaypoints = 5;
  if (distance > 35) numWaypoints = 6;

  // Determina il numero di punti per segmento in base alla distanza
  // Più punti per percorsi più lunghi, meno per quelli corti
  let pointsPerSegment = 15;
  if (distance > 2) pointsPerSegment = 20;
  if (distance > 5) pointsPerSegment = 25;
  if (distance > 12) pointsPerSegment = 30;
  if (distance > 25) pointsPerSegment = 40;

  // Genera waypoint intelligenti
  const waypoints = generateIntelligentWaypoints(start, end, numWaypoints);
  
  // Se non ci sono waypoint e la distanza è piccola, usa una curva minima
  if (waypoints.length === 0 && distance < 1.5) {
    const allWaypoints = [start, end];
    return generateSplinePath(allWaypoints, Math.max(10, Math.floor(pointsPerSegment * 0.6)));
  }
  
  // Crea il percorso completo con tutti i waypoint
  const allWaypoints = [start, ...waypoints, end];
  
  // Genera il percorso usando spline Catmull-Rom
  return generateSplinePath(allWaypoints, pointsPerSegment);
}

/**
 * Genera un percorso con waypoint specifici (per uso avanzato).
 */
export function generatePathWithWaypoints(
  waypoints: Coordinates[],
  pointsPerSegment: number = 25
): [number, number][] {
  if (waypoints.length < 2) {
    return waypoints.map((w) => [w.lat, w.lng]);
  }
  return generateSplinePath(waypoints, pointsPerSegment);
}
