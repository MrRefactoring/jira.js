
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
      }
      originalOnAfter?.(to);
    };
  },
} satisfies Theme;
