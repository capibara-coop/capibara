# Configurazione Permessi SEO per Editor, Author e Authenticated nell'Admin Panel

## ⚠️ IMPORTANTE: Differenza tra Permessi API e Permessi Admin

La schermata che vedi (Users-permissions) è per i **permessi API pubblici**, non per i permessi dell'admin panel.

Per risolvere il problema "no permission to see this field" per il campo SEO nell'admin panel, devi configurare i **permessi ADMIN** per i ruoli Editor, Author e Authenticated.

## Passi da Seguire

### 1. Vai ai Permessi Admin (NON Users-permissions)

1. Accedi come **Super Admin** all'admin panel
2. Vai su **Settings** → **Users & Permissions** → **Roles**
3. **NON** selezionare "Public" o "Users-permissions"
4. Seleziona il ruolo **Editor**, **Author** o **Authenticated** (quello che vuoi configurare)

### 2. Configura i Permessi per i Content Types

Per ogni content type che ha il campo SEO (Article, Video Episode, Podcast Episode):

1. Nella lista dei permessi, trova il content type (es. **Article**)
2. Espandi la sezione del content type
3. Abilita le seguenti azioni:
   - ✅ **find** (per vedere la lista)
   - ✅ **findOne** (per vedere i dettagli)
   - ✅ **update** (per modificare - OBBLIGATORIO per vedere/modificare campi)
   - ✅ **create** (per creare nuovi contenuti - opzionale)

4. **IMPORTANTE**: Dopo aver abilitato le azioni, cerca la sezione **"Fields"** (potrebbe essere sotto le azioni o in una sezione separata)
5. Nella sezione Fields:
   - Clicca su **"Select all fields"** oppure
   - Seleziona manualmente tutti i campi, incluso **"seo"**

6. **Salva** le modifiche

### 3. Ripeti per Tutti i Content Types con SEO

Ripeti il processo per:
- ✅ **Article**
- ✅ **Video Episode** 
- ✅ **Podcast Episode**

### 4. Riavvia Strapi

Dopo aver configurato i permessi:

1. **Riavvia Strapi completamente**
2. Controlla i log all'avvio - dovresti vedere:
   ```
   🔧 Configuring SEO permissions for role: Editor
   ✅ Updated permission: api::article.article.update - set fields to ["*"]
   ✅ SEO permissions configuration completed
   ```

### 5. Test

1. **Disconnetti** dall'admin panel
2. **Riconnetti** con un utente Editor, Author o Authenticated
3. Apri un Article, Video Episode o Podcast Episode
4. Il campo SEO dovrebbe ora essere visibile e modificabile

## Se la Sezione "Fields" Non Appare

Se non vedi la sezione "Fields" nell'interfaccia (bug noto di Strapi 5):

1. La funzione automatica nel codice dovrebbe comunque funzionare
2. Riavvia Strapi e verifica i log
3. Se ancora non funziona, prova a:
   - Svuotare la cache del browser
   - Usare un browser diverso
   - Aggiornare Strapi all'ultima versione

## Verifica che la Funzione Automatica Funzioni

Controlla i log di Strapi all'avvio. Dovresti vedere messaggi come:

```
🔧 Configuring SEO permissions for role: Editor
   ✅ Updated permission: api::article.article.find - set fields to ["*"]
   ✅ Updated permission: api::article.article.findOne - set fields to ["*"]
   ✅ Updated permission: api::article.article.update - set fields to ["*"]
   ✅ Updated permission: api::article.article.create - set fields to ["*"]
✅ SEO permissions configuration completed
```

Se vedi invece:
```
   ℹ️  Permission api::article.article.update does not exist - enable it in Settings > Users & Permissions > Roles
```

Significa che i permessi base non sono ancora abilitati. Devi abilitarli manualmente prima che la funzione automatica possa aggiornarli.

## Troubleshooting

### Il campo SEO non appare ancora

1. Verifica che i permessi base siano abilitati (find, findOne, update)
2. Verifica nei log che la funzione automatica abbia aggiornato i permessi
3. Disconnetti e riconnetti con l'utente Editor/Author
4. Svuota la cache del browser
5. Riavvia Strapi

### I permessi si resettano

Se i permessi si resettano dopo un riavvio, potrebbe essere un problema di migrazione del database. La funzione automatica dovrebbe riapplicare i permessi ad ogni avvio.

---

**Data**: Gennaio 2025  
**Versione Strapi**: 5.31.2

