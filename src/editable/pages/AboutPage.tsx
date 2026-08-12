import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#0b0b0f] px-4 py-14 pt-[72px] text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#141418] px-6 py-14 sm:px-10 lg:px-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c8ff00]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/40">{pagesContent.about.description}</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-2xl border border-white/[0.06] bg-[#141418] p-8 lg:p-10">
              <div className="space-y-5 text-base leading-8 text-white/50">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="grid gap-4">
              {pagesContent.about.values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                  <h2 className="text-3xl font-bold tracking-[-0.03em] text-white">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/40">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
