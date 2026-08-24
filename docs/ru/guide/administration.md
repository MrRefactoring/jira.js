# Администрирование организации

Три API, которые стоят над сайтами, а не внутри одного. Они управляют организацией: её директориями, людьми в них,
группами, доступом этих людей и журналом всего происходящего.

| | фабрика | операций | о чём |
|---|---|---|---|
| `jira.js/admin` | `createAdminClient` | 47 | организации, директории, пользователи, группы, домены, политики, события, воркспейсы |
| `jira.js/userManagement` | `createUserManagementClient` | 10 | один управляемый аккаунт: профиль, почта, API-токены, активен он или нет |
| `jira.js/userProvisioning` | `createUserProvisioningClient` | 24 | SCIM — заведение пользователей и групп из провайдера идентичности |

## Учётные данные

Все три принимают bearer-токен и никакой другой формы, и тип конфигурации это фиксирует: токен сайта отвечает здесь
`401`, и OAuth 2.0 (3LO) тоже — его права выдаёт пользователь для сайта, а не организация для себя. Ошибка ловится
компилятором, а не четыреста первым в рантайме.

А вот токен нужен разный. `admin` и `userManagement` берут **organization API key**, который создаётся в разделе
Settings на [admin.atlassian.com](https://admin.atlassian.com). `userProvisioning` берёт **ключ самой директории**,
выданный при подключении SCIM.

```typescript
import { createAdminClient } from 'jira.js';

const admin = createAdminClient({ auth: { type: 'bearer', token: process.env.ATLASSIAN_ORG_API_KEY! } });

const orgs = await admin.orgs.getOrgs();
```

Хоста передавать не нужно. Эти API отвечают на `https://api.atlassian.com` и больше нигде, так что поле необязательное
и туда же и указывает по умолчанию; существует оно ради прокси.

## API организации

Всё адресуется через `orgId`, и он называет организацию, а не сайт — несколько сайтов могут жить в одной. `getOrgs`
возвращает те, до которых достаёт ваш ключ, а `getTenantContext` выводит его из сайта, клиент к которому у вас уже есть:

```typescript
import { createClient, getTenantContext } from 'jira.js/core';

const { orgId } = await getTenantContext(createClient({ host, auth }));
```

Операции над пользователями и группами работают с **директорией**, а не с организацией напрямую, и `directoryId`
принимает `-` в значении «все директории, которыми ключ вправе управлять».

```typescript
const users = await admin.users.searchDirectoryUsers({ orgId, directoryId: '-', limit: 50 });

await admin.groups.addUserToGroup({ orgId, directoryId, groupId, accountId });
```

Две пары операций выглядят одинаково и означают разное. `grantUserAccess` и `revokeUserAccess` управляют доступом к
**продукту**. `assignOrganizationRole` и `revokeOrganizationRole` — организационной ролью вроде админа организации.
В документе и то и другое называется ролями; здесь — нет.

## Управление одним аккаунтом

`createUserManagementClient` работает с одним управляемым аккаунтом — тем, чей почтовый домен организация подтвердила.
Всё адресуется через `accountId`.

```typescript
const users = createUserManagementClient({ auth });

await users.profile.updateProfile({ accountId, nickname: 'Sam' });
await users.lifecycle.deactivateUser({ accountId });
```

`getManagementPermissions` стоит вызвать первым: он отвечает, что этот ключ вообще вправе менять в этом аккаунте, а
ответ зависит от того, подтверждён ли домен и управляемый ли аккаунт.

Удаление ступенчатое. `deleteAccount` запускает отсрочку, `cancelAccountDeletion` её отменяет, и необратимым ничего не
становится, пока отсрочка не истечёт.

## Заведение из провайдера идентичности

`createUserProvisioningClient` говорит на SCIM 2.0 с директорией, к которой подключён ваш провайдер идентичности. Это
тот API, который Okta, Entra ID или OneLogin вызывают за вас; напрямую он нужен, чтобы сверить, проверить или починить
сделанное ими.

```typescript
const scim = createUserProvisioningClient({ auth: { type: 'bearer', token: directoryApiKey } });

const page = await scim.users.getUsers({ directoryId, filter: 'userName eq "sam@example.com"' });
```

SCIM различает `PUT` и `PATCH`, и имена тоже: `replaceUser` шлёт ресурс целиком и стирает всё, что вы не указали,
`patchUser` шлёт список операций. Берите `patchUser`, если не собирались именно заменять.

Четыре операции лежат вне собственно SCIM, в модуле `scimLinks`: они читают и разрывают связь между аккаунтом Atlassian
и его provisioning-записью — то, что нужно, когда пользователя завели дважды или не в ту директорию.

## Чего здесь нет

SCIM-директория требует Atlassian Guard. Без него поверхности `userProvisioning` не с чем разговаривать, и её операции
отвечают `403` или `404`, никак этого не поясняя.
