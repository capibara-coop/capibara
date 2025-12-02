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


