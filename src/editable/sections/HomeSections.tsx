import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import {
  getEditableExcerpt,
  getEditablePostImage,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function uniquePosts(posts: SitePost[]) {
  return Array.from(new Map(posts.map((post) => [post.slug || post.id || post.title, post])).values())
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const title = pagesContent.home.hero.title.join(' ')
  const featured = posts.slice(0, 6)

  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] pt-[72px]">
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8ff00]">{SITE_CONFIG.name}</p>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-white/40">{pagesContent.home.hero.description}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={pagesContent.home.hero.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[#c8ff00] px-7 py-3.5 text-sm font-bold text-[#0b0b0f] transition hover:bg-[#b8ef00]">
              {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={pagesContent.home.hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white">
              {pagesContent.home.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        {featured.length ? (
          <div className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-white/[0.04]">
                <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 line-clamp-2 text-xs font-semibold leading-snug text-white/90">{post.title}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(2, 10)
  if (!railPosts.length) return null

  return (
    <section className="bg-[#0b0b0f] py-20">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8ff00]">Explore</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">Welcome to {SITE_CONFIG.name}</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/40">Curated discoveries, editorial picks, and saved references — organized for calm, focused browsing.</p>
            <div className="mt-8 flex gap-10">
              <div>
                <p className="text-4xl font-bold tracking-tight text-[#c8ff00]">150+</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/30">Resources</p>
              </div>
              <div>
                <p className="text-4xl font-bold tracking-tight text-[#c8ff00]">15</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/30">Collections</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
            <h3 className="text-2xl font-bold text-white">Stay connected</h3>
            <p className="mt-2 text-sm text-white/40">Get in touch for fresh content and ideas.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c8ff00] px-6 py-3 text-sm font-bold text-[#0b0b0f] transition hover:bg-[#b8ef00]">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {railPosts.map((post) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group w-[260px] shrink-0">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white/[0.04]">
                <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-85" />
              </div>
              <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-white/80 transition group-hover:text-[#c8ff00]">{post.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-white/30">{getEditableExcerpt(post, 100)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sectionPosts = uniquePosts(timeSections.flatMap((section) => section.posts)).slice(0, 6)
  const lead = sectionPosts[0] || posts[0]
  const grid = sectionPosts.slice(1, 5)

  return (
    <section className="bg-[#0b0b0f] py-20">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8ff00]">Featured</p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">Latest Works</h2>
        </div>

        {lead ? (
          <Link href={postHref(primaryTask, lead, primaryRoute)} className="group mt-12 block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={getEditablePostImage(lead)} alt="" className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c8ff00]">Featured</p>
                <h3 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-3xl">{lead.title}</h3>
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/40">{getEditableExcerpt(lead, 200)}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#c8ff00]">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ) : null}

        {grid.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {grid.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-white/10">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80" />
                </div>
                <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-white/80 transition group-hover:text-[#c8ff00]">{post.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-white/30">{getEditableExcerpt(post, 90)}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sourcePosts = uniquePosts(timeSections.flatMap((section) => section.posts).concat(posts)).slice(0, 8)

  return (
    <section className="bg-[#101015] py-20">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8ff00]">Archive</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">Browse the collection</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/40">
              Search by phrase, filter by category, or move through curated cards laid out for easy discovery.
            </p>
            <form action="/search" className="mt-8 flex max-w-xl overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25" />
              <button className="inline-flex items-center gap-2 bg-[#c8ff00] px-6 py-3.5 text-sm font-bold text-[#0b0b0f]">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {sourcePosts.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition hover:border-white/10">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/[0.04]">
                  <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover opacity-60 transition group-hover:opacity-80" />
                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white/70 transition group-hover:text-[#c8ff00]">{post.title}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-white/25">{getEditableExcerpt(post, 60)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return <div />
}
