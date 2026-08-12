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
      <main className="bg-[#0b0b0f] pt-[72px]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-[#141418] p-8 sm:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c8ff00]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 text-5xl font-bold leading-[1] tracking-[-0.04em] text-white sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/40">{pagesContent.auth.login.description}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 sm:p-9">
            <h2 className="text-4xl font-bold tracking-[-0.04em] text-white">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-white/40">New here? <Link href="/signup" className="font-semibold text-[#c8ff00] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
