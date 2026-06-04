import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import {
  ArticleListCard,
  CompactIndexCard,
  EditorialFeatureCard,
  HorizontalFeatureCard,
  ImageFirstStoryCard,
  RailPostCard,
  getEditableExcerpt,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function uniquePosts(posts: SitePost[]) {
  return Array.from(new Map(posts.map((post) => [post.slug || post.id || post.title, post])).values())
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const title = pagesContent.home.hero.title.join(' ')
  const spotlight = posts[0]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[var(--editable-container)] px-0 pt-0">
        <div className="grid min-h-[640px] place-items-center bg-[linear-gradient(90deg,#dfe4fb_0%,#4451f7_36%,#f46aa6_73%,#5d58ea_100%)] px-4 py-20 text-center text-white sm:px-6 lg:min-h-[640px] lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-medium">{pagesContent.home.hero.badge}</p>
            <h1 className="mt-12 font-sans text-5xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-[4.55rem]">{title}</h1>
            <p className="mt-20 text-2xl font-medium text-white/92"></p>
            <div className="mt-14 flex flex-wrap justify-center gap-5">
              <Link href={pagesContent.home.hero.primaryCta.href} className="inline-flex min-w-[194px] items-center justify-center rounded-full border border-white/80 px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-[#4d57f8]">
                {pagesContent.home.hero.primaryCta.label}
              </Link>
              <Link href={pagesContent.home.hero.secondaryCta.href} className="inline-flex min-w-[194px] items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white/95 hover:bg-white/12">
                {pagesContent.home.hero.secondaryCta.label}
              </Link>
            </div>
            {spotlight ? (
              <p className="mx-auto mt-14 max-w-2xl text-sm leading-7 text-white/78">{getEditableExcerpt(spotlight, 135)}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-2">
          {posts.slice(0, 2).map((post, index) => (
            <EditorialFeatureCard
              key={post.id || post.slug}
              post={post}
              href={postHref(primaryTask, post, primaryRoute)}
              label={index === 0 ? 'Lead story' : 'Editor note'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(2, 10)
  if (!railPosts.length) return null

  return (
    <section className="bg-white pb-10">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-[var(--slot4-dark-bg)] px-6 py-14 text-center text-white sm:px-10 lg:px-16 lg:py-20">
          <h2 className="font-sans text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Join Us</h2>
          <p className="mt-4 text-2xl text-white/86">Subscribe for fresh content!</p>
          <form action="/contact" className="mx-auto mt-10 max-w-2xl">
            <button className="mt-6 inline-flex min-w-[138px] items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] px-8 py-4 text-lg font-semibold text-white">
              Contact Us
            </button>
          </form>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="font-sans text-5xl font-semibold tracking-[-0.05em] text-[var(--slot4-page-text)] sm:text-6xl">Welcome to {SITE_CONFIG.name}</h2>
          </div>
          <div>
            <p className="text-2xl text-[var(--slot4-muted-text)]">Transforming ideas into engaging, shareable content.</p>
            <div className="mt-10 flex gap-10 text-[var(--slot4-accent-fill)]">
              <div>
                <p className="text-6xl font-semibold tracking-[-0.05em]">150+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">Fresh notes</p>
              </div>
              <div>
                <p className="text-6xl font-semibold tracking-[-0.05em]">15</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">Trusted lanes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {railPosts.map((post, index) => (
            <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sectionPosts = uniquePosts(timeSections.flatMap((section) => section.posts)).slice(0, 6)
  const lead = sectionPosts[0] || posts[0]
  const editorial = sectionPosts.slice(1, 3)
  const gallery = sectionPosts.slice(3, 9)

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        {lead ? (
          <div className="overflow-hidden rounded-[2rem]">
            <HorizontalFeatureCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} label="Featured visual" />
          </div>
        ) : null}

        <div className="mt-16 text-center">
          <h2 className="font-sans text-5xl font-semibold tracking-[-0.05em] text-[var(--slot4-page-text)] sm:text-6xl">Gallery</h2>
          <p className="mt-4 text-xl text-[var(--slot4-muted-text)]">Explore our creative visual journey</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-6">
            {editorial.map((post, index) => (
              <ArticleListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((post) => (
              <ImageFirstStoryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sourcePosts = uniquePosts(timeSections.flatMap((section) => section.posts).concat(posts)).slice(0, 8)

  return (
    <section className="bg-[var(--slot4-cream)] py-16">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--slot4-soft-muted-text)]">Browse by topic</p>
            <h2 className="mt-5 font-serif text-5xl tracking-[-0.05em] text-[var(--slot4-page-text)] sm:text-6xl">A calmer archive for bookmarks, reading, and public ideas.</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[var(--slot4-muted-text)]">
              Search by phrase, filter by category, or move through curated cards laid out like a modern editorial homepage.
            </p>
            <form action="/search" className="mt-8 flex max-w-xl overflow-hidden rounded-full border border-[var(--editable-border)] bg-white">
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 px-5 py-4 text-sm outline-none" />
              <button className="inline-flex items-center gap-2 bg-[var(--slot4-page-text)] px-6 py-4 text-sm font-semibold text-white">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {sourcePosts.map((post, index) => (
              <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <div></div>
  )
}
