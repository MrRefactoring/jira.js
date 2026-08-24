# Teams

Команды Atlassian — это группы людей, которые существуют сразу во всех продуктах, на уровне организации, а не
отдельного сайта. `createTeamsClient` покрывает [Teams REST API](https://developer.atlassian.com/platform/teams/rest/v1/) —
пятнадцать операций: сами команды, их участники и связи с внешним каталогом.

```typescript
import { createClient, getTenantContext } from 'jira.js/core';
import { createTeamsClient } from 'jira.js';

const host = 'https://your-domain.atlassian.net';
const auth = { type: 'basic', email: 'you@example.com', apiToken: 'ВАШ_API_ТОКЕН' } as const;

const { orgId } = await getTenantContext(createClient({ host, auth }));
const teams = createTeamsClient({ host, auth });

const page = await teams.teams.queryTeams({ orgId });
```

## Аутентификация

API-токен или bearer-токен. **OAuth 2.0 не поддерживается самим API** — документация Atlassian прямо говорит, что
приложения Forge и OAuth 2.0 до этих ресурсов не достучатся, — поэтому тип конфигурации его не принимает, и ошибка
всплывает при компиляции, а не загадочным 401.

## Идентификатор организации

Все операции, кроме одной, адресуются организации, поэтому `orgId` — параметр вызова, а не поле клиента. Это
осознанно: аккаунт может администрировать несколько организаций, и один клиент дотягивается до всех.

`orgId` не меняется. Получите его один раз через [`getTenantContext`](./tenant-context) и держите в конфигурации — или
прочитайте из адреса, когда открываете свою организацию по `admin.atlassian.com/o/{orgId}`.

## Команды

```typescript
const team = await teams.teams.createTeam({
  orgId,
  displayName: 'Платформа',
  description: 'Владеет общими сервисами.',
  teamType: 'MEMBER_INVITE',
});

await teams.teams.updateTeam({ orgId, teamId: team.teamId, description: 'Владеет общими сервисами и шлюзом.' });
await teams.teams.getTeam({ orgId, teamId: team.teamId });
```

`teamType` решает, кто может вступить: `OPEN` — любой в организации, `MEMBER_INVITE` — только по приглашению,
`EXTERNAL` — команда, зеркалируемая из другого каталога, `ORG_ADMIN_MANAGED` — та, которую меняет только администратор.

Архивация — массовая операция, и обратная ей тоже:

```typescript
await teams.teams.archiveTeams({ orgId, teamIds: [team.teamId] });
await teams.teams.unarchiveTeams({ orgId, teamIds: [team.teamId] });
```

Удалённая команда — не то же самое, что несуществующая. `deleteTeam` завершается без тела ответа, а чтение команды
после этого отвечает **410**, а не 404: идентификатор остаётся известным и сам сообщает, что команды больше нет.
`restoreTeam` возвращает её обратно.

`queryTeams` листает курсором, а не смещением:

```typescript
let cursor: string | null | undefined;

do {
  const page = await teams.teams.queryTeams({ orgId, size: 100, cursor: cursor ?? undefined });

  for (const team of page.entities) console.log(team.displayName);

  cursor = page.cursor;
} while (cursor);
```

## Участники

Список участников читается через `POST`, потому что запрос несёт тело с параметрами страницы, а не query-параметры:

```typescript
const members = await teams.teamMembers.fetchMembers({ orgId, teamId, first: 50 });

for (const member of members.results) console.log(member.accountId);

const more = members.pageInfo.hasNextPage;
```

Добавление и удаление — массовые операции, которые сообщают об отказах по каждому участнику, а не отвергают вызов
целиком. Так что проверяйте `errors` в ответе, а не только ловите исключение:

```typescript
const result = await teams.teamMembers.addMembers({
  orgId,
  teamId,
  members: [{ accountId: '5b6d7f20e6dba529eefdbad9' }],
});
```

## Внешние команды

Там, где команда зеркалируется из каталога за пределами Atlassian, `externalTeams` связывает их и развязывает обратно.

```typescript
await teams.externalTeams.createExternalLinkedTeam({
  orgId,
  description: 'Зеркало корпоративного каталога.',
  externalReference: { id: 'group-42', source: 'ATLASSIAN_GROUP' },
});
```

Имя команды приходит из источника, а не из вызова — поэтому `displayName` здесь и нет. `linkTeamToExternalSource`
привязывает источник к уже существующей команде, а `unlinkTeamsFromExternalSource` отвязывает сразу несколько.

У команды, которую никогда не связывали, `externalReference` приходит `null`. Спецификация объявляет его объектом в
двух схемах из трёх; типы здесь говорят `null` во всех трёх — именно это API и присылает.
