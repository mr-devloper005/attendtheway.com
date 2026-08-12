import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-2xl border border-white/[0.06] bg-[#141418] px-6 py-12 text-center', className)}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c8ff00]/10 text-[#c8ff00]">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-4xl font-bold tracking-[-0.03em] text-white">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-white/40">{description}</p>
      <Link href={actionHref} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c8ff00] px-6 py-3 text-sm font-bold text-[#0b0b0f]">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically as soon as new entries are available.`}
      actionLabel="Explore the homepage"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your message has been sent successfully."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
