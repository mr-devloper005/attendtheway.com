import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Ideas, reading, and curated discoveries',
      description: 'Explore thoughtful posts, saved finds, and public-interest resources in a polished editorial setting.',
      openGraphTitle: 'Ideas, reading, and curated discoveries',
      openGraphDescription: 'A curated home for thoughtful posts, saved finds, and public-interest resources.',
      keywords: ['editorial site', 'curated ideas', 'social bookmarks', 'public discoveries'],
    },
    hero: {
      badge: '',
      title: ['Quit the clutter.', 'Try a calmer way to explore.'],
      description: 'Discover notes, reading, visual references, and saved links through a clean editorial homepage built for easy scrolling.',
      primaryCta: { label: 'Who We Are', href: '/about' },
      secondaryCta: { label: 'Explore More', href: '/sbm' },
      searchPlaceholder: 'Search posts, ideas, categories, and saved links',
      focusLabel: 'Focus',
      featureCardBadge: 'editor selection',
      featureCardTitle: 'A homepage that feels curated instead of crowded.',
      featureCardDescription: 'Recent posts, visual stories, and saved links stay easy to scan with a strong reading rhythm.',
    },
    intro: {
      badge: 'Welcome',
      title: 'A modern reading room for ideas that deserve a second look.',
      paragraphs: [
        'The site brings together saved links, article-style pages, images, and references in a format that feels steady and readable.',
        'Instead of treating every post like the same card, the layout changes its rhythm to match the content and keep exploration interesting.',
        'The result is a public-facing website that feels polished, airy, and intentionally edited.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reference-inspired editorial layout with bold hero structure.',
        'Multiple card styles for featured stories, compact picks, and image-first posts.',
        'Safe rendering for missing categories, images, and summaries.',
        'Responsive sections that stay balanced from mobile to desktop.',
      ],
      primaryLink: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryLink: { label: 'Explore search', href: '/search' },
    },

    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About',
    title: 'A quieter place for useful public reading.',
    description: `${slot4BrandConfig.siteName} is designed to present saved discoveries, editorial posts, and helpful references with stronger pacing and a more memorable visual system.`,
    paragraphs: [
      'Every section keeps the original feed logic intact while presenting it through a more polished editorial lens.',
      'The site is built to feel readable first, with clean navigation, spacious cards, and a calmer relationship between text and imagery.',
    ],
    values: [
      {
        title: 'Editorial clarity',
        description: 'Clear hierarchy helps people move through the site naturally, whether they arrive for one post or an afternoon of browsing.',
      },
      {
        title: 'Curated rhythm',
        description: 'Different card styles and section layouts make each stretch of the page feel intentional instead of repetitive.',
      },
      {
        title: 'Open discovery',
        description: 'Posts, references, and profiles remain easy to reach, easy to skim, and easy to revisit.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Share an idea, a question, or a publishing request.',
    description: 'Use the contact page for submissions, partnership questions, or general notes. The experience stays simple, direct, and public-friendly.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search reading, saved links, categories, and public posts across the site.',
    },
    hero: {
      badge: 'Search the site',
      title: 'Find ideas, bookmarks, and posts without the noise.',
      description: 'Use a keyword, category, or content type to jump straight into the part of the archive you want.',
      placeholder: 'Search by title, keyword, category, or tag',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to open the publishing desk.',
      description: 'Account access keeps the creation tools ready for contributors while leaving the public site clean and focused.',
    },
    hero: {
      badge: 'Publishing desk',
      title: 'Create content that fits the site’s editorial rhythm.',
      description: 'Choose a content type, add your headline and details, then save a draft that is ready for the next publishing step.',
    },
    formTitle: 'Content details',
    submitLabel: 'Save draft',
    successTitle: 'Draft saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Return to your reading and publishing space.',
      description: 'Login to manage saved drafts, continue browsing, and open the contributor workspace.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create one first, then try again.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Open your account and start publishing.',
      description: 'Create an account to save your details, access the publishing desk, and keep your browsing connected.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
