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
      <main className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--slot4-soft-muted-text)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl tracking-[-0.05em] text-[var(--slot4-page-text)] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-gray)] p-6">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                  <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-[var(--slot4-page-text)]">{lane.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] bg-[var(--slot4-dark-bg)] p-7 text-white shadow-[0_30px_80px_rgba(25,24,49,0.18)] sm:p-9">
            <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em]">{pagesContent.contact.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-white/68">Keep it simple. We will route your message through the right lane.</p>
            <div className="mt-7 rounded-[2rem] bg-white p-5 text-[var(--slot4-page-text)] sm:p-6">
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
