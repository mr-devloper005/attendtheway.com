'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="mt-8 bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-3xl tracking-[-0.06em]">{SITE_CONFIG.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/68">{globalContent.footer.description}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.24em] text-white/45">{globalContent.footer.bottomNote}</p>
        </div>

        {globalContent.footer.columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-xs uppercase tracking-[0.24em] text-white/45">{column.title}</h2>
            <div className="mt-4 grid gap-2">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/78 hover:text-white">
                  {link.label}
                </Link>
              ))}
              {column.title === 'Visit' && session ? (
                <button type="button" onClick={logout} className="text-left text-sm text-white/78 hover:text-white">
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-xs uppercase tracking-[0.24em] text-white/45">Notes</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-white/68">
            <p>{globalContent.footer.tagline}</p>
            <p>Browse current posts, search the archive, or reach out with a new idea.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs uppercase tracking-[0.22em] text-white/42">
        Copyright {year} {SITE_CONFIG.name}
      </div>
    </footer>
  )
}
