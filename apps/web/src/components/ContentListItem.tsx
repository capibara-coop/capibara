import Link from "next/link";

type ContentListItemData = {
  title: string;
  date: string;
  summary: string;
  tag: string;
  locked?: boolean;
  slug?: string;
  type?: "video" | "podcast" | "newsletter" | "article";
};

export default function ContentListItem({
  item,
}: {
  item: ContentListItemData;
}) {
  const getHref = () => {
    if (!item.slug || !item.type) return "#";
    if (item.type === "article") return `/articoli/${item.slug}`;
    return `/${item.type}/${item.slug}`;
  };

  const href = getHref();

  const Row = (
    <article className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm shadow-sm transition hover:border-white/30 hover:bg-zinc-900/90">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
          <span>{item.tag}</span>
          {item.locked && (
            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-200">
              Abbonati
            </span>
          )}
        </div>
        <div className="font-medium text-white">{item.title}</div>
        {item.summary && (
          <p className="max-w-3xl text-xs text-zinc-400 line-clamp-2">
            {item.summary}
          </p>
        )}
      </div>
      <div className="shrink-0 pl-2 text-right text-[11px] uppercase tracking-wide text-zinc-500">
        {item.date}
      </div>
    </article>
  );

  if (item.slug && item.type) {
    return (
      <Link href={href} className="block">
        {Row}
      </Link>
    );
  }

  return Row;
}
