import { notFound } from "next/navigation";
import { getNewsletterIssueBySlug } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdown";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = await getNewsletterIssueBySlug(slug);

  if (!issue) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
        >
          ← Torna alla home
        </Link>

        <article className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-wide text-zinc-400">
              <span>Newsletter</span>
              {issue.isPremium && (
                <span className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs text-amber-200">
                  Abbonati
                </span>
              )}
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white">
              {issue.title}
            </h1>
            {issue.publishDate && (
              <p className="mt-4 text-sm uppercase tracking-wide text-zinc-500">
                {new Date(issue.publishDate).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          {issue.excerpt && (
            <p className="text-lg text-zinc-300">{issue.excerpt}</p>
          )}

          {issue.body && (
            <div
              className="prose prose-invert max-w-none text-zinc-300"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(issue.body) }}
            />
          )}
        </article>
      </div>
    </MainLayout>
  );
}

