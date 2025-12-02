// Simple Markdown-to-HTML helper mainly for bold/italic, quote, headings e a capo.
// Se il testo contiene già HTML (tag <p>, <h1>, ecc.), lo lasciamo invariato.

export function markdownToHtml(input: string): string {
  if (!input) return "";

  // Normalizza i line ending (CRLF → LF) per avere regex coerenti
  const text = input.replace(/\r\n/g, "\n").trim();

  // Se sembra già HTML, non tocchiamo nulla
  if (/<[a-z][\s\S]*>/i.test(text)) {
    return text;
  }

  let processed = text;

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

  // Quote a inizio riga: > testo
  processed = processed.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

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


