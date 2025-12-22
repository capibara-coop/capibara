// Simple Markdown-to-HTML helper mainly for bold/italic, quote, headings e a capo.
// Se il testo contiene già HTML, applichiamo comunque le trasformazioni markdown di base

export function markdownToHtml(input: string): string {
  if (!input) return "";

  // Normalizza i line ending (CRLF → LF) per avere regex coerenti
  const text = input.replace(/\r\n/g, "\n").trim();

  let processed = text;

  // Controlliamo se il contenuto contiene già tag HTML
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(text);

  // Controlliamo se contiene già tag di blocco (struttura)
  const hasBlockTags = /<\/?(p|div|h[1-6]|ul|ol|li)(\s[^>]*)?>/i.test(text);

  // Controlliamo se contiene già blockquote
  const hasBlockquotes = /<\/?blockquote(\s[^>]*)?>/i.test(text);

  if (hasHtmlTags && hasBlockTags) {
    // Se ha già struttura HTML completa, applichiamo solo trasformazioni inline
    processed = processed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    processed = processed.replace(/\*(.+?)\*/g, "<em>$1</em>");
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
      const safeLabel = String(label ?? "");
      const safeUrl = String(url ?? "").replace(/"/g, "&quot;");
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
    });

    // Gestiamo le quote markdown solo se non ci sono già blockquote HTML
    if (!hasBlockquotes) {
      processed = processed.replace(/^>\s*(.+)$/gm, "<blockquote>$1</blockquote>");
    }

    return processed;
  }

  // Se non ha struttura HTML, o ha solo tag inline, applichiamo tutte le trasformazioni markdown

  // Immagini: ![alt](url)
  processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => {
    const safeAlt = String(alt ?? "").replace(/"/g, "&quot;");
    const safeUrl = String(url ?? "").replace(/"/g, "&quot;");
    return `<img src="${safeUrl}" alt="${safeAlt}" />`;
  });

  // Link: [testo](url)
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
    const safeLabel = String(label ?? "");
    const safeUrl = String(url ?? "").replace(/"/g, "&quot;");
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
  });

  // Headings Markdown a inizio riga: #, ##, ### ... con o senza spazio
  processed = processed.replace(/^\s*(#{1,6})\s*(.+)$/gm, (_m, hashes: string, title: string) => {
    const level = hashes.length;
    const safeLevel = Math.min(Math.max(level, 1), 6);
    return `<h${safeLevel}>${title.trim()}</h${safeLevel}>`;
  });

  // Quote: gestisci righe che iniziano con > (con o senza spazio)
  // Prima elabora le quote multiline
  const lines = processed.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith('>')) {
      // Inizia una blockquote
      let blockquoteContent = line.replace(/^>\s*/, '');
      i++;

      // Raccogli tutte le righe consecutive della blockquote
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        blockquoteContent += '\n' + lines[i].replace(/^>\s*/, '');
        i++;
      }

      result.push(`<blockquote>${blockquoteContent}</blockquote>`);
    } else {
      result.push(line);
      i++;
    }
  }

  processed = result.join('\n');

  // Bold **testo**
  processed = processed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic *testo*
  processed = processed.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Suddividi in paragrafi su doppio a capo SOLO per blocchi che non sono già tag block
  const paragraphs = processed.split(/\n{2,}/).map((block) => {
    const trimmed = block.trim();
    // Mantieni una riga vuota visibile come spazio verticale
    if (!trimmed) return "<p><br /></p>";

    // Se il blocco inizia già con un tag di tipo block, lo lasciamo così
    if (/^<(h[1-6]|p|ul|ol|li|blockquote)/i.test(trimmed)) {
      return trimmed;
    }

    const withBr = trimmed.replace(/\n/g, "<br />");
    return `<p>${withBr}</p>`;
  });

  return paragraphs.join("\n");
}


