import MainLayout from "@/components/MainLayout";

export default function TerminiPage() {
  return (
    <MainLayout>
      <div className="space-y-10">
        <section className="space-y-4">
          <p className="eyebrow">Termini di utilizzo</p>
          <h1 className="text-3xl font-semibold text-white">
            Condizioni d&apos;uso del sito e dei contenuti
          </h1>
          <p className="max-w-3xl text-sm text-zinc-300">
            Qui trovi le regole di base per usare Capibara in modo corretto e
            rispettoso. Il linguaggio è volutamente semplice: vogliamo che i
            termini siano comprensibili, non nascosti in gergo legale.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Uso personale</h2>
          <p className="text-sm text-zinc-300">
            Puoi usare il sito e i contenuti per informarti, studiare, discutere
            e condividere link sui tuoi canali. Non è consentito rivendere o
            ripubblicare sistematicamente i contenuti di Capibara come se fossero
            un tuo prodotto editoriale.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Contenuti accessibili solo agli abbonati
          </h2>
          <p className="text-sm text-zinc-300">
            Alcuni contenuti (articoli, newsletter, podcast o video) sono
            riservati a chi ha un abbonamento attivo. Condividere occasionalmente
            un estratto va bene; condividere in massa PDF, testi integrali o
            registrazioni private con persone non abbonate significa indebolire
            il progetto che stai sostenendo.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Comportamenti non ammessi
          </h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>• Tentare di forzare i sistemi di accesso o aggirare i paywall.</li>
            <li>• Usare Capibara per attività illegali, discriminatorie o di odio.</li>
            <li>• Spacciare per propri i nostri contenuti o il nostro marchio.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Limitazioni di responsabilità</h2>
          <p className="text-sm text-zinc-300">
            Lavoriamo per offrire informazioni accurate e verificate, ma errori e
            imprecisioni possono capitare. Ti invitiamo sempre a usare spirito
            critico e, quando prendi decisioni importanti, a confrontare più
            fonti. Possiamo aggiornare o rimuovere contenuti senza preavviso se
            li riteniamo non più corretti o adeguati.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Modifiche ai termini</h2>
          <p className="text-sm text-zinc-300">
            Potremmo aggiornare questi termini man mano che il progetto cresce o
            cambia forma. Quando le modifiche saranno rilevanti, lo segnaleremo
            sul sito o nelle newsletter principali.
          </p>
          <p className="text-xs text-zinc-500">
            Ultimo aggiornamento: {new Date().getFullYear()}
          </p>
        </section>
      </div>
    </MainLayout>
  );
}


