import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EmptyState } from '@/editable/components/EmptyStates'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || getEditablePostImage(post) || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim()
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body) || getEditableExcerpt(post, 150))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-6 md:grid-cols-2', promise: 'Long-form reading with room for headline, deck, and summary.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-6 xl:grid-cols-2', promise: 'Business entries with useful facts, location, and quick contact cues.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-6 xl:grid-cols-2', promise: 'Offers and notices that stay quick to scan and easy to act on.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing with a lighter editorial frame.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3', promise: 'Saved links and references arranged like curated discovery cards.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3', promise: 'Document pages that feel like a browsable public library.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-6 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards with identity, summary, and context at a glance.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#0b0b0f', '--archive-text': '#e8e8e8', '--archive-surface': '#141418', '--archive-accent': '#c8ff00' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[#0b0b0f] pt-[72px] text-[var(--archive-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--archive-accent)]/30 bg-[var(--archive-accent)]/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[var(--archive-accent)]"><Icon className="h-4 w-4" /> {label}</div>
              <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl">{voice?.headline || `Browse ${label}`}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/40">{voice?.description || SITE_CONFIG.description}</p>
              <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-sm leading-7 text-white/40">{deck.promise}</div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"><Search className="h-4 w-4" /> Search posts</Link>
              </div>
            </div>

            <form action={basePath} className="self-end rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/30"><Filter className="h-4 w-4" /> Filter</div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-12 w-full rounded-full bg-[var(--archive-accent)] text-sm font-bold text-[#0b0b0f]">Apply</button>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/25">Showing: {categoryLabel}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <EmptyState title="No posts found" description="Try another category or return later after new content is published." actionLabel="Return home" actionHref="/" />
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/60 transition hover:border-white/20">Previous</Link> : null}
            <span className="rounded-full bg-[var(--archive-accent)] px-5 py-3 text-sm font-bold text-[#0b0b0f]">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/60 transition hover:border-white/20">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] transition hover:border-white/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
        <img src={getImage(post)} alt={post.title} className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--archive-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/40">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] p-5 transition hover:border-white/10 sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04]">
        {logo ? <img src={logo} alt={post.title} className="h-full w-full object-cover opacity-80" /> : <BriefcaseBusiness className="h-10 w-10 text-white/30" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--archive-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b0b0f]">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/50"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-white/40">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs text-white/30 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] transition hover:border-white/10">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-white/[0.04] p-5">
          <span className="rounded-full border border-[var(--archive-accent)]/30 bg-[var(--archive-accent)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--archive-accent)]">Classified</span>
          <h2 className="mt-10 text-4xl font-bold leading-[1] tracking-[-0.04em] text-white">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm text-white/50">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt={post.title} className="absolute bottom-4 right-4 h-20 w-20 rounded-xl object-cover opacity-70" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/40">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--archive-accent)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] transition hover:border-white/10">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={getImage(post)} alt={post.title} className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/50"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-bold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] p-6 transition hover:border-[var(--archive-accent)]/30">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5 text-white/30" />
      </div>
      <h2 className="mt-8 text-2xl font-bold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/40">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs uppercase tracking-[0.16em] text-white/25">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] p-6 transition hover:border-white/10">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-xl bg-[var(--archive-accent)] p-5 text-[#0b0b0f]"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/40">{getCategory(post, 'PDF')}</span>
      </div>
      <h2 className="mt-8 text-2xl font-bold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/40">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--archive-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-2xl border border-white/[0.06] bg-[var(--archive-surface)] p-6 text-center transition hover:border-white/10">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white/[0.04]">
        {avatar ? <img src={avatar} alt={post.title} className="h-full w-full object-cover opacity-80" /> : <UserRound className="h-10 w-10 text-white/30" />}
      </div>
      <h2 className="mt-5 text-xl font-bold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
      {role ? <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/40">{getSummary(post)}</p>
    </Link>
  )
}
