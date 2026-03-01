export const languages = {
  en: 'English',
  fr: 'Francais',
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;

export const ui = {
  fr: {
    // Navigation
    'nav.home': 'Cocoweb',
    'nav.about': 'A propos',
    'nav.tags': 'Tags',
    'nav.tips': 'Tips',
    'nav.articles': 'Articles',
    'nav.search': 'Recherche',

    // Post
    'post.sources': 'Sources',
    'post.sources.description':
      'Toutes les news proviennent principalement de mon fil Twitter, mon fil Github, The collective, Michael Thiessen, Michael Hoffmann, Stefan et plus recemment de mon ami Adrien Zaganelli.',
    'post.next': 'Suivant',
    'post.previous': 'Precedent',
    'post.published': 'Publie le',
    'post.translation-notice': '',

    // Tags
    'tags.title': 'Tags',
    'tags.all': 'Tous les tags',
    'tags.posts': 'articles avec le tag',

    // Search
    'search.title': 'Recherche',
    'search.placeholder': 'Rechercher dans le site...',
    'search.no-results': 'Aucun resultat trouve.',

    // 404
    '404.title': 'Page non trouvee',
    '404.description': 'La page que vous recherchez n\'existe pas.',
    '404.back': 'Retour a l\'accueil',

    // Footer
    'footer.copyright': 'cocoweb.fr',
    'footer.webring': 'An IndieWeb Webring 🕸💍',
  },
  en: {
    // Navigation
    'nav.home': 'Cocoweb',
    'nav.about': 'About',
    'nav.tags': 'Tags',
    'nav.tips': 'Tips',
    'nav.articles': 'Articles',
    'nav.search': 'Search',

    // Post
    'post.sources': 'Sources',
    'post.sources.description':
      'Every news are mainly from my Twitter feed, my Github feed, The collective, Michael Thiessen, Michael Hoffmann, Stefan and more recently by my friend Adrien Zaganelli.',
    'post.next': 'Next',
    'post.previous': 'Previous',
    'post.published': 'Published on',
    'post.translation-notice': 'This content is not yet translated. Translation in progress...',

    // Tags
    'tags.title': 'Tags',
    'tags.all': 'All tags',
    'tags.posts': 'posts tagged with',

    // Search
    'search.title': 'Search',
    'search.placeholder': 'Search the site...',
    'search.no-results': 'No results found.',

    // 404
    '404.title': 'Page not found',
    '404.description': 'The page you are looking for does not exist.',
    '404.back': 'Back to home',

    // Footer
    'footer.copyright': 'cocoweb.fr',
    'footer.webring': 'An IndieWeb Webring 🕸💍',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
