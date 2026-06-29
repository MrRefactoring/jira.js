import { defineConfig } from 'vitepress';
import typedocSidebar from '../api/typedoc-sidebar.json' with { type: 'json' };

// Origin only — the project path lives in BASE. Combined as `SITE_URL + BASE`
// (e.g. canonical/og:url/sitemap) and `SITE_URL + BASE.slice(0, -1)` for assets.
const SITE_URL = 'https://mrrefactoring.github.io';
const BASE = '/jira.js/';
const SITE_TITLE = 'jira.js';
const SITE_TAGLINE = 'Jira REST API client for Node.js, TypeScript & browsers';
const SITE_DESCRIPTION_EN =
  'Modern Jira REST API client for JavaScript and TypeScript — Jira Cloud v2/v3, Agile, and Service Desk APIs. ESM + CommonJS, fully typed, tree-shakable.';
const SITE_DESCRIPTION_RU =
  'Современный клиент Jira REST API для JavaScript и TypeScript — Jira Cloud v2/v3, Agile и Service Desk. ESM + CommonJS, строгая типизация, tree-shaking.';
const OG_IMAGE = `${SITE_URL}${BASE.slice(0, -1)}/og-image.png`;

// Guide taxonomy. Recipes and the longer-tail guides are added here as their
// pages are authored — keep this in sync with the files under docs/guide.
const guideSidebar = (prefix = '') => [
  {
    text: prefix ? 'Руководство' : 'Guide',
    items: [
      { text: prefix ? 'Быстрый старт' : 'Getting Started', link: `${prefix}/guide/getting-started` },
      { text: prefix ? 'Установка' : 'Installation', link: `${prefix}/guide/installation` },
      { text: prefix ? 'Аутентификация' : 'Authentication', link: `${prefix}/guide/authentication` },
      { text: 'OAuth 2.0 (3LO)', link: `${prefix}/guide/oauth2-authentication` },
      { text: prefix ? 'JWT (Connect)' : 'JWT (Atlassian Connect)', link: `${prefix}/guide/jwt-authentication` },
      { text: prefix ? 'Обработка ошибок' : 'Error Handling', link: `${prefix}/guide/error-handling` },
      { text: 'Tree-Shaking', link: `${prefix}/guide/tree-shaking` },
    ],
  },
];

// Shared, trimmed API reference sidebar (English-only; both locales reuse the
// same /api/ pages — see scripts/trim-api-sidebar.ts).
const apiSidebar = [{ text: 'API Reference', items: typedocSidebar }];

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION_EN,
  base: BASE,
  cleanUrls: true,
  // `lastUpdated` spawns `git log` per page; at ~6.6k generated API pages this
  // exhausts the OS process table (`spawn git EAGAIN`). Disabled at this scale —
  // the auto-generated API pages regenerate every build anyway.
  lastUpdated: false,
  // jira's JSDoc is swagger-derived and contains many unresolved {@link} refs;
  // VitePress would otherwise fail the build on these.
  ignoreDeadLinks: true,

  sitemap: {
    hostname: SITE_URL + BASE,
  },

  head: [
    // First-visit locale auto-detect: redirect ru-language visitors to /ru/ once
    // (respecting any stored choice). Runs synchronously to avoid an EN flash.
    [
      'script',
      {},
      `(function(){try{var K='jira-js:locale',B='${BASE}',p=location.pathname,isRu=p.indexOf(B+'ru/')===0||p===B+'ru'||p===B+'ru/';var s=localStorage.getItem(K);if(s)return;if(isRu){localStorage.setItem(K,'ru');return;}var L=(navigator.language||'').toLowerCase();if(L.indexOf('ru')===0&&p.indexOf(B)===0){localStorage.setItem(K,'ru');location.replace(p.replace(B,B+'ru/')+location.search+location.hash);}else{localStorage.setItem(K,'en');}}catch(e){}})();`,
    ],
    ['link', { rel: 'icon', href: `${BASE}favicon.svg`, type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#0052CC' }],
    ['meta', { name: 'author', content: 'Vladislav Tupikin' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:title', content: `${SITE_TITLE} — ${SITE_TAGLINE}` }],
    ['meta', { property: 'og:description', content: SITE_DESCRIPTION_EN }],
    ['meta', { property: 'og:url', content: SITE_URL + BASE }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:alt', content: `${SITE_TITLE} — ${SITE_TAGLINE}` }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: `${SITE_TITLE} — ${SITE_TAGLINE}` }],
    ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION_EN }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],

    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: SITE_TITLE,
        description: SITE_DESCRIPTION_EN,
        codeRepository: 'https://github.com/MrRefactoring/jira.js',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Node.js',
        license: 'https://opensource.org/licenses/MIT',
        author: { '@type': 'Person', name: 'Vladislav Tupikin' },
        keywords:
          'jira, jira api, jira cloud, jira rest api, jira agile, jira service desk, atlassian, typescript, javascript, nodejs, api client',
        url: SITE_URL + BASE,
      }),
    ],
  ],

  transformHead: ({ pageData }) => {
    const head: [string, Record<string, string>][] = [];

    const relativePath = pageData.relativePath
      .replace(/\.md$/, '')
      .replace(/(^|\/)index$/, '$1')
      .replace(/\/$/, '');

    const isRu = relativePath === 'ru' || relativePath.startsWith('ru/');
    const enRelative = isRu ? relativePath.replace(/^ru\/?/, '') : relativePath;
    const ruRelative = isRu ? relativePath : relativePath ? `ru/${relativePath}` : 'ru';

    const url = (p: string) => `${SITE_URL}${BASE}${p ? p + '/' : ''}`.replace(/\/+$/, '/');

    head.push(['link', { rel: 'canonical', href: url(relativePath) }]);

    // The API reference is English-only — both locales share the same /api/ pages
    // (there is no /ru/api/). So API pages get no ru alternate; only the localized
    // guide/landing pages have a real RU counterpart.
    const apiOnly = enRelative === 'api' || enRelative.startsWith('api/');
    head.push(['link', { rel: 'alternate', hreflang: 'en', href: url(enRelative) }]);
    if (!apiOnly) {
      head.push(['link', { rel: 'alternate', hreflang: 'ru', href: url(ruRelative) }]);
    }
    head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: url(enRelative) }]);

    return head;
  },

  themeConfig: {
    logo: '/logo.svg',
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MrRefactoring/jira.js' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/jira.js' },
    ],
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: SITE_DESCRIPTION_EN,
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'API', link: '/api/' },
        ],
        sidebar: {
          '/guide/': guideSidebar(),
          '/api/': apiSidebar,
        },
        editLink: {
          pattern: 'https://github.com/MrRefactoring/jira.js/edit/master/docs/:path',
          text: 'Edit this page on GitHub',
        },
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
      },
    },
    ru: {
      label: 'Русский',
      lang: 'ru-RU',
      link: '/ru/',
      description: SITE_DESCRIPTION_RU,
      themeConfig: {
        nav: [
          { text: 'Руководство', link: '/ru/guide/getting-started' },
          { text: 'API', link: '/api/' },
        ],
        sidebar: {
          '/ru/guide/': guideSidebar('/ru'),
          '/api/': apiSidebar,
        },
        editLink: {
          pattern: 'https://github.com/MrRefactoring/jira.js/edit/master/docs/:path',
          text: 'Редактировать на GitHub',
        },
        outline: { label: 'На этой странице', level: [2, 3] },
        docFooter: { prev: 'Назад', next: 'Далее' },
      },
    },
  },
});
