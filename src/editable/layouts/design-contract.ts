import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f4f1',
  '--slot4-page-text': '#241f1d',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#6e625c',
  '--slot4-soft-muted-text': '#8b7f78',
  '--slot4-accent': '#c9996b',
  '--slot4-accent-fill': '#4d5dff',
  '--slot4-accent-soft': '#ede9e6',
  '--slot4-dark-bg': '#24273f',
  '--slot4-dark-text': '#f8f5f2',
  '--slot4-media-bg': '#ece6e0',
  '--slot4-cream': '#f7f4f1',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#eef0ff',
  '--slot4-gray': '#fbf9f7',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #f7f4f1 42%, #f3efec 100%)',
  '--editable-page-bg': '#f7f4f1',
  '--editable-page-text': '#241f1d',
  '--editable-border': 'rgba(36,31,29,0.08)',
  '--editable-container': '1280px',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_24px_65px_rgba(30,26,24,0.08)]',
  shadowStrong: 'shadow-[0_35px_90px_rgba(30,26,24,0.15)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(18,18,32,0.02),rgba(18,18,32,0.68))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[270px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.28em]',
    heroTitle: 'font-serif text-5xl font-bold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#2b2850]',
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} bg-white px-8 py-3.5 text-sm font-semibold ${editablePalette.surfaceText} transition hover:bg-[var(--slot4-accent-soft)]`,
    accent: 'inline-flex items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-95',
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.75rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(30,26,24,0.14)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep the visual identity close to the provided reference: bright header, expansive gradient hero, editorial cards, dark subscribe band, and restrained footer.',
  'Preserve task-aware links and fetched posts. Use shared helpers instead of hardcoded mock card data.',
  'Use visual variety across cards so homepage, archives, and related sections do not feel repetitive.',
  'Support missing image, summary, and category fields with graceful fallbacks.',
  'Keep layout density balanced on mobile to avoid overflow and oversized gaps.',
] as const
