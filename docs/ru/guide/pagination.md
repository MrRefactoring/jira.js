# Пагинация

`paginate` выдаёт отдельные элементы через `for await`. Он запрашивает одну страницу за раз и загружает следующую после чтения текущей. Выход через `break` завершает обход без запроса следующей страницы.

Импортируйте helper из `jira.js` или `jira.js/core`. Существующие endpoint-методы по-прежнему возвращают одну страницу.

## Пагинация со смещением

```typescript
import { createCloudClient, paginate } from 'jira.js';

const jira = createCloudClient({ host, auth });
const labels = paginate({
  initialParameters: { startAt: 0, maxResults: 50 },
  fetchPage: jira.labels.getAllLabels,
  getItems: page => page.values ?? [],
  getNextParameters: (page, parameters) =>
    page.isLast || !page.values?.length
      ? undefined
      : { ...parameters, startAt: (page.startAt ?? parameters.startAt) + page.values.length },
});

for await (const label of labels) {
  console.log(label);
}
```

`initialParameters` передаётся в первый запрос. `getItems` выбирает элементы ответа. `getNextParameters` возвращает параметры следующего запроса или `undefined` для завершения. Helper не изменяет переданные параметры.

Условие завершения задаёт адаптер конкретного API. Короткая или пустая страница может содержать токен продолжения, поэтому `paginate` не определяет конец по длине страницы.

## Пагинация с токеном

```typescript
import { createCloudClient, paginate } from 'jira.js';
import type { SearchIssues } from 'jira.js/cloud/parameters';

const jira = createCloudClient({ host, auth });
const initialParameters: SearchIssues = { jql: 'project = EXAMPLE', maxResults: 50 };

for await (const issue of paginate({
  initialParameters,
  fetchPage: jira.issueSearch.searchIssues,
  getItems: page => page.issues ?? [],
  getNextParameters: (page, parameters) =>
    page.nextPageToken ? { ...parameters, nextPageToken: page.nextPageToken } : undefined,
})) {
  console.log(issue.id);
}
```

## Отмена и ошибки

Передайте `signal: controller.signal` в параметры `paginate`, чтобы каждый вызов endpoint получил `AbortSignal`. Сигнал проверяется и между элементами текущей страницы. При отмене выбрасывается исходная причина прерывания.

Ошибки endpoint и адаптеров передаются вызывающему коду без изменений. Повторные попытки выполняет клиент согласно своей настройке. `fetchPage` получает текущие параметры и второй аргумент `RequestOptions`; собственная обёртка должна передать этот аргумент в endpoint, чтобы отмена работала во время запроса.
