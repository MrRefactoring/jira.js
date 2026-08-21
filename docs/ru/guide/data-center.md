# Jira Data Center

С самостоятельно размещённой Jira `jira.js` работает через отдельную поверхность — `createServerClient`. Это не
облачный клиент с другим адресом: Data Center отвечает по `/rest/api/2`, а не `/rest/api/3`, принимает wiki-разметку
там, где облако требует Atlassian Document Format, и опознаёт пользователей по `name` и `key`, а не по `accountId`.
Общий у них только транспорт.

```typescript
import { createServerClient } from 'jira.js';

const jira = createServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'ВАШ_PERSONAL_ACCESS_TOKEN' },
});

const issue = await jira.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
```

Поверхность включает платформенный API, Agile API и эндпоинты сессии одним клиентом: Data Center публикует их
единым документом, поэтому отдельной фабрики для Agile здесь, в отличие от облака, нет.

## Поддерживаемые версии

Сгенерировано из спецификации Jira Data Center 11.3 LTS и работает начиная с **Jira Data Center 10.0**. Между
этими выпусками разница в девять операций из четырёхсот тридцати пяти; у каждой из них в документации стоит
пометка `@since`, а на более старом инстансе такой вызов отвечает 404.

Jira 9.x не поддерживается: Atlassian никогда не публиковала для неё OpenAPI-документ, а вся ветка завершила
жизненный цикл 26 июня 2026 года.

## Аутентификация

::: warning В Jira 11 basic-аутентификация выключена по умолчанию
Jira 11.0 отключила basic-аутентификацию как шаг к её удалению и заодно отклоняет `/rest/auth/1/session`. На
инстансе Jira 11 с настройками по умолчанию **войти можно только персональным токеном**. Вернуть basic может
администратор в разделе **Administration → System → Authentication methods**.
:::

### Персональный токен (PAT)

Механизм, который рекомендует Atlassian; доступен с Jira 8.14 и одинаково работает и на 10.x, и на 11.x. Токен
создаётся в **Profile → Personal Access Tokens**.

```typescript
const jira = createServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'ВАШ_PERSONAL_ACCESS_TOKEN' },
});
```

### Логин и пароль

Обратите внимание: `username`, а не `email`. У локальной учётной записи нет адреса Atlassian, а передача `email`
выбирает облачный вариант той же стратегии.

```typescript
const jira = createServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'basic', username: 'jdoe', password: 'hunter2' },
});
```

### OAuth 2.0

Data Center сам является сервером авторизации: весь поток проходит на вашем инстансе, без `cloudId` и без шлюза
Atlassian. Администратор регистрирует приложение как **incoming application link** и выдаёт client id и secret.

```typescript
import { createServerClient } from 'jira.js';
import { generateServerAuthorizationUrl, exchangeServerAuthorizationCode } from 'jira.js';

const host = 'https://jira.your-company.com';

// 1. Отправляем пользователя сюда.
const url = generateServerAuthorizationUrl({
  host,
  clientId: 'ВАШ_CLIENT_ID',
  scopes: ['READ', 'WRITE'],
  redirectUri: 'https://your-app.example.com/callback',
  state: 'одноразовое-значение-которое-вы-проверите',
});

// 2. Меняем код из callback на токены.
const tokens = await exchangeServerAuthorizationCode({
  host,
  clientId: 'ВАШ_CLIENT_ID',
  clientSecret: 'ВАШ_CLIENT_SECRET',
  code: 'КОД_ИЗ_CALLBACK',
  redirectUri: 'https://your-app.example.com/callback',
});

// 3. Дальше клиент обновляет токен сам.
const jira = createServerClient({
  host,
  auth: {
    type: 'oauth2Server',
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    clientId: 'ВАШ_CLIENT_ID',
    clientSecret: 'ВАШ_CLIENT_SECRET',
    redirectUri: 'https://your-app.example.com/callback',
    expiresAt: Date.now() + tokens.expiresIn * 1000,
    onTokenRefresh: ({ refreshToken }) => save(refreshToken),
  },
});
```

Области доступа — `READ`, `WRITE`, `ADMIN` и `SYSTEM_ADMIN`, каждая включает предыдущие.

`redirectUri` относится к набору для обновления, а не только к первичному обмену: провайдер Data Center проверяет
его и на refresh-гранте, и без него приходит `invalid_grant`, который ничего не объясняет.

## Переход с облака

| | Cloud | Data Center |
| --- | --- | --- |
| Фабрика | `createCloudClient` | `createServerClient` |
| Импорт | `jira.js/cloud` | `jira.js/server` |
| Версия API | `/rest/api/3` | `/rest/api/2` |
| Agile | отдельный `createAgileClient` | в том же клиенте |
| Форматированный текст | Atlassian Document Format | wiki-разметка обычной строкой |
| Идентификация пользователя | `accountId` | `name` и `key` |
| Basic-аутентификация | email + API-токен | логин + пароль |

Поскольку поверхности описывают разные формы данных, их модели невзаимозаменяемы. Импортируйте типы из
`jira.js/server`, а не из `jira.js/cloud`, и учитывайте, что несколько имён — `Issue`, `Project`, `User` —
существуют в обеих с разным набором полей.

## Локальный инстанс

В репозитории есть одноразовый Data Center для собственных живых тестов — самый быстрый способ проверить что-то
на настоящем инстансе:

```bash
pnpm jira-dc:up       # поднять, пройти мастер установки, создать проект
pnpm test:live:server # прогнать сюиты Data Center против него
pnpm jira-dc:down     # остановить и удалить данные
```

Запускается Jira 10.3 LTS с трёхчасовой timebomb-лицензией, которую Atlassian публикует для тестирования;
холодный старт занимает несколько минут. Чтобы проверить на самом свежем выпуске, задайте `JIRA_DC_VERSION=11.3`
— но помните, что там выключена basic-аутентификация, и сюитам понадобится `JIRA_SERVER_PAT`.
