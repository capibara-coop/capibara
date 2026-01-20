export function toYoutubeEmbedUrl(originalUrl: string | null | undefined): string | null {
  if (!originalUrl) return null;

  try {
    const url = new URL(originalUrl);

    // Gestione link tipo https://youtu.be/VIDEO_ID
    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // Gestione link tipo https://www.youtube.com/watch?v=VIDEO_ID
    if (
      (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") &&
      url.pathname === "/watch"
    ) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // Se è già un URL embed o un altro formato di YouTube che usi correttamente, lascialo così
    if (
      (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") &&
      url.pathname.startsWith("/embed/")
    ) {
      return originalUrl;
    }
  } catch {
    // Se non è una URL valida, non rompere la pagina
    return null;
  }

  // Per qualsiasi altro caso non riconosciuto, evitiamo di embeddare
  return null;
}

/**
 * Estrae l'ID del video YouTube da un URL
 */
export function getYoutubeVideoId(originalUrl: string | null | undefined): string | null {
  if (!originalUrl) return null;

  try {
    const url = new URL(originalUrl);

    // Gestione link tipo https://youtu.be/VIDEO_ID
    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace("/", "");
      return id || null;
    }

    // Gestione link tipo https://www.youtube.com/watch?v=VIDEO_ID
    if (
      (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") &&
      url.pathname === "/watch"
    ) {
      return url.searchParams.get("v");
    }

    // Se è già un URL embed: https://www.youtube.com/embed/VIDEO_ID
    if (
      (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") &&
      url.pathname.startsWith("/embed/")
    ) {
      const id = url.pathname.replace("/embed/", "");
      return id || null;
    }
  } catch {
    // Se non è una URL valida, non rompere la pagina
    return null;
  }

  return null;
}

/**
 * Genera l'URL del thumbnail YouTube per un video
 * Usa maxresdefault.jpg (massima risoluzione) con fallback a hqdefault.jpg
 */
export function getYoutubeThumbnailUrl(
  originalUrl: string | null | undefined,
  quality: "maxresdefault" | "hqdefault" | "mqdefault" | "sddefault" = "maxresdefault"
): string | null {
  const videoId = getYoutubeVideoId(originalUrl);
  if (!videoId) return null;
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Restituisce l'URL corretto per l'immagine di preview di un video
 * Per YouTube: usa il thumbnail del video
 * Per video diretti: restituisce null (per usare il primo frame automaticamente)
 */
export function getVideoPreviewImageUrl(
  videoUrl: string | null | undefined
): string | null {
  if (!videoUrl) return null;
  
  // Se è YouTube, usa il thumbnail
  const thumbnailUrl = getYoutubeThumbnailUrl(videoUrl, "maxresdefault") ?? 
                      getYoutubeThumbnailUrl(videoUrl, "hqdefault");
  
  return thumbnailUrl;
}


