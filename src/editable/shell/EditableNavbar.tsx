'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const taskItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 2).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Browse', href: taskItems[0]?.href || '/sbm' },
    { label: 'Contact us', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/92 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[82px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-[2rem] leading-none tracking-[-0.06em] text-[var(--slot4-page-text)]">
          {SITE_CONFIG.name}
        </Link>

        <div className="mx-auto hidden items-center gap-9 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b pb-1 text-base ${active ? 'border-[var(--slot4-page-text)] text-[var(--slot4-page-text)]' : 'border-transparent text-[var(--slot4-page-text)]/78 hover:text-[var(--slot4-page-text)]'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="hidden lg:block">
          <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-gray)] px-4 py-2.5 text-[var(--slot4-soft-muted-text)]">
            <Search className="h-4 w-4" />
            <input name="q" type="search" placeholder="Search" className="w-32 bg-transparent text-sm outline-none placeholder:text-current" />
          </label>
        </form>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {session ? (
            <>
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] hover:bg-[var(--slot4-accent-soft)]">
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button type="button" onClick={logout} className="rounded-full px-3 py-2 text-sm text-[var(--slot4-page-text)]/72 hover:text-[var(--slot4-page-text)]">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[var(--slot4-page-text)]/72 hover:text-[var(--slot4-page-text)]">
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] hover:bg-[var(--slot4-accent-soft)]">
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-full border border-[var(--editable-border)] p-2 md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 md:hidden">
          <form action="/search" className="mb-4">
            <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-gray)] px-4 py-3 text-[var(--slot4-soft-muted-text)]">
              <Search className="h-4 w-4" />
              <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-current" />
            </label>
          </form>
          <div className="grid gap-2">
            {[...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-[1.35rem] border border-[var(--editable-border)] px-4 py-3 text-sm font-semibold text-[var(--slot4-page-text)]">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="rounded-[1.35rem] border border-[var(--editable-border)] px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-page-text)]">
                Logout
              </button>
            ) : null}
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{globalContent.nav.tagline}</p>
        </div>
      ) : null}
    </header>
  )
}
