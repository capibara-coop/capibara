import MainLayout from "@/components/MainLayout";
import Image from "next/image";

interface RedazioneMember {
  name: string;
  avatar: string;
  redazione: string;
}

const membri: RedazioneMember[] = [
  { name: "Marco Rossi", avatar: "/avatar/peep-14.png", redazione: "Redazione Milano" },
  { name: "Sofia Bianchi", avatar: "/avatar/peep-20.png", redazione: "Redazione Roma" },
  { name: "Luca Verdi", avatar: "/avatar/peep-32.png", redazione: "Redazione Napoli" },
  { name: "Giulia Neri", avatar: "/avatar/peep-38.png", redazione: "Redazione Torino" },
  { name: "Alessandro Marrone", avatar: "/avatar/peep-45.png", redazione: "Redazione Milano" },
  { name: "Chiara Blu", avatar: "/avatar/peep-49.png", redazione: "Redazione Bologna" },
  { name: "Francesco Gialli", avatar: "/avatar/peep-51.png", redazione: "Redazione Firenze" },
  { name: "Elena Rosa", avatar: "/avatar/peep-55.png", redazione: "Redazione Roma" },
  { name: "Matteo Viola", avatar: "/avatar/peep-56.png", redazione: "Redazione Palermo" },
  { name: "Valentina Azzurra", avatar: "/avatar/peep-57.png", redazione: "Redazione Genova" },
  { name: "Davide Arancione", avatar: "/avatar/peep-74.png", redazione: "Redazione Milano" },
  { name: "Martina Celeste", avatar: "/avatar/peep-76.png", redazione: "Redazione Venezia" },
  { name: "Riccardo Indaco", avatar: "/avatar/peep-83.png", redazione: "Redazione Bari" },
  { name: "Alessia Turchese", avatar: "/avatar/peep-99.png", redazione: "Redazione Roma" },
];

export default function RedazionePage() {
  return (
    <MainLayout>
      <div className="space-y-12">
        <section className="space-y-4">
          <p className="eyebrow eyebrow--page">Redazione</p>
          <h1 className="page-title text-4xl font-semibold">
            La nostra redazione
          </h1>
          <p className="body-text-lg max-w-3xl">
            Una rete di giornaliste e giornalisti distribuiti sul territorio,
            unite e uniti dalla passione per un&apos;informazione indipendente
            e di parte.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {membri.map((membro, index) => (
            <div
              key={index}
              className="content-box p-6 space-y-4 flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Image
                  src={membro.avatar}
                  alt={membro.name}
                  width={96}
                  height={96}
                  className="object-contain w-full h-full p-2"
                />
              </div>
              <div className="space-y-1">
                <h3 className="page-heading text-lg font-semibold">
                  {membro.name}
                </h3>
                <p className="body-text-sm text-zinc-600 dark:text-zinc-400">
                  {membro.redazione}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </MainLayout>
  );
}

