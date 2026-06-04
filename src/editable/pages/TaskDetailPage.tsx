import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || getEditableExcerpt(post, 150)
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const detailVars = { '--detail-bg': '#ffffff', '--detail-text': '#241f1d', '--detail-surface': '#ffffff', '--detail-accent': '#4d5dff' } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-white text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-semibold">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function HeroBlock({ title, category, summary, image }: { title: string; category: string; summary?: string; image?: string }) {
  return (
    <div className="overflow-hidden rounded-[2.8rem] bg-[linear-gradient(90deg,#dfe4fb_0%,#4451f7_36%,#f46aa6_73%,#5d58ea_100%)] text-white shadow-[0_30px_90px_rgba(77,93,255,0.16)]">
      <div className={`grid gap-8 p-6 sm:p-8 ${image ? 'lg:grid-cols-[1.02fr_0.98fr] lg:items-center' : ''}`}>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/76">{category}</p>
          <h1 className="mt-4 font-sans text-5xl font-semibold leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">{title}</h1>
          {summary ? <p className="mt-6 max-w-2xl text-base leading-8 text-white/84">{summary}</p> : null}
        </div>
        {image ? (
          <div className="overflow-hidden rounded-[2rem] bg-white/15">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="article" />
      <div className="mt-8"><HeroBlock title={post.title} category={categoryOf(post, 'Article')} summary={summaryText(post)} image={images[0]} /></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        <article className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_24px_65px_rgba(30,26,24,0.06)] sm:p-10">
          <BodyContent post={post} />
          <EditableComments slug={post.slug} comments={comments} />
        </article>
        <RelatedPanel task="article" post={post} related={related} />
      </div>
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-8"><HeroBlock title={post.title} category="Business listing" summary={summaryText(post)} image={images[0]} /></div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <article className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_24px_65px_rgba(30,26,24,0.06)] sm:p-9">
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="classified" />
      <div className="mt-8"><HeroBlock title={post.title} category={price || 'Classified notice'} summary={summaryText(post)} image={images[0]} /></div>
      <div className="mt-8 grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="rounded-[2.4rem] bg-[var(--slot4-dark-bg)] p-7 text-white lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs uppercase tracking-[0.28em] text-white/54">Classified notice</p>
          <div className="mt-8 grid gap-3">
            {price ? <BadgeLine label="Price" value={price} /> : null}
            {condition ? <BadgeLine label="Condition" value={condition} /> : null}
            {location ? <BadgeLine label="Location" value={location} /> : null}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {phone ? <a href={`tel:${phone}`} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--slot4-dark-bg)]">Call now</a> : null}
            {email ? <a href={`mailto:${email}`} className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold">Email</a> : null}
          </div>
        </aside>
        <article className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_24px_65px_rgba(30,26,24,0.06)] sm:p-9">
          <ImageStrip images={images} label="Offer images" large />
          <BodyContent post={post} />
          <ContactAction website={website} phone={phone} email={email} />
          <RelatedPanel task="classified" post={post} related={related} />
        </article>
      </div>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="image" />
      <div className="mt-8"><HeroBlock title={post.title} category="Image story" summary={summaryText(post)} image={images[0] || getEditablePostImage(post)} /></div>
      <div className="mt-8 columns-1 gap-5 space-y-5 md:columns-2">
        {(images.length ? images : [getEditablePostImage(post)]).map((image, index) => (
          <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[0_24px_65px_rgba(30,26,24,0.06)]">
            <img src={image} alt={post.title} className="w-full object-cover" />
            {index === 0 ? <figcaption className="p-5 text-sm leading-7 text-[var(--slot4-muted-text)]">Featured visual from this image post.</figcaption> : null}
          </figure>
        ))}
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="sbm" />
      <div className="mt-8 overflow-hidden rounded-[2.8rem] border border-[var(--editable-border)] bg-[linear-gradient(135deg,#f6f0ff_0%,#ffffff_46%,#edf3ff_100%)] shadow-[0_24px_65px_rgba(30,26,24,0.06)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--detail-accent)]">Saved resource</p>
            <h1 className="mt-4 max-w-3xl font-sans text-5xl font-semibold leading-[0.96] tracking-[-0.07em] text-[var(--detail-text)] sm:text-6xl lg:text-7xl">{post.title}</h1>
            {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-semibold text-white">Open saved resource <ExternalLink className="h-4 w-4" /></Link> : null}
          </div>
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">Quick context</p>
            <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--slot4-muted-text)]">
              <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Task: {getTaskConfig('sbm')?.label || 'Bookmarks'}</p>
              <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Site: {SITE_CONFIG.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        <article className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_24px_65px_rgba(30,26,24,0.06)] sm:p-10">
          <BodyContent post={post} stripMedia />
        </article>
        <RelatedPanel task="sbm" post={post} related={related} compact hideAbout showExcerpt={false} />
      </div>
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="pdf" />
      <div className="mt-8"><HeroBlock title={post.title} category="PDF resource" summary={summaryText(post)} /></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        <article className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_24px_65px_rgba(30,26,24,0.06)] sm:p-9">
          <BodyContent post={post} />
          {fileUrl ? (
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-gray)]">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--editable-border)] bg-white p-4">
                <span className="text-sm font-semibold">Document preview</span>
                <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-4 py-2 text-xs font-semibold text-white">Download <Download className="h-4 w-4" /></Link>
              </div>
              <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
            </div>
          ) : null}
        </article>
        <RelatedPanel task="pdf" post={post} related={related} />
      </div>
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="profile" />
      <div className="mt-8"><HeroBlock title={post.title} category={role || 'Profile'} summary={summaryText(post)} image={images[0]} /></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-8 text-center shadow-[0_24px_65px_rgba(30,26,24,0.06)] lg:sticky lg:top-24 lg:self-start">
          <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-gray)]">
            {images[0] ? <img src={images[0]} alt={post.title} className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 opacity-45" />}
          </div>
          <h1 className="mt-6 font-serif text-4xl tracking-[-0.05em]">{post.title}</h1>
          {role ? <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--detail-accent)]">{role}</p> : null}
          <ContactAction website={website} email={email} />
        </aside>
        <article className="rounded-[2.4rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_24px_65px_rgba(30,26,24,0.06)] sm:p-10">
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Profile gallery" />
          <RelatedPanel task="profile" post={post} related={related} />
        </article>
      </div>
    </section>
  )
}

