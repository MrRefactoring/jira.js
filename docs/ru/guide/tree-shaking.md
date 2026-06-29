# Tree-Shaking и оптимизация бандла

`jira.js` собирается с `preserveModules`, объявляет `"sideEffects": false` и поставляет гранулярные
подпутевые экспорты, чтобы бандлер мог выкинуть всё, что вы не импортируете. Особенно важно для браузерных
приложений.

## Подпутевые экспорты

Импортируйте отдельный клиент ресурса вместо всего неймспейса:

```typescript
// Берём только то, что используем
import { BaseClient } from 'jira.js';
import { Issues } from 'jira.js/version3';
```

Доступные подпути: `jira.js/version2`, `jira.js/version3`, `jira.js/agile`, `jira.js/serviceDesk`.

## Типизированные barrel-модули моделей и параметров

Глубокие подпутевые импорты дают типы запросов/ответов без подтягивания рантайм-кода:

```typescript
import type { SearchForIssuesUsingJqlEnhancedSearchPost } from 'jira.js/version3/parameters';
import type { Issue } from 'jira.js/version3/models';
```

Аналоги для `version2`, `agile` и `serviceDesk` работают так же.

> Эти глубокие импорты требуют резолвера, понимающего `exports` (`moduleResolution: "bundler"`, `"node16"`
> или `"nodenext"`). С устаревшим `moduleResolution: "node"` используйте корневой неймспейс:
> `Version3.Version3Parameters.SearchForIssuesUsingJqlEnhancedSearchPost`.

## Кастомный клиент

Для минимально возможного бандла соберите `BaseClient` только с нужными ресурсами вместо полного
`Version3Client`:

```typescript
import { BaseClient } from 'jira.js';
import { Issues } from 'jira.js/version3';

const client = new BaseClient({ host, authentication });
const issues = new Issues(client);

await issues.getIssue({ issueIdOrKey: 'TEST-1' });
```
