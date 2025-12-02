import MainLayout from "@/components/MainLayout";

export default function ChiSiamoPage() {
  return (
    <MainLayout>
      <div className="space-y-12">
        <section className="space-y-4">
          <p className="eyebrow eyebrow--page">Chi siamo</p>
          <h1 className="text-4xl font-semibold text-white">
            Capibara è un progetto di informazione che sceglie da che parte stare.
          </h1>
          <p className="max-w-3xl text-lg text-zinc-300">
            Nasciamo dall&apos;intreccio tra lavoro giornalistico, attivismo e
            organizzazione. Raccontiamo conflitti sociali, lavoro, crisi
            climatica e nuove forme di mutualismo con uno sguardo dichiaratamente
            di parte: quello di chi il potere non ce l&apos;ha.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              La nostra linea editoriale
            </h2>
            <p className="text-sm text-zinc-300">
              Non siamo neutri, siamo trasparenti. Crediamo che il giornalismo
              abbia il compito di prendere posizione e rendere visibili le
              asimmetrie di potere: tra chi lavora e chi decide, tra chi subisce
              le crisi e chi le usa per fare profitti, tra territori e grandi
              interessi privati.
            </p>
            <p className="text-sm text-zinc-300">
              Per questo scegliamo un linguaggio chiaro, accessibile, che non si
              appoggia al gergo tecnocratico, ma prova a rendere comprensibili
              processi complessi a chi vive sulla propria pelle le conseguenze
              delle scelte politiche ed economiche.
            </p>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-900/20 to-indigo-900/20 p-6">
            <h3 className="text-lg font-semibold text-white">
              Cosa trovi su Capibara
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Inchieste e reportage sui luoghi di lavoro e di conflitto</li>
              <li>• Analisi lunghe per capire cosa c&apos;è dietro le notizie</li>
              <li>• Podcast e video pensati per l&apos;ascolto quotidiano</li>
              <li>• Newsletter per chi vuole seguire i movimenti nel tempo</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Come lavoriamo
            </h2>
            <p className="text-sm text-zinc-300">
              Lavoriamo in redazione distribuita, con una rete di collaboratrici
              e collaboratori che arrivano da sindacati di base, movimenti
              climatici, collettivi studenteschi, campagne transfemministe e
              spazi sociali. Questo non significa rinunciare al rigore, ma
              allargare lo sguardo a chi di solito non ha microfono.
            </p>
            <p className="text-sm text-zinc-300">
              Ogni contenuto passa per un lavoro di confronto collettivo:
              verifichiamo fonti, dati e contesto, ma anche il punto di vista
              politico con cui raccontiamo le storie. Vogliamo essere uno
              strumento utile per chi organizza conflitti, non un commento
              esterno.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Modello economico
            </h2>
            <p className="text-sm text-zinc-300">
              Capibara vive grazie agli abbonamenti e al sostegno diretto di chi
              ci legge, ascolta e guarda. Non prendiamo soldi da partiti o
              grandi gruppi industriali e limitiamo al minimo partnership
              commerciali che possano condizionare la nostra linea editoriale.
            </p>
            <p className="text-sm text-zinc-300">
              Ogni euro che entra serve a pagare lavoro giornalistico, produzione
              audio/video e infrastruttura tecnologica. Per questo chiediamo
              apertamente di abbonarsi: non è solo un &quot;supporta il
              progetto&quot;, ma un modo per costruire insieme un&apos;altra
              idea di media.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-900/20 to-indigo-900/20 p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Perché abbonarsi a Capibara
          </h2>
          <p className="text-sm text-zinc-300">
            Abbonarsi non significa solo sbloccare contenuti in più. Significa
            permetterci di aprire nuove inchieste, seguire vertenze che durano
            mesi, dare voce a chi non ce l&apos;ha, sperimentare nuovi formati
            per raccontare il presente.
          </p>
          <p className="text-sm text-zinc-300">
            Se vuoi che esistano media che non trattano le persone come target
            pubblicitari ma come soggetti politici, Capibara è uno degli spazi
            in cui questa idea prova a diventare realtà.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}