function stripMediaTags(html: string) {
  return html
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/<picture\b[^>]*>[\s\S]*?<\/picture>/gi, '')
    .replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, '')
    .replace(/<source\b[^>]*>/gi, '')
    .replace(/<video\b[^>]*>[\s\S]*?<\/video>/gi, '')
}

function BodyContent({ post, compact = false, stripMedia = false }: { post: SitePost; compact?: boolean; stripMedia?: boolean }) {
  const html = formatPlainText(getBody(post))
  const content = stripMedia ? stripMediaTags(html) : html
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'}`} dangerouslySetInnerHTML={{ __html: content }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-gray)] p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm leading-7 text-[var(--slot4-page-text)]">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--detail-accent)]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt={label} className="aspect-[4/3] rounded-[1.4rem] object-cover" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[0_24px_65px_rgba(30,26,24,0.06)]">
      <div className="flex items-center gap-2 p-4 text-sm font-semibold"><MapPin className="h-4 w-4" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_24px_65px_rgba(30,26,24,0.06)]">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-sm font-semibold text-white">Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/14 bg-white/10 px-4 py-3 text-sm"><span className="uppercase tracking-[0.16em] text-white/58">{label}</span><span className="font-semibold">{value}</span></div>
}

function RelatedPanel({ task, post, related, compact = false, hideAbout = false, showExcerpt = true }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean; hideAbout?: boolean; showExcerpt?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact && !hideAbout ? (
        <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_24px_65px_rgba(30,26,24,0.06)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">About this post</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--slot4-muted-text)]">
            <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Site: {SITE_CONFIG.name}</p>
            {post.publishedAt ? <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p> : null}
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_24px_65px_rgba(30,26,24,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-3xl tracking-[-0.04em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-xs uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">View all</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} showExcerpt={showExcerpt} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post, showExcerpt = true }: { task: TaskKey; post: SitePost; showExcerpt?: boolean }) {
  const image = getImages(post)[0] || getEditablePostImage(post)
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded-[1.4rem] border border-[var(--editable-border)] bg-[var(--slot4-gray)] p-3 transition hover:-translate-y-0.5">
      {task !== 'sbm' ? <img src={image} alt={post.title} className="h-20 w-20 shrink-0 rounded-xl object-cover" /> : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white"><FileText className="h-6 w-6 opacity-45" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-semibold leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
        {showExcerpt ? <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--slot4-muted-text)]">{summaryText(post)}</p> : null}
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-gray)] p-5">
      <div className="flex items-center gap-2 text-2xl font-serif"><MessageCircle className="h-5 w-5" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-[1.4rem] border border-[var(--editable-border)] bg-white p-4">
            <p className="text-sm font-semibold">{comment.name}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-[var(--slot4-muted-text)]">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
