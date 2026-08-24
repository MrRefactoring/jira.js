# Assets

Assets — это база конфигурационных единиц Jira Service Management: объекты, которые отслеживает организация, схемы
и типы, которые их описывают, и язык AQL, которым по ним ищут. `jira.js` покрывает Assets в обеих средах, двумя
клиентами, потому что под одним названием Atlassian выпускает два разных API.

| | клиент | эндпоинтов | где отвечает |
|---|---|---|---|
| Cloud | `createAssetsClient` | 60 | `api.atlassian.com`, по workspace |
| Data Center | `createAssetsServerClient` | 58 | ваш инстанс, `/rest/assets/1.0` |

Это не два режима одного API. У Data Center есть вложения, комментарии, архивация и восстановление, QR-коды и
управление индексом, которых нет в облаке; у облака — источники импорта, через которые стороннюю интеграцию
кормят данными, расход тенанта и глобальная конфигурация, которых нет в Data Center. Там, где эндпоинт есть в
обоих, обе поверхности называют его одинаково.

## Assets в облаке

Assets — единственная поверхность в этой библиотеке, которая отвечает не на хосте вашего сайта. Её базовый адрес —
`https://api.atlassian.com/ex/jira/{cloudId}/jsm/assets/workspace/{workspaceId}/v1`, поэтому клиент строится из
собственной конфигурации, а не разделяется с остальными.

```typescript
import { createServiceDeskClient, createAssetsClient } from 'jira.js';

const auth = { type: 'basic', email: 'you@example.com', apiToken: 'ВАШ_API_ТОКЕН' } as const;

const serviceDesk = createServiceDeskClient({ host: 'https://your-domain.atlassian.net', auth });
const [workspace] = (await serviceDesk.assets.getAssetsWorkspaces()).values ?? [];

const assets = createAssetsClient({ workspaceId: workspace.workspaceId, auth });

const object = await assets.objects.loadObject({ id: '42' });
```

`workspaceId` обязателен и задаётся явно. У сайта он один, возвращает его
`serviceDesk.assets.getAssetsWorkspaces()`, и он не меняется — так что запросите его один раз и держите в
конфигурации, а не платите за поиск при каждом старте.

Assets требует **Jira Service Management Premium**. На сайте без него список workspace приходит пустым, и клиент
просто некуда направить.

### Аутентификация

Работает любая стратегия, принятая в остальной библиотеке, с одной разницей — в том, как находится адрес.

- **API-токен или personal access token** — клиент идёт прямо на `https://api.atlassian.com`. Больше настраивать
  нечего.
- **OAuth 2.0 (3LO)** — не задавайте `host`. Клиент сам определит ваш cloud id и пойдёт через
  `https://api.atlassian.com/ex/jira/{cloudId}`, ровно как для любой другой поверхности. Assets использует
  семейство скоупов `cmdb`: `read:cmdb-object:jira`, `write:cmdb-object:jira`, `read:cmdb-schema:jira` и так
  далее — они выдаются пооперационно и названы в документации каждого эндпоинта.

```typescript
const assets = createAssetsClient({
  workspaceId,
  auth: { type: 'oauth2', clientId, clientSecret, accessToken, refreshToken, expiresAt },
});
```

Чтобы обращаться через адрес шлюза явно — например, внутри приложения Connect или Forge, где cloud id уже
известен, — передайте его как `host`:

```typescript
const assets = createAssetsClient({
  workspaceId,
  host: `https://api.atlassian.com/ex/jira/${cloudId}`,
  auth: { type: 'bearer', token },
});
```

## Assets в Data Center

Самостоятельно размещённый Assets отвечает на вашем же инстансе, поэтому принимает того же клиента, что и любая
другая self-hosted поверхность.

```typescript
import { createClient } from 'jira.js/core';
import { createAssetsServerClient, createServiceDeskServerClient } from 'jira.js';

const client = createClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'ВАШ_PERSONAL_ACCESS_TOKEN' },
});

const assets = createAssetsServerClient(client);
const serviceDesk = createServiceDeskServerClient(client);

const schemas = await assets.objectSchemas.findSchemas();
const objects = await assets.aql.findObjects({ qlQuery: 'objectType = "Laptop"' });
```

Построить клиента один раз и передать его обеим фабрикам — то, что библиотека рекомендует везде: одни учётные
данные и, под OAuth 2.0, один токен, который обновляется в одном месте.

Сгенерировано из спецификации Jira Service Management Data Center 11.3. Assets поставляется вместе с продуктом, а
не отдельным приложением, так что он есть на любом лицензированном инстансе Service Management.

### Что в спецификации написано неверно

Data Center-документ Atlassian генерирует из Java-аннотаций, и несколько эндпоинтов он описывает неправильно. Всё
перечисленное исправлено в типах, которые отдаёт библиотека, и каждый пункт измерен на работающем инстансе, а не
выведен рассуждением:

- десять эндпоинтов отвечают массивом, тогда как документ называет одиночный элемент;
- `getArchivedObjects` отвечает страницей той формы, которой в документе нет вовсе;
- `archiveObjectsByKeys` назван по идентификаторам и объявлен строкой, а архивирует по ключам и принимает массив;
- `value`, `displayValue` и `searchValue` атрибута объявлены объектами, а приходят строками;
- поле `created` вложения — дата при чтении списка и `{ seconds, nanos }` при загрузке, поэтому у загрузки свой
  тип ответа;
- идентификатор схемы объектов записан строкой для чтения и целым числом для записи.

Все пятьдесят восемь эндпоинтов Data Center вызываются на живом инстансе при каждом прогоне live-сюиты — так этот
список и собран.

## Работа с объектами

Объект принадлежит типу объекта, а тип — схеме. Значения объекта — это атрибуты, каждый из которых называет
атрибут типа, который он заполняет:

```typescript
const type = await assets.objectTypes.createObjectType({
  name: 'Laptop',
  objectSchemaId: schema.id,
  iconId: icon.id,
});

const [nameAttribute] = await assets.objectTypes.findObjectTypeAttributes({ id: String(type.id) });

const object = await assets.objects.createObject({
  objectTypeId: type.id,
  attributes: [
    { objectTypeAttributeId: nameAttribute.id, objectAttributeValues: [{ value: 'MacBook Pro' }] },
  ],
});
```

Assets отвергает `=`, `;`, `:`, `?`, `.` и `"` в имени схемы, типа объекта или объекта — отвечает 400 и называет
их зарезервированными символами. Ключ схемы должен быть уникален на инстансе, и из него строится ключ каждого
объекта.

## Поиск через AQL

```typescript
const page = await assets.objects.findObjectsByAql({
  qlQuery: 'objectType = "Laptop" AND Owner = currentUser()',
});

const total = await assets.objects.countObjectsByAql({ qlQuery: 'objectType = "Laptop"' });
```

В Data Center тот же поиск — это `assets.aql.findObjects({ qlQuery })`, а навигационный список,
`assets.objects.findObject`, принимает тип объекта и схему вместо запроса.
