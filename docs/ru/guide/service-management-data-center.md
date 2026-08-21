# Jira Service Management Data Center

С самостоятельно размещённым Service Management `jira.js` работает через `createServiceDeskServerClient` — это 61
эндпоинт под `/rest/servicedeskapi`: клиентские запросы с комментариями, участниками и SLA, очереди, типы запросов
и права на них, организации, порталы, согласования и клиентские переходы.

```typescript
import { createServiceDeskServerClient } from 'jira.js';

const serviceDesk = createServiceDeskServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'ВАШ_PERSONAL_ACCESS_TOKEN' },
});

const desks = await serviceDesk.serviceDesks.getServiceDesks();
const requests = await serviceDesk.customerRequests.getMyCustomerRequests();
```

Это отдельная поверхность от облачного `createServiceDeskClient` — по той же причине, по какой разделены
платформенные API: два документа описывают разные эндпоинты, и клиент, направленный на чужой хост, молча
запрашивал бы то, чего там нет.

## Поддерживаемые версии

Сгенерировано из спецификации Jira Service Management Data Center 11.3, работает начиная с **Service Management
Data Center 10.0**.

Atlassian публикует один документ на весь продукт, и в нём лежат три API: Service Desk, [Assets](/ru/guide/assets)
под `/rest/assets/1.0` и копия платформенного API Jira, которую [`createServerClient`](/ru/guide/data-center) уже
покрывает из собственного документа. Библиотека генерирует первые два, а третий берёт из платформенного документа —
так ничего не описывается дважды.

## Аутентификация

Те же три механизма, что и у платформенной поверхности, и тот же клиент. Постройте его один раз и передайте всем
нужным фабрикам:

```typescript
import { createClient } from 'jira.js/core';
import { createServerClient, createServiceDeskServerClient, createAssetsServerClient } from 'jira.js';

const client = createClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'ВАШ_PERSONAL_ACCESS_TOKEN' },
});

const jira = createServerClient(client);
const serviceDesk = createServiceDeskServerClient(client);
const assets = createAssetsServerClient(client);
```

Про personal access token, пару логин-пароль и OAuth 2.0 против самого инстанса — в
[руководстве по Data Center](/ru/guide/data-center#аутентификация).

## Лицензирование

Service Management лицензируется отдельно от Jira Software, и на инстансе без его лицензии **каждый** эндпоинт
`/rest/servicedeskapi` отвечает **403 и HTML-страницей** — в том числе на запросы корректно аутентифицированного
администратора. Исключение — `getInfo`, по которому это и определяется:

```typescript
const info = await serviceDesk.info.getInfo();

if (!info.isLicensedForUse) {
  // Ничего больше на этой поверхности не ответит.
}
```

С Assets иначе: он поставляется вместе с продуктом, и его REST-модуль не проверяет наличие места в лицензии — так
что `/rest/assets/1.0` полностью отвечает и на инстансе с образом Service Management под лицензией Jira Software.

## Постраничные ответы

Списки приходят как `Page<T>` — тот же конверт, что и у любой другой поверхности библиотеки:

```typescript
const queues = await serviceDesk.queues.getQueues({ serviceDeskId: '1' });

for (const queue of queues.values ?? []) {
  console.log(queue.name);
}
```

Data Center-документ описывает большинство своих страниц прямо внутри ответа, а не отдельным компонентом — из
этого вышло бы восемнадцать по-разному названных моделей одного и того же конверта. Здесь они все `Page<T>`.
