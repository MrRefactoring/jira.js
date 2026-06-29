# JWT-аутентификация для приложений Atlassian Connect

`jira.js` может аутентифицироваться как **приложение Atlassian Connect**, используя
JWT, формируемый для каждого запроса и подписанный общим секретом вашего приложения.
Это правильный выбор, когда вы создаёте интеграцию, которая действует **от имени самого
приложения** (доступ на уровне приложения ко всему сайту Jira), а не от имени отдельного
пользователя.

> ⚠️ **Только на стороне сервера.** JWT-аутентификация использует `sharedSecret` вашего
> приложения — учётные данные тенанта. Их **никогда** нельзя передавать в браузер или
> использовать в нём. Для браузерных/пользовательских сценариев применяйте Basic или
> OAuth 2.0.

> 🛑 **Atlassian Connect выводится из эксплуатации — окончание поддержки в IV квартале 2026.**
> С 2026 года **новые** приватные приложения Connect **больше нельзя** установить по URL
> дескриптора приложения; приватные приложения устанавливаются только через **установочные
> ссылки Forge**. **Существующие** установки приложений Connect пока продолжают работать, и
> JWT-аутентификация в `jira.js` остаётся способом обращаться к Jira из них. **Это руководство
> предназначено в первую очередь для сопровождающих существующих приложений Connect.** Для
> совершенно новых интеграций предпочитайте [Forge](https://developer.atlassian.com/platform/forge/)
> или OAuth 2.0. См.
> [график окончания поддержки Connect](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps)
> от Atlassian и [руководство по миграции Connect→Forge](https://developer.atlassian.com/platform/adopting-forge-from-connect/connect-to-forge-migration-module/).

## Когда какой метод аутентификации использовать

| Метод | Действует как | Где | Когда использовать |
| --- | --- | --- | --- |
| Basic (email + API-токен) | пользователь | сервер | быстрые скрипты, личная автоматизация |
| OAuth 2.0 (3LO) | пользователь | сервер/браузер | действия от имени конечных пользователей |
| **JWT (Connect)** | **приложение** | **только сервер** | интеграция приложения на уровне всего сайта, без привязки к пользователю |

## Как это работает

1. Вы публикуете небольшой **дескриптор приложения Connect** (`atlassian-connect.json`),
   в котором объявлено `"authentication": { "type": "jwt" }`.
2. Когда администратор устанавливает ваше приложение на сайт Jira, Jira выполняет
   **установочное рукопожатие**: она отправляет POST-запрос с событием жизненного цикла
   `installed` вашему приложению, содержащий `sharedSecret`, а также `clientKey` и `baseUrl`
   сайта. Вы сохраняете их для каждого тенанта.
3. Для каждого исходящего REST-вызова `jira.js` генерирует короткоживущий **HS256 JWT**,
   подписанный этим `sharedSecret`. Токен включает хеш строки запроса (`qsh`), привязанный
   к методу и URL запроса, поэтому токен нельзя повторно использовать для другого эндпоинта.

> **Направление имеет значение (клейм `iss`).** Для **исходящих** вызовов (приложение → Jira,
> то, что делает `jira.js`) издатель JWT `iss` — это **ключ вашего приложения**, то есть `key`
> из вашего дескриптора. (Для обратного направления, входящих запросов от Jira к вашему
> приложению, Jira устанавливает `iss` равным `clientKey`. Не путайте эти два значения.)

## Предварительные требования

- Сайт Jira Cloud, где вы являетесь **администратором**
  ([создать бесплатный сайт](https://www.atlassian.com/software/jira/free); управление сайтами —
  на [admin.atlassian.com](https://admin.atlassian.com/)).
- Node.js ≥ 20 и `jira.js` ≥ 5.4.0.
- Публично доступный **HTTPS**-эндпоинт для размещения дескриптора и колбэков жизненного цикла.
  Для локальной разработки используйте туннель, например [ngrok](https://ngrok.com/). Дескриптор
  должен обслуживаться на порту **80, 443 или 8080**.

---

## Шаг 1 — Создайте дескриптор приложения

Создайте `atlassian-connect.json`. Для серверной интеграции, которая только вызывает REST API,
нужно совсем немного — `key`, HTTPS-`baseUrl`, аутентификация `jwt`, scopes и колбэки
жизненного цикла. Полный справочник по полям:
[дескриптор приложения Connect](https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/).

```json
{
  "key": "my-backend-integration",
  "name": "My Backend Integration",
  "description": "Server-side integration using jira.js",
  "baseUrl": "https://YOUR-PUBLIC-HTTPS-HOST",
  "vendor": { "name": "My Company", "url": "https://example.com" },
  "authentication": { "type": "jwt" },
  "scopes": ["READ", "WRITE"],
  "lifecycle": {
    "installed": "/installed",
    "uninstalled": "/uninstalled"
  },
  "apiVersion": 1
}
```

- `key` должен быть уникальным и не длиннее 64 символов. **Это значение и есть ваш `issuer`
  в `jira.js`.**
- `scopes` должны покрывать всё, что делает ваша интеграция. Доступные значения: `NONE`, `READ`,
  `WRITE`, `DELETE`, `PROJECT_ADMIN`, `ADMIN`, `ACT_AS_USER`, `ACCESS_EMAIL_ADDRESSES` — см.
  [справочник по scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-connect-apps/).
- `baseUrl` должен быть HTTPS — это адрес, на который Jira отправляет колбэки жизненного цикла.

## Шаг 2 — Реализуйте эндпоинты жизненного цикла

Во время рукопожатия Jira отправляет POST-запрос с JSON на ваш URL `installed`. Полезная
нагрузка включает:

```json
{
  "key": "my-backend-integration",
  "clientKey": "unique-tenant-id",
  "sharedSecret": "DO-NOT-LOG-OR-EXPOSE-THIS",
  "baseUrl": "https://your-domain.atlassian.net",
  "displayUrl": "https://your-domain.atlassian.net",
  "productType": "jira",
  "eventType": "installed"
}
```

Сохраняйте `clientKey`, `sharedSecret` и `baseUrl` **для каждого тенанта** (например, в базе
данных). `sharedSecret` — это учётные данные, которыми `jira.js` будет подписывать токены;
обращайтесь с ним как с паролем.

Минимальный пример на Express:

```ts
import express from 'express';

const app = express();
app.use(express.json());

// Храните это безопасно (зашифрованным в состоянии покоя). Map в памяти показан лишь для краткости.
const tenants = new Map<string, { sharedSecret: string; baseUrl: string }>();

app.post('/installed', (req, res) => {
  const { clientKey, sharedSecret, baseUrl } = req.body;
  tenants.set(clientKey, { sharedSecret, baseUrl });
  res.sendStatus(204);
});

app.post('/uninstalled', (req, res) => {
  tenants.delete(req.body.clientKey);
  res.sendStatus(204);
});

app.listen(8080);
```

> 🔐 **Рекомендуется:** проверяйте JWT в колбэке `installed`, прежде чем ему доверять. Первые
> установки подписываются асимметрично — проверяйте их по публичным ключам Atlassian
> (`https://connect-install-keys.atlassian.com`). См. документацию Atlassian по
> [безопасности приложений Connect](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/).

## Шаг 3 — Разместите дескриптор и эндпоинты по HTTPS

Обслуживайте `atlassian-connect.json` так, чтобы он был доступен по адресу
`https://YOUR-HOST/atlassian-connect.json`, и убедитесь, что `/installed` и `/uninstalled`
доступны на том же `baseUrl`.

Для локальной разработки:

```bash
ngrok http 8080
```

Скопируйте сгенерированный URL `https://….ngrok-free.app` в поле `baseUrl` дескриптора и
перезапустите.

## Шаг 4 — Установите приложение на ваш сайт Jira

> 🛑 **Классическая установка по URL дескриптора удалена.** Управление приложениями Atlassian
> переехало со старой страницы `…/plugins/servlet/upm` в **Administration → Connected apps**, а
> **Developer mode** там теперь сообщает: *«Development Mode no longer supports installing
> private apps using an app descriptor URL.»* Новые приватные приложения должны распространяться
> через **установочные ссылки Forge**. Приведённые ниже шаги остаются актуальными **только для
> приложений Connect, которые уже были установлены** (они продолжают работать и по-прежнему
> выдают `sharedSecret`).

**Если ваше приложение Connect уже установлено** (типичный случай для этого руководства), у вас
уже есть его `clientKey`/`sharedSecret` из исходного рукопожатия `installed` — переходите к
шагу 5. Чтобы найти текущее расположение установленных приложений в админке:

1. Перейдите на [admin.atlassian.com](https://admin.atlassian.com/) → выберите вашу организацию →
   ваш **сайт** → **Connected apps** (или в Jira: **Settings (⚙) → Apps → Manage your apps**,
   что теперь перенаправляет на Administration → Connected apps).
2. Вкладка **Installed apps** перечисляет установленные приложения; вкладка **Settings** содержит
   **Developer mode**.

**Для совершенно нового приватного приложения** процесс установки по URL дескриптора недоступен —
постройте приложение на Forge и поделитесь
[установочной ссылкой Forge](https://developer.atlassian.com/platform/forge/) либо мигрируйте
существующее приложение Connect через
[миграцию Connect→Forge](https://developer.atlassian.com/platform/adopting-forge-from-connect/connect-to-forge-migration-module/).
Приложения Forge не используют эту схему JWT для Connect.

## Шаг 5 — Настройте jira.js

Используйте сохранённые значения для тенанта, к которому хотите обратиться:

```ts
import { Version3Client } from 'jira.js';

// Найдите тенанта, на который вы установились:
const { sharedSecret, baseUrl } = tenants.get(clientKey)!;

const client = new Version3Client({
  host: baseUrl, // URL сайта тенанта из полезной нагрузки installed
  authentication: {
    jwt: {
      issuer: 'my-backend-integration', // `key` из atlassian-connect.json
      secret: sharedSecret,             // sharedSecret из рукопожатия installed
      expiryTimeSeconds: 180,           // необязательно, по умолчанию 180 (3 минуты)
    },
  },
});
```

Для **мультитенантного** приложения создавайте клиент на каждый запрос, используя `host`/`secret`,
найденные по `clientKey`, — `issuer` (ключ вашего приложения) остаётся одинаковым для всех тенантов.

## Шаг 6 — Выполните запрос и проверьте

```ts
const me = await client.myself.getCurrentUser();
console.log(me.displayName); // успешный ответ 200 означает, что JWT-аутентификация работает
```

Для каждого запроса генерируется новый JWT с `qsh`, привязанным к методу и URL этого запроса.

## Устранение неполадок

- **401 Unauthorized**
  - Неверный `secret` — должен быть точным `sharedSecret` из `installed`, а не пользовательским
    API-токеном.
  - Неверный `issuer` — должен быть `key` из дескриптора, а не `clientKey`.
  - Расхождение часов — время сервера должно быть точным (`iat`/`exp` токена зависят от времени).
    Если вы видите периодические сбои, увеличьте `expiryTimeSeconds`.
  - Несовпадение `qsh` — убедитесь, что `host` совпадает с `baseUrl` тенанта и что вы не изменяли
    URL/строку запроса после генерации токена.
- **403 Forbidden** — `scopes` вашего дескриптора не дают права на операцию. Добавьте scope и
  переустановите приложение.
- **Приложение переустановлено** — при переустановке Jira выдаёт **новый** `sharedSecret`. Всегда
  считывайте последний сохранённый секрет.

## Чек-лист по безопасности

- Никогда не передавайте `sharedSecret` в браузер и не коммитьте его в систему контроля версий.
- Храните секреты зашифрованными в состоянии покоя, индексируя их по `clientKey`.
- Проверяйте колбэки жизненного цикла (асимметричный JWT), прежде чем доверять полезной нагрузке
  `installed`.
- Меняйте/заменяйте сохранённый секрет всякий раз, когда переустановка приносит новый.

## Справочные ссылки

Где что настраивать:

| Тема | Ссылка |
| --- | --- |
| Обзор Connect и процесс установки | [Getting started with Connect](https://developer.atlassian.com/cloud/jira/platform/getting-started-with-connect/) |
| Поля дескриптора приложения | [Connect app descriptor](https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/) |
| Scopes | [Scopes for Connect apps](https://developer.atlassian.com/cloud/jira/platform/scopes-for-connect-apps/) |
| Жизненный цикл и проверка JWT | [Security for Connect apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/) |
| Как формируется JWT / `qsh` | [Understanding JWT for Connect apps](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/) |
| Включение режима разработки | [Things to know while enabling development mode](https://support.atlassian.com/jira/kb/things-to-know-while-enabling-development-mode-in-the-jira-cloud/) |
| Управление установленными приложениями | Administration → **Connected apps** (старый `…/plugins/servlet/upm` теперь перенаправляет сюда) |
| Управление вашими сайтами Atlassian | [admin.atlassian.com](https://admin.atlassian.com/) |
| ⚠️ Окончание поддержки Connect (IV квартал 2026) | [Announcing Connect end of support](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps) |
| Миграция Connect → Forge | [Connect→Forge migration](https://developer.atlassian.com/platform/adopting-forge-from-connect/connect-to-forge-migration-module/) |
