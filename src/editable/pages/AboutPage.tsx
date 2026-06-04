import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white px-4 py-14 text-[var(--editable-page-text)] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <div className="rounded-[2.8rem] bg-[linear-gradient(90deg,#dfe4fb_0%,#4451f7_36%,#f46aa6_73%,#5d58ea_100%)] px-6 py-14 text-white sm:px-10 lg:px-14">
            <p className="text-xs uppercase tracking-[0.28em] text-white/78">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-4xl font-sans text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/86">{pagesContent.about.description}</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[2.3rem] border border-[var(--editable-border)] bg-white p-8 shadow-[0_24px_65px_rgba(30,26,24,0.06)] lg:p-10">
              <div className="space-y-5 text-base leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="grid gap-4">
              {pagesContent.about.values.map((value) => (
                <div key={value.title} className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-gray)] p-6">
                  <h2 className="font-serif text-3xl tracking-[-0.04em] text-[var(--slot4-page-text)]">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
