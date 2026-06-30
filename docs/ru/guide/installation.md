# Установка

`jira.js` поставляется двойной сборкой **ESM + CommonJS** со встроенными определениями типов TypeScript.
Цель — современный Node.js (**≥ 20**) и современные браузеры.

## Менеджеры пакетов

```bash
# npm
npm install jira.js

# yarn
yarn add jira.js

# pnpm
pnpm add jira.js
```

## Импорт

ESM / TypeScript:

```typescript
import { Version3Client } from 'jira.js';
```

CommonJS:

```javascript
const { Version3Client } = require('jira.js');
```

Пакет предоставляет подпутевые экспорты по неймспейсам (`jira.js/version3`, `jira.js/agile`, …) и
типизированные barrel-модули `models`/`parameters` (`jira.js/version3/models`, `jira.js/version3/parameters`,
…) для tree-shakable импортов — см. [Tree-Shaking](./tree-shaking).

## Использование в браузере

`jira.js` работает в браузере, но прямые вызовы Jira из браузера обычно блокируются CORS и раскрывают
учётные данные. Используйте библиотеку на бэкенде или проксируйте запросы через свой сервер.
