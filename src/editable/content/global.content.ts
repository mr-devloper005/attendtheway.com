import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated notes, ideas, and discoveries',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated notes, ideas, and discoveries',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'Br', href: '/sbm' },
      { label: 'Ideas', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse latest', href: '/sbm' },
      secondary: { label: 'Get in touch', href: '/contact' },
    },
  },
  footer: {
    tagline: 'A refined reading and discovery surface.',
    description: 'ATTENDTHEWAY gathers useful reading, public ideas, collections, and visual references into one polished destination.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Bookmarks', href: '/sbm' },
          { label: 'Search', href: '/search' },
          { label: 'About', href: '/about' },
        ],
      },
      {
        title: 'Visit',
        links: [
          { label: 'Contact', href: '/contact' },
          { label: 'Create', href: '/create' },
          { label: 'Login', href: '/login' },
        ],
      },
    ],
    bottomNote: 'Made for calm browsing, quick discovery, and longer reading sessions.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
