# Jira Service Management Data Center

`jira.js` speaks to self-hosted Service Management through `createServiceDeskServerClient` — the 61 endpoints
under `/rest/servicedeskapi`: customer requests and their comments, participants and SLAs, queues, request types
and their permissions, organizations, portals, approvals and customer transitions.

```typescript
import { createServiceDeskServerClient } from 'jira.js';

const serviceDesk = createServiceDeskServerClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'YOUR_PERSONAL_ACCESS_TOKEN' },
});

const desks = await serviceDesk.serviceDesks.getServiceDesks();
const requests = await serviceDesk.customerRequests.getMyCustomerRequests();
```

It is a separate surface from the Cloud `createServiceDeskClient`, for the reason the platform APIs are separate:
the two documents describe different endpoints, and pointing one client at the other's host would silently ask for
things that are not there.

## Supported versions

Generated from the Jira Service Management Data Center 11.3 specification, and usable against **Service Management
Data Center 10.0 and later**.

Atlassian publishes one document for the whole product, and it holds three APIs: Service Desk here, [Assets](/guide/assets)
under `/rest/assets/1.0`, and a copy of the Jira platform API that [`createServerClient`](/guide/data-center)
already covers from a document of its own. This library generates the first two and takes the third from the
platform document, so nothing is described twice.

## Authentication

The same three mechanisms as the platform surface, taking the same client. Build it once and hand it to every
factory you need:

```typescript
import { createClient } from 'jira.js/core';
import { createServerClient, createServiceDeskServerClient, createAssetsServerClient } from 'jira.js';

const client = createClient({
  host: 'https://jira.your-company.com',
  auth: { type: 'bearer', token: 'YOUR_PERSONAL_ACCESS_TOKEN' },
});

const jira = createServerClient(client);
const serviceDesk = createServiceDeskServerClient(client);
const assets = createAssetsServerClient(client);
```

See [the Data Center guide](/guide/data-center#authentication) for personal access tokens, username and password,
and OAuth 2.0 against the instance itself.

## Licensing

Service Management is licensed separately from Jira Software, and every `/rest/servicedeskapi` endpoint answers
**403 with an HTML page** on an instance that has no Service Management licence — including the ones a
correctly-authenticated administrator calls. `getInfo` is the exception, and the way to tell:

```typescript
const info = await serviceDesk.info.getInfo();

if (!info.isLicensedForUse) {
  // Nothing else on this surface will answer.
}
```

Assets is different: it ships with the product and its REST module does not check for a seat, so
`/rest/assets/1.0` answers in full on an instance running the Service Management image under a Jira Software
licence.

## Paginated responses

Lists come back as `Page<T>`, the same envelope every other surface in this library uses:

```typescript
const queues = await serviceDesk.queues.getQueues({ serviceDeskId: '1' });

for (const queue of queues.values ?? []) {
  console.log(queue.name);
}
```

The Data Center document writes most of its pages out inside the response rather than as a named component, which
would have produced eighteen differently-named models of one envelope. They are all `Page<T>` here.
