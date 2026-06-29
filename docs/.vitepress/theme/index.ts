// Extends the VitePress default theme with locale persistence. The first-visit
// redirect itself runs from an inline <head> script (see config.ts) to avoid an
// EN flash; this module only keeps the stored locale in sync on SPA navigation
// (language-switcher clicks and internal links).

import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { inBrowser } from 'vitepress';

const STORAGE_KEY = 'jira-js:locale';
const BASE = '/jira.js/';

function localeFromPath(path: string): 'en' | 'ru' {
  return path.startsWith(BASE + 'ru/') || path === BASE + 'ru' || path === BASE + 'ru/' ? 'ru' : 'en';
}

export default {
  extends: DefaultTheme,

  enhanceApp({ router }) {
    if (!inBrowser) return;

    const originalOnAfter = router.onAfterRouteChange;
    router.onAfterRouteChange = (to: string) => {
      try {
        localStorage.setItem(STORAGE_KEY, localeFromPath(to));
      } catch {
        // localStorage unavailable — ignore
      }
      originalOnAfter?.(to);
    };
  },
} satisfies Theme;
