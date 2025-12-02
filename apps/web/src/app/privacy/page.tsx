import MainLayout from "@/components/MainLayout";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="space-y-10">
        <section className="space-y-4">
          <p className="eyebrow eyebrow--page">Privacy</p>
          <h1 className="text-3xl font-semibold text-white">
            Informativa sul trattamento dei dati personali
          </h1>
          <p className="max-w-3xl text-sm text-zinc-300">
            Questa pagina descrive in modo sintetico come Capibara tratta i dati
            personali delle persone che utilizzano il sito e i servizi collegati.
            È un testo informativo, non sostituisce una consulenza legale e potrà
            essere aggiornato nel tempo.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Titolare del trattamento</h2>
          <p className="text-sm text-zinc-300">
            Il titolare del trattamento è il collettivo editoriale Capibara. I
            riferimenti aggiornati per contattarci (email e canali ufficiali)
            saranno sempre indicati nelle pagine di contatto del sito.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Quali dati raccogliamo
          </h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              • Dati di navigazione di base (log tecnici, IP, user agent) necessari al
              funzionamento dell&apos;applicazione e alla sicurezza.
            </li>
            <li>
              • Dati forniti volontariamente (nome, email, eventuali altri dati
              richiesti in fase di registrazione o abbonamento).
            </li>
            <li>
              • Dati di pagamento gestiti tramite fornitori terzi (es. Stripe), che
              trattano i dati come autonomi titolari o responsabili.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Perché trattiamo questi dati
          </h2>
          <p className="text-sm text-zinc-300">
            Trattiamo i dati solo per fornire il servizio richiesto: gestione
            dell&apos;account, erogazione di newsletter, gestione degli
            abbonamenti, analisi tecnica del funzionamento del sito. Non vendiamo
            i tuoi dati e non li utilizziamo per profilazione commerciale invasiva.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Base giuridica</h2>
          <p className="text-sm text-zinc-300">
            A seconda dei casi, il trattamento si basa sul consenso,
            sull&apos;esecuzione di un contratto (es. abbonamento) o sul legittimo
            interesse a garantire sicurezza, prevenire abusi e migliorare il
            servizio.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Diritti delle persone</h2>
          <p className="text-sm text-zinc-300">
            Puoi chiederci in qualsiasi momento di accedere ai dati che ti
            riguardano, rettificarli, cancellarli (nei limiti in cui non siano
            necessari per obblighi di legge), limitare il trattamento o opporti a
            determinati usi. Puoi anche richiedere la portabilità dei dati
            forniti.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Dati conservati e aggiornamenti dell&apos;informativa
          </h2>
          <p className="text-sm text-zinc-300">
            Conserviamo i dati per il tempo necessario a fornire il servizio e
            adempiere agli obblighi di legge. Se modificheremo modalità o finalità
            del trattamento aggiorneremo questa pagina, indicando la data di
            aggiornamento in fondo all&apos;informativa.
          </p>
          <p className="text-xs text-zinc-500">
            Ultimo aggiornamento: {new Date().getFullYear()}
          </p>
        </section>
      </div>
    </MainLayout>
  );
}


