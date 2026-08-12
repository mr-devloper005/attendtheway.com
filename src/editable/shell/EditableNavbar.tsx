'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const taskItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 3).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const navItems = [
    ...taskItems,
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0b0f]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-[72px] max-w-[1360px] items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0 text-xl font-bold tracking-[-0.04em] text-white">
          {SITE_CONFIG.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-2 text-[13px] font-medium tracking-wide transition ${isActive(item.href) ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link href="/search" className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition hover:bg-white/[0.06] hover:text-white/70" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          {session ? (
            <>
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full border border-[#c8ff00] px-4 py-2 text-[13px] font-semibold text-[#c8ff00] transition hover:bg-[#c8ff00] hover:text-[#0b0b0f]">
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button type="button" onClick={logout} className="px-3 py-2 text-[13px] text-white/40 transition hover:text-white/70">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] text-white/50 transition hover:text-white/80">
                <LogIn className="h-3.5 w-3.5" /> Sign in
              </Link>
              <Link href="/signup" className="inline-flex items-center gap-1.5 rounded-full bg-[#c8ff00] px-4 py-2 text-[13px] font-semibold text-[#0b0b0f] transition hover:bg-[#b8ef00]">
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)} className="ml-auto rounded-lg border border-white/10 p-2 text-white/60 md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/[0.06] bg-[#0b0b0f] px-5 pb-6 pt-4 md:hidden">
          <div className="grid gap-1">
            <Link href="/" onClick={() => setOpen(false)} className={`rounded-lg px-4 py-2.5 text-sm font-medium ${isActive('/') && pathname === '/' ? 'bg-white/[0.06] text-white' : 'text-white/50'}`}>
              Home
            </Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-lg px-4 py-2.5 text-sm font-medium ${isActive(item.href) ? 'bg-white/[0.06] text-white' : 'text-white/50'}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/50">Search</Link>
          </div>
          <div className="mt-4 flex gap-2 border-t border-white/[0.06] pt-4">
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-[#c8ff00] px-4 py-2.5 text-center text-sm font-bold text-[#0b0b0f]">Create</Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/50">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm text-white/50">Sign in</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-[#c8ff00] px-4 py-2.5 text-center text-sm font-bold text-[#0b0b0f]">Sign up</Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
