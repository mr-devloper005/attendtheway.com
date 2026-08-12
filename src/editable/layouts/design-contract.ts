import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#0b0b0f',
  '--slot4-page-text': '#e8e8e8',
  '--slot4-panel-bg': '#141418',
  '--slot4-surface-bg': '#141418',
  '--slot4-muted-text': 'rgba(255,255,255,0.4)',
  '--slot4-soft-muted-text': 'rgba(255,255,255,0.25)',
  '--slot4-accent': '#c8ff00',
  '--slot4-accent-fill': '#c8ff00',
  '--slot4-accent-soft': 'rgba(200,255,0,0.1)',
  '--slot4-dark-bg': '#141418',
  '--slot4-dark-text': '#e8e8e8',
  '--slot4-media-bg': 'rgba(255,255,255,0.04)',
  '--slot4-cream': '#0b0b0f',
  '--slot4-warm': '#141418',
  '--slot4-lavender': 'rgba(200,255,0,0.1)',
  '--slot4-gray': 'rgba(255,255,255,0.03)',
  '--slot4-body-gradient': 'linear-gradient(180deg, #0b0b0f 0%, #101015 42%, #141418 100%)',
  '--editable-page-bg': '#0b0b0f',
  '--editable-page-text': '#e8e8e8',
  '--editable-border': 'rgba(255,255,255,0.06)',
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
  accentSoftText: 'text-[var(--slot4-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-none',
  shadowStrong: 'shadow-none',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.68))]',
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
    heroTitle: 'text-5xl font-bold leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-4xl font-bold tracking-[-0.03em] sm:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center rounded-full bg-[#c8ff00] px-8 py-3.5 text-sm font-bold text-[#0b0b0f] transition hover:bg-[#b8ef00]',
    secondary: `inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white`,
    accent: 'inline-flex items-center justify-center rounded-full bg-[#c8ff00] px-8 py-3.5 text-sm font-bold text-[#0b0b0f] transition hover:bg-[#b8ef00]',
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep the visual identity close to the dark editorial design: near-black background, chartreuse accent, dotted grid pattern, and restrained footer.',
  'Preserve task-aware links and fetched posts. Use shared helpers instead of hardcoded mock card data.',
  'Use visual variety across cards so homepage, archives, and related sections do not feel repetitive.',
  'Support missing image, summary, and category fields with graceful fallbacks.',
  'Keep layout density balanced on mobile to avoid overflow and oversized gaps.',
] as const
