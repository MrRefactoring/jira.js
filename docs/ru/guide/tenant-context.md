# Контекст тенанта

У сайта три имени, и какое именно нужно — зависит от API.

| | что адресует | кто спрашивает |
|---|---|---|
| `hostName` | адрес сайта без схемы | вы, когда настраиваете клиент |
| `cloudId` | сам сайт | `api.atlassian.com/ex/jira/{cloudId}`, приложения Connect и Forge |
| `orgId` | организацию, которой принадлежит сайт | [Teams API](./teams) |

Меньше всего шансов, что у вас уже есть `orgId`: он называет не ваш сайт, а уровень над ним — одну организацию могут
делить несколько сайтов. REST-эндпоинта ни для одного из трёх имён Atlassian не публикует. `getTenantContext`
спрашивает GraphQL-шлюз — задокументированный способ это узнать.

```typescript
import { createClient, getTenantContext } from 'jira.js/core';

const client = createClient({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'you@example.com', apiToken: 'ВАШ_API_ТОКЕН' },
});

const { cloudId, orgId, hostName } = await getTenantContext(client);
```

Функция принимает уже собранный клиент, поэтому запрос наследует его прокси, политику ретраев и ваш `fetch`. Если
клиента ещё нет, подойдёт и конфигурация:

```typescript
const { orgId } = await getTenantContext({ host, auth });
```

Ни одно из трёх имён не меняется за время жизни сайта. Запросите их один раз при старте и держите ответ — спрашивать
заново на каждый запрос незачем.

## Где это не работает

**Под OAuth 2.0 (3LO).** Шлюз отвечает на хосте вашего сайта, а у 3LO-клиента фиксированного хоста нет: он выводит его
на каждый запрос из ресурсов, доступных токену. Вместо того чтобы отправить запрос наугад, `getTenantContext` бросает
`ConfigError`. Под 3LO `cloudId` у вас и так есть — именно по нему клиент маршрутизирует, — а `orgId` этим путём не
достаётся вовсе.

**На Data Center.** Самостоятельно размещённый инстанс не входит в организацию Atlassian и шлюза не обслуживает. Вызов
отвечает там 404.

## Обработка ошибок

Шлюз сообщает о своих проблемах в теле ответа `200`, поэтому функция читает их и бросает исключение, а не возвращает
пустой результат:

```typescript
import { isConfigError, isNotFoundError, isApiError } from 'jira.js/core';

try {
  const { orgId } = await getTenantContext(client);
} catch (error) {
  if (isConfigError(error)) {
    // Спрашивать не о чем — клиент под OAuth 2.0 или написанный вручную.
  } else if (isNotFoundError(error)) {
    // Atlassian не знает такого сайта.
  } else if (isApiError(error)) {
    // Шлюз отказал; в `error.status` тот статус, который он назвал, а не 200, которым ответил.
  }
}
```
