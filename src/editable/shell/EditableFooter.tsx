'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const enabledTasks = SITE_CONFIG.tasks.filter((t) => t.enabled)

  return (
    <footer className="bg-[#0b0b0f] text-white">
      <div className="mx-auto max-w-[1360px] px-5 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr]">
          <div>
            <p className="text-2xl font-bold tracking-[-0.04em]">{SITE_CONFIG.name}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">{globalContent.footer.description}</p>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white/25">{globalContent.footer.bottomNote}</p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25">Browse</h3>
            <div className="mt-5 grid gap-3">
              <Link href="/" className="text-sm text-white/50 transition hover:text-[#c8ff00]">Home</Link>
              {enabledTasks.map((task) => (
                <Link key={task.key} href={task.route} className="group inline-flex items-center gap-1 text-sm text-white/50 transition hover:text-[#c8ff00]">
                  {task.label} <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
              <Link href="/search" className="text-sm text-white/50 transition hover:text-[#c8ff00]">Search</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25">Site</h3>
            <div className="mt-5 grid gap-3">
              <Link href="/about" className="text-sm text-white/50 transition hover:text-[#c8ff00]">About</Link>
              <Link href="/contact" className="text-sm text-white/50 transition hover:text-[#c8ff00]">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25">Account</h3>
            <div className="mt-5 grid gap-3">
              {session ? (
                <>
                  <Link href="/create" className="text-sm text-white/50 transition hover:text-[#c8ff00]">Create post</Link>
                  <button type="button" onClick={logout} className="text-left text-sm text-white/50 transition hover:text-[#c8ff00]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-white/50 transition hover:text-[#c8ff00]">Sign in</Link>
                  <Link href="/signup" className="text-sm text-white/50 transition hover:text-[#c8ff00]">Create account</Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-7 text-[11px] uppercase tracking-[0.18em] text-white/20 sm:flex-row">
          <p>&copy; {year} {SITE_CONFIG.name}</p>
          <p>{globalContent.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
