# Аутентификация OAuth 2.0 (3LO)

`jira.js` поддерживает полный поток authorization-code в **OAuth 2.0 (3LO)** от Atlassian: библиотека
предоставляет stateless-хелперы для управления потоком согласия в браузере, а также самообновляющийся
клиент, который поддерживает access-токен актуальным, прозрачно обрабатывает **ротируемый refresh-токен**
и резолвит `cloudId`, чтобы запросы шли через API-шлюз Atlassian.

> ⚠️ **`clientSecret` и обновление токена — только на стороне сервера.** Никогда не передавайте client
> secret или refresh-токен в браузер. Простой режим `{ accessToken }` (без обновления) — единственная
> часть, безопасная для браузера, и даже в этом случае токен является учётными данными пользователя.

> 🧪 **Хотите попробовать прямо сейчас?** В репозитории есть готовый к запуску playground в
> [`playground/oauth2/`](https://github.com/MrRefactoring/jira.js/tree/master/playground/oauth2): впишите `clientId`/`clientSecret`, запустите `npm start`,
> и он проведёт весь браузерный поток и выведет ответ Jira за вас.

## Когда какой метод аутентификации использовать

| Метод                     | Действует как    | Где                                                   | Когда использовать                                                         |
|---------------------------|------------------|-------------------------------------------------------|----------------------------------------------------------------------------|
| Basic (email + API-токен) | пользователь     | сервер                                                | быстрые скрипты, персональная автоматизация                                |
| **OAuth 2.0 (3LO)**       | **пользователь** | **сервер (обновление) / браузер (статический токен)** | действия от имени конечных пользователей; многопользовательские приложения |
| JWT (Connect)             | приложение       | только сервер                                         | существующие установки приложений Atlassian Connect                        |

## Как это работает

1. Вы перенаправляете пользователя на экран согласия Atlassian (`generateAuthorizationUrl`). Включите
   `offline_access` в scopes, чтобы получить **refresh-токен**.
2. Atlassian перенаправляет обратно на ваш callback с одноразовым `code`. Вы обмениваете его на токены
   (`exchangeAuthorizationCode`) → `accessToken`, `refreshToken`, `expiresIn`.
3. Вы создаёте клиент `jira.js` с этими токенами плюс вашими client id/secret. С этого момента клиент:
   - **автоматически обновляет** access-токен незадолго до его истечения и снова, если запрос вернул
     `401`;
   - **ротирует** refresh-токен — Atlassian возвращает новый refresh-токен при каждом обновлении и
     аннулирует старый — и вызывает ваш `onTokenRefresh`, чтобы вы могли его сохранить;
   - **резолвит `cloudId`** из `accessible-resources` и направляет запросы через
     `https://api.atlassian.com/ex/jira/{cloudId}` (3LO-токены **не** работают против
     `your-domain.atlassian.net`).

## Предварительные требования

- Приложение OAuth 2.0 (3LO) в [консоли разработчика](https://developer.atlassian.com/console/myapps/).
- Node.js ≥ 20 и `jira.js` ≥ 5.4.0.
- Серверный эндпоинт для приёма OAuth-callback (redirect URL, который вы регистрируете ниже).

---

## Шаг 1 — Создание OAuth 2.0 (3LO) приложения

В [консоли разработчика](https://developer.atlassian.com/console/myapps/):

1. **Create** → **OAuth 2.0 integration**. Дайте приложению имя, выберите **Access type**
   (**Resource-level** ограничивает токен одним сайтом, который пользователь выбирает при согласии;
   **Account-level** даёт доступ ко всем сайтам в аккаунте), примите условия разработчика и нажмите **Create**.
2. В разделе **Permissions** добавьте **Jira API** → **Configure**. На вкладке **Classic scopes** нажмите
   **Edit Scopes** и выберите нужные scopes (например, `read:jira-user`, `read:jira-work`,
   `write:jira-work`), затем сохраните. Чтобы получить refresh-токен, вы также должны запросить `offline_access` — он
   добавляется через authorization URL (см. Шаг 2), а **не** здесь.
3. В разделе **Authorization** укажите **Callback URL** на redirect-эндпоинт вашего сервера,
   например `https://app.example.com/oauth/callback`.
4. В разделе **Settings** скопируйте **Client ID** и **Secret**.

> При **Resource-level** приложении на экране согласия отображается выбор **Choose a site** — пользователь
> должен выбрать сайт, прежде чем станет активной кнопка **Accept**. Полученный токен затем достигает только
> этого сайта (именно это возвращает `getAccessibleResources` / автоматический резолвинг `cloudId`).

## Шаг 2 — Перенаправление пользователя на согласие

Сгенерируйте authorization URL и перенаправьте пользователя. Всегда передавайте случайный `state` и
проверяйте его на callback (защита от CSRF). Включите `offline_access`, чтобы получить refresh-токен.

```ts
import express from 'express';
import { generateAuthorizationUrl } from 'jira.js';

const app = express();

app.get('/oauth/login', (req, res) => {
  const state = crypto.randomUUID();
  // сохраните `state` для сессии пользователя, чтобы проверить его на callback

  const url = generateAuthorizationUrl({
    clientId: process.env.OAUTH_CLIENT_ID!,
    scopes: ['read:jira-work', 'write:jira-work', 'offline_access'],
    redirectUri: 'https://app.example.com/oauth/callback',
    state,
  });

  res.redirect(url);
});
```

## Шаг 3 — Обработка callback и сохранение токенов

```ts
import { exchangeAuthorizationCode } from 'jira.js';

app.get('/oauth/callback', async (req, res) => {
  const { code, state } = req.query as { code: string; state: string };
  // проверьте, что `state` совпадает с тем, что вы сохранили, затем:

  const tokens = await exchangeAuthorizationCode({
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    code,
    redirectUri: 'https://app.example.com/oauth/callback',
  });

  await saveTokens(req.user.id, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken, // присутствует, потому что мы запросили offline_access
    expiresAt: Date.now() + tokens.expiresIn * 1000,
  });

  res.redirect('/');
});
```

## Шаг 4 — Создание клиента с авто-обновлением + авто-cloudId

Передайте сохранённые токены плюс ваши client id/secret. Без `host` клиент резолвит `cloudId`
автоматически; передайте `siteUrl` или `cloudId`, чтобы зафиксировать конкретный сайт (рекомендуется для
пользователей с несколькими сайтами). `onTokenRefresh` вызывается после каждого обновления — сохраняйте
ротированные значения.

```ts
import { Version3Client } from 'jira.js';

const stored = await loadTokens(userId);

const client = new Version3Client({
  // без `host`: cloudId резолвится через accessible-resources; либо задайте `siteUrl`/`cloudId` ниже
  authentication: {
    oauth2: {
      accessToken: stored.accessToken,
      refreshToken: stored.refreshToken,
      clientId: process.env.OAUTH_CLIENT_ID!,
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
      expiresAt: stored.expiresAt, // epoch ms; позволяет клиенту обновлять токен проактивно
      // siteUrl: 'https://your-domain.atlassian.net', // опционально: уточнить сайт
      // cloudId: 'xxxxxxxx-....',                      // опционально: пропустить поиск через accessible-resources
      onTokenRefresh: async ({ accessToken, refreshToken, expiresAt }) => {
        // ВАЖНО: сохраните ротированные токены; предыдущий refresh-токен теперь недействителен
        await saveTokens(userId, { accessToken, refreshToken, expiresAt });
      },
    },
  },
});
```

## Шаг 5 — Выполнение запросов

```ts
const me = await client.myself.getCurrentUser();
console.log(me.displayName); // 200 означает, что OAuth 2.0 работает
```

Каждый запрос получает валидный bearer-токен (обновлённый при необходимости) и направляется на
`https://api.atlassian.com/ex/jira/{cloudId}`.

## Ротируемые refresh-токены (обязательно к прочтению)

Atlassian использует **ротируемые** refresh-токены:

- Каждое обновление возвращает **новый** refresh-токен и **аннулирует** тот, который вы использовали.
- `jira.js` отдаёт новый токен через `onTokenRefresh` — вы **обязаны** его сохранить, иначе при следующем
  запуске процесса будет использован недействительный токен, и произойдёт сбой.
- Refresh-токен имеет срок истечения по **90-дневной неактивности**, который сбрасывается при каждом
  использовании, и **10-минутный люфт повторного использования**, который сглаживает кратковременную
  конкурентность.

`jira.js` объединяет конкурентные обновления в один сетевой вызов (single-flight, т.е. один общий запрос),
так что всплеск запросов ротирует токен ровно один раз.

## Самостоятельное определение cloudId (опционально)

Если вы предпочитаете резолвить и хранить cloudId отдельно:

```ts
import { getAccessibleResources } from 'jira.js';

const resources = await getAccessibleResources(accessToken);
// resources[].id — это cloudId; сопоставьте resources[].url с вашим сайтом
```

## Ручное обновление токенов (опционально)

Клиент обновляет токены автоматически, но хелпер экспортируется на случай, если он вам понадобится
(например, для фоновой задачи). Не забудьте сохранить ротированный `refreshToken`.

```ts
import { refreshOAuth2Token } from 'jira.js';

const next = await refreshOAuth2Token({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  refreshToken: stored.refreshToken,
});
await saveTokens(userId, {
  accessToken: next.accessToken,
  refreshToken: next.refreshToken,
  expiresAt: Date.now() + next.expiresIn * 1000,
});
```

## Устранение неполадок

- **`refreshToken` не возвращён** — вы не запросили `offline_access` в scopes. Добавьте его и
  пройдите согласие заново.
- **401 после обновления** — неверный client secret, либо grant был отозван / refresh-токен уже
  ротирован (потеряно сохранение обновления). Повторите поток согласия.
- **`Multiple accessible Jira resources found`** — токен может достигать более одного сайта. Передайте
  `siteUrl` или `cloudId`.
- **Запросы к `your-domain.atlassian.net` падают с 401** — 3LO-токены работают только через
  шлюз. Позвольте клиенту маршрутизировать автоматически (опустите `host`) или задайте `cloudId`/`siteUrl`.
- **`invalid_grant` при обновлении** — refresh-токен истёк (90-дневная неактивность) или не был
  последним ротированным значением. Авторизуйтесь заново.

## Чек-лист по безопасности

- Никогда не раскрывайте `clientSecret` или refresh-токены браузеру и не коммитьте их в систему контроля версий.
- Сохраняйте ротированные токены **атомарно** внутри `onTokenRefresh` (last write wins).
- Храните токены зашифрованными в покое, с ключом на каждого пользователя.
- Всегда проверяйте параметр `state` на callback.

## Справочные ссылки

| Тема                                       | Ссылка                                                                                                                                   |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Приложения OAuth 2.0 (3LO)                 | [OAuth 2.0 (3LO) apps](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/)                                            |
| Консоль разработчика (создание приложения) | [developer.atlassian.com/console/myapps](https://developer.atlassian.com/console/myapps/)                                                |
| Scopes                                     | [OAuth 2.0 scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3lo-and-forge-apps/)                           |
| Доступные ресурсы / cloudId                | [Get accessible resources](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#3-1-get-the-cloudid-for-your-jira-site) |
