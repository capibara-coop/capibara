# Come Aggiungere il Componente SEO ai Content Types

## Problema

Il componente `shared.seo` viene creato automaticamente dal plugin SEO, ma solo **dopo** che Strapi è stato avviato e il plugin è stato inizializzato. Se aggiungiamo il riferimento al componente negli schema JSON prima che esista, Strapi non riesce ad avviarsi.

## Soluzione: Aggiunta Manuale Tramite Admin Panel

Dopo che Strapi è stato deployato e avviato con successo su Render, segui questi passi:

### 1. Verifica che il Plugin sia Attivo

1. Accedi all'admin panel di Strapi su Render
2. Vai su **Settings** → **Plugins**
3. Verifica che il plugin **SEO** sia presente e abilitato

### 2. Verifica che il Componente SEO Esista

1. Vai su **Content-Type Builder**
2. Clicca su **Components** nel menu laterale
3. Cerca il componente `shared.seo` nella lista
4. Se non c'è, potrebbe essere necessario riavviare Strapi su Render

### 3. Aggiungi il Componente SEO ai Content Types

Per ogni content type (Article, Video Episode, Podcast Episode):

1. Vai su **Content-Type Builder**
2. Clicca sul content type che vuoi modificare (es. **Article**)
3. Clicca su **Add another field**
4. Seleziona **Component** come tipo di campo
5. Scegli **shared.seo** dalla lista dei componenti disponibili
6. Assegna il nome `seo` al campo
7. Clicca su **Finish**
8. Clicca su **Save**

Ripeti per:
- ✅ **Article**
- ✅ **Video Episode**  
- ✅ **Podcast Episode**

### 4. Verifica

1. Vai su **Content Manager**
2. Apri un articolo/video/podcast
3. Dovresti vedere una sezione **SEO** con i campi:
   - Meta Title
   - Meta Description
   - Keywords
   - Meta Image
   - Prevent Indexing

## Alternativa: Script di Migrazione (Avanzato)

Se preferisci automatizzare il processo, puoi creare uno script di migrazione che aggiunge il componente solo se esiste. Tuttavia, il metodo manuale tramite admin panel è più semplice e sicuro.

## Nota Importante

Il frontend è già configurato per utilizzare i dati SEO quando disponibili. Anche se il componente non è ancora aggiunto ai content types, il frontend continuerà a funzionare utilizzando i fallback esistenti (excerpt, title, heroImage, etc.).

Una volta aggiunto il componente SEO e compilati i campi, il frontend utilizzerà automaticamente questi dati con priorità rispetto ai fallback.

---

**Data**: Gennaio 2025

