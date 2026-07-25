# Обработка ошибок

Каждый метод клиента возвращает промис. Когда Jira отвечает не-2xx статусом или запрос до неё не доходит,
промис реджектится одной из собственных ошибок библиотеки.

```typescript
import { isNotFoundError } from 'jira.js';

try {
  const issue = await jira.issues.getIssue({ issueIdOrKey: 'TEST-1' });
} catch (error) {
  if (isNotFoundError(error)) return null;
  throw error;
}
```

## Типы ошибок

| Ошибка | Когда | Дополнительные поля |
| --- | --- | --- |
| `ApiError` | Любой не-2xx ответ; база для остальных | `status`, `statusText`, `body` |
| `AuthError` | `401` — данных нет, они протухли или неверны | |
| `ScopeError` | `401`, когда у токена не хватает scope | |
| `ForbiddenError` | `403` — аутентифицирован, но не разрешено | |
| `NotFoundError` | `404` | |
| `RateLimitError` | `429` | `retryAfterMs` |
| `ServerError` | `5xx` | |
| `NetworkError` | Запрос не дошёл — DNS, TLS, сокет | `code` |
| `OAuthError` | Упал сам поток получения токена | |
| `ConfigError` | Клиент сконфигурирован невозможным образом | |
| `SchemaMismatchError` | 2xx, но не та форма, которую обещает эндпоинт | `report` |

В `body` лежит собственная полезная нагрузка ошибки Jira, обычно `{ errorMessages, errors }`:

```typescript
import { isApiError } from 'jira.js';

try {
  await jira.issues.createIssue({ fields });
} catch (error) {
  if (isApiError(error)) {
    console.error(error.status, error.body);
  }
}
```

## Предикаты вместо `instanceof`

У каждой ошибки есть предикат — `isApiError`, `isAuthError`, `isForbiddenError`, `isNotFoundError`,
`isRateLimitError`, `isServerError`, `isNetworkError`, `isOAuthError`, `isConfigError`,
`isSchemaMismatchError`, `isScopeError`.

Они читают брендированный символ, а не идут по цепочке прототипов, поэтому продолжают работать, когда
бандлер режет код на чанки, когда минификация переименовывает классы и когда в `node_modules` оказались
две копии пакета — во всех этих случаях `instanceof` молча вернёт `false`.

Предикаты вкладываются так же, как типы: `NotFoundError` удовлетворяет и `isApiError`.

## Ограничение частоты

`RateLimitError.retryAfterMs` — это `Retry-After` от Jira, уже переведённый в миллисекунды:

```typescript
import { isRateLimitError } from 'jira.js';

try {
  await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearchPost({ jql });
} catch (error) {
  if (isRateLimitError(error) && error.retryAfterMs) {
    await new Promise(resolve => setTimeout(resolve, error.retryAfterMs));
  }
}
```

## Повторы транзиентных сбоев

Повторы выключены по умолчанию: маскируя сбой, легко спрятать настоящую регрессию. Включаются только для
транспортных:

```typescript
const jira = createCloudClient({
  host,
  auth,
  retry: { maxAttempts: 3, initialDelayMs: 500, backoffFactor: 2 },
});
```

Покрываются сетевые ошибки и `502`/`503`/`504`. Никогда не повторяется `4xx` — включая `429`, у которого
есть собственный `Retry-After` и который заслуживает осмысленного ожидания, а не слепого, — и никакие
другие `5xx`.

## OAuth 2.0 и 401

При OAuth 2.0 клиент обновляет access-токен до истечения и один раз повторяет запрос при `401`. Второй
`401` пробрасывается. Если упало само обновление, приходит `OAuthError`; предикат
`isReauthorizationRequired(error)` говорит, что пользователю нужно заново выдать согласие, а не что вызов
можно повторить. См. [руководство по OAuth 2.0](./oauth2-authentication).

## Ответы, которые пришли, но не подошли

2xx, тело которого не совпало со схемой эндпоинта, по умолчанию не является ошибкой — о нём сообщается, а
тело возвращается. См. [Валидацию ответов](./response-validation).
