import { Mail, MessageSquareText, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: MessageSquareText, title: 'General questions', body: 'Use this lane for publishing questions, navigation issues, or anything you want clarified.' },
    { icon: Sparkles, title: 'Editorial ideas', body: 'Share a concept, collection, or post direction that you think belongs on the site.' },
    { icon: Mail, title: 'Partnership notes', body: 'Reach out about collaborations, features, and thoughtful ways to work together.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[#0b0b0f] px-4 py-14 pt-[72px] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/30">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-white sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/40">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                  <lane.icon className="h-5 w-5 text-[#c8ff00]" />
                  <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white">{lane.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/40">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#141418] p-7 sm:p-9">
            <h2 className="text-4xl font-bold tracking-[-0.04em] text-white">{pagesContent.contact.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-white/40">Keep it simple. We will route your message through the right lane.</p>
            <div className="mt-7">
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
