# Обработка ошибок

Каждый метод клиента возвращает промис. Когда Jira отвечает не-2xx статусом (или запрос падает), промис
реджектится — оборачивайте вызовы в `try/catch` (или `.catch()`).

```typescript
try {
  const issue = await client.issues.getIssue({ issueIdOrKey: 'TEST-1' });
} catch (error) {
  // Разобрать сбой
  console.error(error);
}
```

## Разбор ошибки

Библиотека построена на axios, поэтому сбои — это axios-ошибки с ответом сервера. Полезные поля —
HTTP-статус (`status`) и структурированное тело ошибки Jira (`errorMessages` / `errors`):

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({ host, authentication });

try {
  await client.issues.getIssue({ issueIdOrKey: 'MISSING-1' });
} catch (error: any) {
  const status = error.response?.status;          // напр. 404
  const data = error.response?.data;              // тело ошибки Jira
  console.error(status, data?.errorMessages, data?.errors);
}
```

## Глобальные middleware для ошибок и ответов

Вместо обработки каждого вызова можно зарегистрировать middleware в конфигурации клиента. `onError`
срабатывает для каждого упавшего запроса, а `onResponse` — для каждого успешного:

```typescript
const client = new Version3Client({
  host,
  authentication,
  middlewares: {
    onError(error) {
      reportToSentry(error);
    },
    onResponse(data) {
      // разобрать/залогировать успешные ответы
    },
  },
});
```

## OAuth 2.0 и 401

При OAuth 2.0 клиент автоматически обновляет access-токен по истечении и один раз повторяет запрос при
`401`. Повторный `401` пробрасывается как ошибка. См. [руководство по OAuth 2.0](./oauth2-authentication).
