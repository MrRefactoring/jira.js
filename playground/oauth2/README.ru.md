> 🌐 [English](README.md) · **Русский**

# Playground OAuth 2.0 (3LO)

Самодостаточный мини-проект, который проходит **полный Atlassian OAuth 2.0 (3LO) flow** с помощью
`jira.js` и печатает ответ Jira. Ты заполняешь минимальный конфиг (`clientId` / `clientSecret` /
`scopes`), запускаешь — и скрипт сам открывает браузер для согласия, ловит редирект, обменивает код
на токены, **резолвит cloudId** и делает запрос `GET /myself`.

Задействует весь публичный OAuth-API библиотеки: `generateAuthorizationUrl`,
`exchangeAuthorizationCode`, `getAccessibleResources`, автоматический резолв cloudId и авто-рефреш
токена (`onTokenRefresh`).

> 🔒 `clientSecret` и refresh — серверная история. `config.ts` лежит в `.gitignore`; не коммить секреты.

## Что понадобится

- Node.js ≥ 20.
- OAuth 2.0 (3LO) приложение в [developer console](https://developer.atlassian.com/console/myapps/).
  Создай его так:
  1. **Create → OAuth 2.0 integration**. Задай имя, выбери **Access type → Resource-level**
     (токен ограничен сайтом, который выберешь при согласии), прими developer terms и нажми **Create**.
  2. **Permissions → Jira API → Add → Configure**. На вкладке **Classic scopes** нажми **Edit Scopes**,
     отметь **View user profiles** (`read:jira-user`) и сохрани. `offline_access` здесь добавлять **не
     нужно** — он запрашивается через authorization URL автоматически.
  3. **Authorization → Add**. В **Callback URLs** впиши `http://localhost:3000/callback` и сохрани.
  4. **Settings** → скопируй **Client ID** и **Secret** (понадобятся для `config.ts`).

  Полный разбор всего flow — см.
  [`../../guides/oauth2-authentication.ru.md`](../../guides/oauth2-authentication.ru.md).

## Запуск

```bash
# 1. Из КОРНЯ репозитория собери библиотеку (playground линкуется на локальную сборку):
cd ../..
pnpm install
pnpm build:src

# 2. Установи зависимости playground:
cd playground/oauth2
npm install

# 3. Заполни конфиг:
cp src/config.example.ts src/config.ts
#   → впиши clientId и clientSecret (scopes/port можно оставить по умолчанию)

# 4. Запусти:
npm start
```

Откроется браузер с экраном согласия Atlassian. Так как приложение **Resource-level**, сначала выбери
сайт в списке **«Choose a site»** (например `your-domain`) — кнопка **Accept** до этого неактивна, —
а затем нажми **Accept**. Вкладка вернётся на `http://localhost:3000/callback`, а в терминале появятся
доступные ресурсы (с `cloudId`) и результат `GET /myself` (displayName, accountId + полный JSON).

## Что показывает скрипт

- **Авто-резолв cloudId.** Клиент создаётся **без `host`** — `jira.js` сам находит cloudId через
  `accessible-resources` и маршрутизирует запросы через `https://api.atlassian.com/ex/jira/{cloudId}`.
- **Авто-рефреш.** При `offline_access` приходит refresh-токен; `onTokenRefresh` вызывается на каждом
  обновлении (Atlassian ротирует refresh-токен — реальное приложение обязано его сохранять).

## Конфигурация

Всё — в `src/config.ts`:

| Поле | Назначение |
| --- | --- |
| `clientId` / `clientSecret` | из developer console |
| `scopes` | запрашиваемые scope; `offline_access` нужен для refresh-токена |
| `port` | порт callback-сервера → `redirect_uri http://localhost:<port>/callback` (должен совпадать с зарегистрированным в console) |

## Вынести проект отдельно

Папка самодостаточна — её можно скопировать куда угодно. Единственное отличие от обычного проекта в
том, что зависимость указывает на локальную сборку этого репозитория:

```jsonc
// сейчас (внутри репозитория):
"jira.js": "file:../.."
// при выносе наружу — поставь опубликованную версию:
"jira.js": "^5.4.0"
```
