# Pagination

`paginate` yields individual items with `for await`. It requests one page at a time and fetches the next page only after the current page has been consumed. Breaking out of the loop stops the iterator without fetching another page.

Import it from `jira.js` or `jira.js/core`. Existing endpoint methods still return a single page.

## Offset pagination

```typescript
import { createCloudClient, paginate } from 'jira.js';

const jira = createCloudClient({ host, auth });
const labels = paginate({
  initialParameters: { startAt: 0, maxResults: 50 },
  fetchPage: jira.labels.getAllLabels,
  getItems: page => page.values ?? [],
  getNextParameters: (page, parameters) =>
    page.isLast || !page.values?.length
      ? undefined
      : { ...parameters, startAt: (page.startAt ?? parameters.startAt) + page.values.length },
});

for await (const label of labels) {
  console.log(label);
}
```

`initialParameters` is passed to the first request. `getItems` selects the items to yield. `getNextParameters` returns the parameters for the next request, or `undefined` to finish. The iterator does not change the supplied parameters.

The adapter determines when the API has finished. A short or empty page can still have a continuation token, so `paginate` does not infer completion from its length.

## Cursor pagination

```typescript
import { createCloudClient, paginate } from 'jira.js';
import type { SearchIssues } from 'jira.js/cloud/parameters';

const jira = createCloudClient({ host, auth });
const initialParameters: SearchIssues = { jql: 'project = EXAMPLE', maxResults: 50 };

for await (const issue of paginate({
  initialParameters,
  fetchPage: jira.issueSearch.searchIssues,
  getItems: page => page.issues ?? [],
  getNextParameters: (page, parameters) =>
    page.nextPageToken ? { ...parameters, nextPageToken: page.nextPageToken } : undefined,
})) {
  console.log(issue.id);
}
```

## Cancellation and failures

Pass `signal: controller.signal` in the pagination options to forward an `AbortSignal` to every endpoint call. It is also checked between items, so cancellation stops iteration even while a page is being consumed. The original abort reason is thrown.

Endpoint and adapter failures propagate unchanged. Retry policy remains the client's responsibility. `fetchPage` receives the current parameters and a second `RequestOptions` argument; a custom wrapper must forward that argument to retain cancellation during the request.
