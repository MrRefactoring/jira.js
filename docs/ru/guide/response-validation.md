# Валидация ответов

Каждый ответ проверяется по схеме до того, как вы его увидите. Даты превращаются в `Date`, а поле, которое
обещает эндпоинт, — это поле, на которое можно положиться.

Когда ответ **не** совпал, библиотека не бросает исключение. Тело возвращается невалидированным, а о
проблеме сообщается один раз:

```
[jira.js] GET /rest/api/3/project/{projectIdOrKey}/role answered with something the schema
does not describe: at `10002`, expected string, got number. The response is returned
unvalidated. Set `onSchemaMismatch` to 'silent' to stop these, or pass a function to handle
them yourself.
```

## Почему предупреждение, а не исключение

Формы, которые присылает Jira, зависят от того, чего библиотека видеть не может: локали сайта, включённых
фич, того, team-managed проект или company-managed, кастомных полей, которые завели ваши администраторы, и
того, что Atlassian на этой неделе добавил в enum.

Если схема здесь ошиблась про что-то из этого — это не ваш баг, и он не должен класть вашу интеграцию.
Поэтому по умолчанию библиотека сообщает о проблеме и уходит с дороги.

## Настройка

```typescript
const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: 'warn',
});
```

| Значение | Поведение |
| --- | --- |
| `'warn'` *(по умолчанию)* | Сообщить один раз о каждой отдельной проблеме в stderr, вернуть тело как есть |
| `'silent'` | Вернуть тело как есть, ничего не говорить |
| `'throw'` | Бросить `SchemaMismatchError` |
| функция | Получает отчёт; ничего не печатается |

### `'throw'` — для тестов

В тестовом наборе несовпадение **и есть** предмет проверки, и падать громко — именно то, что нужно:

```typescript
const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: process.env.NODE_ENV === 'test' ? 'throw' : 'warn',
});
```

### Обработать самому

Передайте функцию — печать полностью отключается, и вы направляете отчёт в свой логгер, счётчик или
трекер ошибок:

```typescript
import type { SchemaMismatchReport } from 'jira.js';

const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: (report: SchemaMismatchReport) => {
    logger.warn({ endpoint: report.endpoint, issues: report.issues }, 'jira schema drift');
  },
});
```

## Отчёт

```typescript
interface SchemaMismatchReport {
  endpoint: string;              // 'GET /rest/api/3/project/{projectIdOrKey}/role'
  issues: {
    path: string;                // 'values.0.created' — пусто для корня ответа
    expected: string;            // что требовала схема
    received: string;            // что пришло, названо типом
  }[];
}
```

**Значений в нём нет никогда.** Только пути и имена типов. Это сделано намеренно: отчёт предназначен для
вставки в баг-репорт, а тело, которое он описывает, — ваше: заголовки задач, имена пользователей,
содержимое кастомных полей. `SchemaMismatchError` несёт тот же объект в `.report`.

## Шум

Предупреждения дедуплицируются по эндпоинту и полю на всё время жизни процесса, поэтому пагинация по
пятистам задачам с одним кривым полем даёт одну строку, а не пятьсот.

Они уходят в **stderr**, не в stdout. Редирект и пайп вывода CLI не страдают:

```bash
my-cli issues > out.json      # предупреждение остаётся в терминале, out.json чист
my-cli issues | jq '.total'   # jq его не увидит
my-cli issues 2>/dev/null     # заглушено
```

## Нашли расхождение — сообщите

Несовпадение обычно означает, что схема здесь отстала от Jira, а в отчёте есть всё нужное для починки.
[Заведите issue](https://github.com/MrRefactoring/jira.js/issues/new) и вставьте его туда.
