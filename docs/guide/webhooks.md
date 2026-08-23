# Webhooks

Everything else in this library calls Jira. A webhook is Jira calling you: you register a URL, something happens on the
site, and a `POST` arrives at a server of yours. There is nothing here to call and no client to build — what was
missing was the shape of what arrives, and that is what `jira.js/webhooks` is.

```typescript
import type { WebhookHeaders, WebhookPayload } from 'jira.js/webhooks';

app.post('/jira', (request, response) => {
  const headers = request.headers as WebhookHeaders;
  const payload = request.body as WebhookPayload;

  switch (payload.webhookEvent) {
    case 'jira:issue_created':
      console.log(payload.issue.key, 'created by', payload.user?.displayName);
      break;

    case 'sprint_started':
      console.log(payload.sprint?.name, 'started');
      break;
  }

  response.sendStatus(200);
});
```

The subpath is types only. It compiles to `export {}`, adds nothing to a bundle, and works the same with Express,
Fastify, Hono, a Lambda handler or a bare `node:http` server.

## The payload

`WebhookPayload` is a union discriminated by `webhookEvent`, so a `switch` narrows each branch to exactly one payload.
Handle every case and the `default` narrows to `never`, which is how you make an unhandled event a compile error:

```typescript
default: {
  const unhandled: never = payload;

  throw new Error(`unhandled webhook event: ${JSON.stringify(unhandled)}`);
}
```

Fifty-seven events across sixteen groups: issue, issue property, worklog, comment, attachment, issue link, issue type,
project, version, filter, user, the site-wide `option_*` toggles, sprint, board, the two app-access refusals, and a
failed Jira expression. Each group has its own exported type — `IssueWebhookPayload`, `SprintWebhookPayload` and so on
— if you want to name one directly.

Every payload carries three things:

| | |
|---|---|
| `timestamp` | when Jira raised the event, in milliseconds since the epoch |
| `webhookEvent` | the event, and the field to switch on |
| `matchedWebhookIds` | which registrations this delivery answered — only on webhooks registered through the REST API |

## What is documented, and what is not

Worth knowing before you trust a field: **Atlassian publishes one complete payload**, the one for issue events. Of
everything else it says only that a callback carries "information about the entity associated with the event".

So the issue payload here is written from that example and from a capture of a real delivery. It is the only one with
a required entity:

```typescript
case 'jira:issue_updated':
  payload.issue;                   // Issue — always there
  payload.issue_event_type_name;   // 'issue_updated', 'issue_commented', 'issue_generic'…
  payload.changelog;               // what changed
  payload.comment;                 // set when the update was someone commenting
  break;
```

`issue_event_type_name` is finer-grained than `webhookEvent` — an edit, a comment and a transition all arrive as
`jira:issue_updated` and are told apart only there. It is typed as a plain string on purpose: a site administrator can
add issue events, so the set is not closed.

Every other group names its entity **optionally**, after the entity the event concerns rather than from a
specification: `sprint` on a sprint event, `board` on a board event, `worklog`, `attachment`, `project`, `version`,
`filter`. Nothing here could verify those against Atlassian's documentation, so the type makes you check, and the
declaration says as much where you hover it.

## The headers

Lower-cased, because that is how they arrive — Node lower-cases every incoming header name and so does every framework
built on it. Every value is a string, including the retry count: an HTTP header has no numbers in it.

| header | |
|---|---|
| `x-atlassian-webhook-identifier` | unique for this delivery within the site, and unchanged across retries — record it to recognise a webhook you have already handled |
| `x-atlassian-webhook-flow` | `Primary` for the event itself, thirty seconds; `Secondary` for the fallout of a bulk or cascading change, fifteen minutes |
| `x-atlassian-webhook-retry` | how many retries so far; absent on the first attempt |
| `x-atlassian-webhook-trace` | whatever a Connect app attached to the request that caused the event |
| `x-hub-signature` | `sha256=…`, present only on a webhook registered with a secret — pass it to `verifyWebhookSignature` |

Deleting an issue is the clearest illustration of the flow header: `jira:issue_deleted` goes out as `Primary`, and
every dependent `comment_deleted`, `attachment_deleted` and `issuelink_deleted` follows as `Secondary`, possibly
minutes later.

## There is no parser

The casts above are the interface, deliberately. A webhook body is shaped by the site that sent
it — custom fields under generated keys in `issue.fields`, whatever an installed app adds, a Data Center release that
differs from Cloud — and a schema strict enough to be worth having would reject bodies that are perfectly valid
somewhere else. Elsewhere in this library a response is validated because the API documents it; here there is nothing
to validate against.

## Verifying the signature

`x-hub-signature` is the only thing that proves a request came from Jira rather than from whoever found your URL. A
webhook registered with a secret carries it as `sha256=<hex>`, over HMAC-SHA256 of the exact bytes of the body.

```ts
import express from 'express';
import { verifyWebhookSignature, type WebhookPayload } from 'jira.js/webhooks';

app.post('/jira', express.raw({ type: 'application/json' }), async (request, response) => {
  const trusted = await verifyWebhookSignature({
    body: request.body,
    secret: process.env.JIRA_WEBHOOK_SECRET!,
    signature: request.get('x-hub-signature'),
  });

  if (!trusted) return response.sendStatus(401);

  const payload = JSON.parse(request.body.toString()) as WebhookPayload;

  response.sendStatus(200);
});
```

**The body must be the bytes that arrived.** This is where the check usually goes wrong: `express.json()` and every
equivalent hand you a parsed object, and `JSON.stringify` of that object is a different byte sequence for the same
data — key order, whitespace and number formatting are not preserved — so the signature will never match. Reach for
whatever your framework calls a raw body.

The answer is `false` for every way a delivery can fail to be trustworthy: no header, an algorithm other than
`sha256`, a digest that is not hexadecimal, a digest of the right shape and the wrong value. Your response to all four
is the same, and distinguishing them would distinguish them for whoever is probing the endpoint too. The one thing it
throws on is an empty secret, which is a mistake of yours rather than a failed check.

The comparison is constant-time, and nothing is imported to do any of it: `crypto.subtle` is a global in Node and in
browsers alike, so this subpath still adds nothing to a browser bundle.

## Registering one

Two ways, and they behave differently:

- **The admin page**, `https://your-domain.atlassian.net/plugins/servlet/webhooks`. What most people mean by a Jira
  webhook. Registered by a person, lives until someone removes it.
- **The REST API**, `POST /rest/api/3/webhook` — Connect and OAuth 2.0 apps only, and the registration expires after
  thirty days unless `refreshWebhooks` extends it. These are the deliveries that carry `matchedWebhookIds`, and this
  library covers the endpoints: `jira.webhooks.registerDynamicWebhooks`, `getDynamicWebhooksForApp`,
  `refreshWebhooks`, `deleteWebhookById`.

Atlassian's own reference is
[Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/) on the Jira Cloud platform.
