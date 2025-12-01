# Guida Deployment su Render

Questa guida ti accompagna passo-passo nel deployment del backend Strapi su Render.

## Prerequisiti

- Account GitHub (il repository deve essere su GitHub)
- Account Render (puoi crearlo durante il processo)

## Procedura Step-by-Step

### 1. Prepara il Repository

Assicurati che il file `render.yaml` sia committato nel repository:
```bash
git add render.yaml
git commit -m "Add Render configuration"
git push
```

### 2. Crea Account Render

1. Vai su [render.com](https://render.com)
2. Click su **Get Started for Free**
3. Login con il tuo account GitHub
4. Autorizza Render ad accedere ai tuoi repository

### 3. Crea il Blueprint

1. Nel dashboard Render, click su **New +** → **Blueprint**
2. Seleziona il repository `capibara` (o il nome del tuo repo)
3. Render rileverà automaticamente il file `render.yaml`
4. Click su **Apply**

### 4. Render Creerà Automaticamente

Render creerà due servizi:
- **capibara-database**: Database PostgreSQL
- **capibara-cms**: Servizio web per Strapi

### 5. Configura le Variabili d'Ambiente

Nel servizio **capibara-cms**, vai su **Environment** e verifica/aggiungi:

#### Variabili già configurate automaticamente:
- `DATABASE_URL` - Connessione al database (auto-generata)
- `APP_KEYS` - Chiavi dell'app (auto-generata)
- `API_TOKEN_SALT` - Salt per API token (auto-generata)
- `ADMIN_JWT_SECRET` - Secret per JWT admin (auto-generata)
- `TRANSFER_TOKEN_SALT` - Salt per transfer token (auto-generata)
- `JWT_SECRET` - Secret JWT (auto-generata)
- `ENCRYPTION_KEY` - Chiave di cifratura (auto-generata)

#### Variabili da configurare manualmente:

**FRONTEND_URL** (importante per CORS):
```
https://tuo-frontend.vercel.app
```
Sostituisci con l'URL reale del tuo frontend su Vercel.

**APP_KEYS** (se non generata automaticamente):
Genera 4 chiavi separate:
```bash
openssl rand -base64 32
```
Esegui 4 volte e uniscile con virgole:
```
chiave1,chiave2,chiave3,chiave4
```

### 6. Attendi il Deploy

1. Render inizierà automaticamente il build
2. Il processo richiede 5-10 minuti la prima volta
3. Puoi seguire i log in tempo reale nel dashboard
4. Una volta completato, otterrai un URL tipo: `https://capibara-cms.onrender.com`

### 7. Configura Strapi Admin

1. Vai su `https://tuo-cms.onrender.com/admin`
2. Crea il primo utente admin
3. Configura i permessi pubblici:
   - Settings → Users & Permissions → Roles → Public
   - Per ogni content-type (Show, Video Episode, Podcast Episode, Newsletter Issue, Tag, Partner, Article):
     - Abilita **find** (per liste)
     - Abilita **findOne** (per dettagli)
   - Salva

### 8. Aggiorna il Frontend

Nel progetto Vercel, aggiungi/aggiorna la variabile d'ambiente:
```
NEXT_PUBLIC_STRAPI_URL=https://tuo-cms.onrender.com
```

### 9. Testa la Connessione

1. Vai sul frontend
2. Verifica che i contenuti vengano caricati correttamente
3. Controlla la console del browser per eventuali errori CORS

## Troubleshooting

### Il servizio va in sleep dopo 15 minuti

**Problema**: Sul free tier, Render mette in sleep i servizi dopo 15 minuti di inattività.

**Soluzione**: 
- Il primo avvio dopo il sleep richiede 30-60 secondi
- Per evitare il sleep, considera l'upgrade al piano Starter ($7/mese)

### Errori di build

**Problema**: Il build fallisce.

**Soluzione**:
1. Controlla i log nel dashboard Render
2. Verifica che tutte le variabili d'ambiente siano configurate
3. Assicurati che `NODE_ENV=production` sia impostato

### Errori CORS

**Problema**: Il frontend non riesce a connettersi al backend.

**Soluzione**:
1. Verifica che `FRONTEND_URL` sia configurato correttamente nel servizio Render
2. Controlla che l'URL nel file `apps/cms/config/middlewares.ts` corrisponda
3. Riavvia il servizio dopo aver modificato le variabili d'ambiente

### Database connection errors

**Problema**: Strapi non riesce a connettersi al database.

**Soluzione**:
1. Verifica che `DATABASE_URL` sia configurato (dovrebbe essere automatico)
2. Controlla che `DATABASE_SSL=true` sia impostato
3. Verifica che il database sia stato creato correttamente

## Costi

### Free Tier
- **Database**: Gratis (con limitazioni)
- **Web Service**: Gratis (con sleep dopo 15 minuti)
- **Totale**: $0/mese

### Starter Plan (Consigliato per Produzione)
- **Database**: $7/mese
- **Web Service**: $7/mese
- **Totale**: $14/mese

## Prossimi Passi

1. ✅ Configura un dominio personalizzato (opzionale)
2. ✅ Imposta backup automatici del database
3. ✅ Configura monitoring e alerting
4. ✅ Considera l'upgrade al piano Starter per evitare il sleep

## Supporto

- [Documentazione Render](https://render.com/docs)
- [Documentazione Strapi](https://docs.strapi.io)
- [Community Render](https://community.render.com)

