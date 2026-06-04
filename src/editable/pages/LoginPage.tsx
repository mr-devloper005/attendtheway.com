import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="rounded-[2.8rem] bg-[linear-gradient(90deg,#dfe4fb_0%,#4451f7_36%,#f46aa6_73%,#5d58ea_100%)] p-8 text-white shadow-[0_30px_80px_rgba(77,93,255,0.18)] sm:p-12">
            <p className="text-xs uppercase tracking-[0.28em] text-white/76">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 font-sans text-5xl font-semibold leading-[1] tracking-[-0.06em] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/84">{pagesContent.auth.login.description}</p>
          </div>
          <div className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_24px_65px_rgba(30,26,24,0.08)] sm:p-9">
            <h2 className="font-serif text-4xl tracking-[-0.04em] text-[var(--slot4-page-text)]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-semibold text-[var(--slot4-page-text)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
