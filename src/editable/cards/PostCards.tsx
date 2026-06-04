import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((item): item is string => typeof item === 'string' && Boolean(item))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const image = typeof content.image === 'string' ? content.image : ''
  const featuredImage = typeof content.featuredImage === 'string' ? content.featuredImage : ''
  return mediaUrl || contentImage || image || featuredImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean ? (clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean) : 'A concise summary will appear here once this post includes one.'
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function MetaLine({ category }: { category: string }) {
  return (
    <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">
      <Clock3 className="h-3.5 w-3.5" />
      {category}
    </p>
  )
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[16/11] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6 sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{label}</p>
        <h3 className="mt-4 font-serif text-[2rem] leading-[1.02] tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 170)}</p>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(18,18,30,0.82)_100%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-page-text)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="absolute bottom-4 left-4 right-4 font-serif text-2xl leading-tight tracking-[-0.04em] text-white">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="font-serif text-3xl leading-none text-[var(--slot4-accent-fill)]">{String(index + 1).padStart(2, '0')}</span>
        <div className="min-w-0">
          <MetaLine category={getEditableCategory(post)} />
          <h3 className="mt-2 line-clamp-2 font-serif text-[1.6rem] leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[260px_minmax(0,1fr)]`}>
      <div className="relative aspect-[16/12] overflow-hidden rounded-[1.4rem]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 font-serif text-[2rem] leading-[1.03] tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
          Open article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export function HorizontalFeatureCard({ post, href, label = 'Curated pick' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group grid overflow-hidden ${dc.surface.card} ${dc.motion.lift} md:grid-cols-[0.95fr_1.05fr]`}>
      <div className="relative min-h-[280px] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex min-h-[280px] flex-col justify-center p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{label}</p>
        <h3 className="mt-4 font-serif text-[2.2rem] leading-[1.02] tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
      </div>
    </Link>
  )
}

export function ImageFirstStoryCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[1/1] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <MetaLine category={getEditableCategory(post)} />
        <h3 className="mt-3 line-clamp-2 font-serif text-[1.55rem] leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
      </div>
    </Link>
  )
}
